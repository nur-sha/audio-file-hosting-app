import { Navigate, Outlet } from 'react-router';
import useUser from '../hooks/useUser';
import { Box, Flex } from '@radix-ui/themes';

const AdminRoutes = () => {
  const { user, isLoggedIn } = useUser();

  if (user?.user.role === 'ADMIN' && isLoggedIn) {
    return (
      <Flex align="center" direction="column">
        <Box width="100%" maxWidth="1440px">
          <Outlet />
        </Box>
      </Flex>
    );
  }

  return <Navigate to="/library" />;
};

export default AdminRoutes;
