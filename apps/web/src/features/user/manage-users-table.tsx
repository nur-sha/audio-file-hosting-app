import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../api/user';
import { Flex, Heading, IconButton, Table } from '@radix-ui/themes';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { UserModel, UsersModelResponse } from '../../api/interfaces/user.types';

const ActionButtons = ({ user }: { user: UserModel }) => {
  return (
    <Flex gap="3">
      <IconButton variant="outline" radius="medium">
        <TrashIcon width="18" height="18" />
      </IconButton>
      <IconButton variant="outline" radius="medium">
        <Pencil1Icon width="18" height="18" />
      </IconButton>
    </Flex>
  );
};

const ManageUsersTable = () => {
  const { data: { data } = {}, isLoading } = useQuery<UsersModelResponse>({
    queryKey: ['users'],
    queryFn: getAllUsers,
    retry: false,
  });

  if (isLoading) {
    return <div>laoding....</div>;
  }
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Display name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {(data?.users || []).map((item) => {
            return (
              <Table.Row>
                <Table.Cell>{item.fullName}</Table.Cell>
                <Table.Cell>{item.displayName}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.role}</Table.Cell>
                <Table.Cell>
                  <ActionButtons user={item} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default ManageUsersTable;
