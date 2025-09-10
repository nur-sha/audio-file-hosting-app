import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes';
import Form from '../../components/form/form';
import { FIELDS } from './form.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategories } from '../../api/category';
import { useState } from 'react';

type FormValues = {
  name: string;
  description?: string;
};

const CategoryDialogForm = () => {
  const { mutate } = useMutation({ mutationFn: createCategories });
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] });
    queryClient.invalidateQueries({ queryKey: ['audios'] });
    setOpen(false);
  };

  const handleSubmit = (values: FormValues) => {
    mutate(values, { onSuccess: handleSuccess });
  };

  return (
    <div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button variant="surface" highContrast>
            <PlusIcon />
            <Text>Category</Text>
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Flex justify="between">
            <Dialog.Title>New Category</Dialog.Title>
            <Dialog.Close>
              <IconButton variant="ghost" color="gray">
                <Cross1Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>

          <Flex direction="column" gap="3"></Flex>
          <Form<FormValues>
            fields={FIELDS}
            submitBtnProps={{ label: 'Create' }}
            onSubmit={handleSubmit}
          />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default CategoryDialogForm;
