import Form from '../../components/form/form';
import { FIELDS } from './form.config';
import { useCategory } from '../../hooks/useCategory';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAudio } from '../../api/audio';
import { useNavigate } from 'react-router';

export type FormValues = {
  audio: File[];
  title: string;
  categoryId: string;
  description?: string;
};
const AudioUploadForm = () => {
  const { categories } = useCategory();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: uploadAudio,
  });

  const handleSuccess = () => {
    navigate('/library');
    queryClient.invalidateQueries({ queryKey: ['audios'] });
  };
  const handleSubmit = (values: FormValues) => {
    const formData = new FormData();

    formData.set('categoryId', values.categoryId);
    formData.set('description', values.description as string);
    formData.set('audio', values.audio[0]);
    formData.set('title', values.title);

    mutate(formData, { onSuccess: handleSuccess });
  };

  const dataSource = {
    category: categories
      ? categories?.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        })
      : [],
  };

  return (
    <div>
      <Form<FormValues>
        fields={FIELDS}
        dataSource={dataSource}
        onSubmit={handleSubmit}
        submitBtnProps={{ label: 'Upload' }}
      />
    </div>
  );
};

export default AudioUploadForm;
