import { AudioPlayerProvider } from 'react-use-audio-player';
import AudioList from '../../features/audio/audio-list';
import { Button, Flex, Text } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router';
import useUser from '../../hooks/useUser';
import { Show } from '../../components/show';
import { CategoryDialogForm } from '../../features/category';

const Library = () => {
  const navigate = useNavigate();
  const { isAdmin } = useUser();

  const handleUpload = () => {
    navigate('/library/upload');
  };

  return (
    <AudioPlayerProvider>
      <Flex justify="end" mb="4" gap="3">
        <Button variant="surface" highContrast onClick={handleUpload}>
          <PlusIcon />
          <Text>Upload</Text>
        </Button>
        <Show when={isAdmin}>
          <CategoryDialogForm />
        </Show>
      </Flex>
      <AudioList />
    </AudioPlayerProvider>
  );
};

export default Library;
