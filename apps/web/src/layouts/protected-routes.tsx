import { Navigate, Outlet, useNavigate } from 'react-router';
import useUser from '../hooks/useUser';
import { Button, Flex } from '@radix-ui/themes';

const ProtectedRoutes = () => {
  const { isLoggedIn, user } = useUser();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return (
      <Flex direction="column">
        {user?.user?.role === 'ADMIN' && (
          <Flex pb="4">
            <Button onClick={() => navigate('/users')}>Members</Button>
          </Flex>
        )}

        <Outlet />
      </Flex>
    );
  }
  return <Navigate to="/" />;
};

export default ProtectedRoutes;
