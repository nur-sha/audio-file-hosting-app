import { Cross1Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, IconButton, Text } from '@radix-ui/themes';
import { UserModel } from '../../api/interfaces/user.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Form from '../../components/form/form';
import {
  DISPLAY_NAME_FIELD,
  ROLE_FIELD,
} from '../../features/auth/form-config';
import {
  deleteUserById,
  updateUserById,
  UpdateUserPayload,
} from '../../api/user';
import { useState } from 'react';

export const UserActionButtons = ({ user }: { user: UserModel }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateUserById,
    retry: false,
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: deleteUserById,
    retry: false,
  });

  const handleSubmit = (values: UpdateUserPayload) => {
    mutate(
      { ...values, userId: user.id },
      {
        onSuccess: () => {
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ['users'] });
        },
      }
    );
  };

  const handleDelete = () => {
    deleteUser(
      { userId: user.id },
      {
        onSuccess: () => {
          setOpenDelete(false);
          queryClient.invalidateQueries({ queryKey: ['users'] });
        },
      }
    );
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Flex gap="3">
      <Dialog.Root open={openDelete} onOpenChange={setOpenDelete}>
        <Dialog.Trigger>
          <IconButton variant="outline" radius="medium">
            <TrashIcon width="18" height="18" />
          </IconButton>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Flex justify="between">
            <Dialog.Title>Delete user</Dialog.Title>
            <Dialog.Close>
              <IconButton variant="ghost" color="gray">
                <Cross1Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>

          <Flex direction="column" gap="3">
            <Text>
              Are you sure you want to delete <b>{user.displayName}</b>?
            </Text>
          </Flex>

          <Flex gap="2" pt="4">
            <Dialog.Close>
              <Button variant="soft">No</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleDelete}>Yes</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger>
          <IconButton variant="outline" radius="medium">
            <Pencil1Icon width="18" height="18" />
          </IconButton>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Flex justify="between">
            <Dialog.Title>Edit user</Dialog.Title>
            <Dialog.Close>
              <IconButton variant="ghost" color="gray">
                <Cross1Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>

          <Flex direction="column" gap="3">
            <Form
              fields={[ROLE_FIELD, DISPLAY_NAME_FIELD]}
              submitBtnProps={{ label: 'Update user' }}
              onSubmit={handleSubmit}
              defaultValues={{ role: user.role, displayName: user.displayName }}
            />
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
};
