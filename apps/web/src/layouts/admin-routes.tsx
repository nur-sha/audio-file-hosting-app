import { Navigate, Outlet } from 'react-router';
import useUser from '../hooks/useUser';
import { Box, Container } from '@radix-ui/themes';
import { Header } from '../components/header';

const AdminRoutes = () => {
  const { isLoggedIn, isAdmin } = useUser();
  if (isAdmin && isLoggedIn) {
    return (
      <Box width="100%">
        <Header />
        <Container align="center" p="5">
          <Outlet />
        </Container>
      </Box>
    );
  }

  return <Navigate to="/library" />;
};

export default AdminRoutes;
