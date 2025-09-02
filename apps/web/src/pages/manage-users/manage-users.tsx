import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../api/user';
import { Heading, Table } from '@radix-ui/themes';
import { UsersModelResponse } from '../../api/interfaces/user.types';
import { UserActionButtons } from './user-action-buttons';

const ManageUsers = () => {
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
      <Heading size="8" mb="5" mt="4">
        Members
      </Heading>
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
          {(data?.users || []).map((user) => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{user.fullName}</Table.Cell>
                <Table.Cell>{user.displayName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                  <UserActionButtons user={user} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default ManageUsers;
