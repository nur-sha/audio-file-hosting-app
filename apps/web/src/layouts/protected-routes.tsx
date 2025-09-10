import { Navigate, Outlet, useNavigate } from 'react-router';
import useUser from '../hooks/useUser';
import { Box, Button, Container, Flex } from '@radix-ui/themes';
import { Header } from '../components/header';

const ProtectedRoutes = () => {
  const { isLoggedIn, user } = useUser();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return (
      <Box width="100%">
        <Header />
        <Container align="center" p="5">
          {user?.user?.role === 'ADMIN' && (
            <Flex pb="4">
              <Button onClick={() => navigate('/users')}>Members</Button>
            </Flex>
          )}

          <Outlet />
        </Container>
      </Box>
    );
  }
  return <Navigate to="/" />;
};

export default ProtectedRoutes;
