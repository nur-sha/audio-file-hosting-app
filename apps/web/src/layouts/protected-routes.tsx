import { Navigate, Outlet } from 'react-router';
import useUser from '../hooks/useUser';
import { Box, Button, Container, Flex } from '@radix-ui/themes';
import { Header } from '../components/header';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return (
      <Box width="100%">
        <Header />
        <Container align="center" p="5">
          <Outlet />
        </Container>
      </Box>
    );
  }
  return <Navigate to="/" />;
};

export default ProtectedRoutes;
