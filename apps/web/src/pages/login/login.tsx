import { Box, Flex, Heading, Text } from '@radix-ui/themes';
import LoginForm, { LoginFormFieldValues } from '../../features/auth/login';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../api/auth';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { UserModel } from '../../api/interfaces/user.types';
import useUser from '../../hooks/useUser';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { mutate } = useMutation({
    mutationFn: loginUser,
  });

  const handleSuccess = (data: { data: UserModel }) => {
    setUser(data?.data);
    navigate('/library');
  };

  const handleError = () => {
    setError('Please try again later');
  };

  const handleSubmit = (values: LoginFormFieldValues) => {
    if (error) setError('');
    console.log('handleSubmit');
    mutate(values, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <Flex height="50vh" justify="center" align="center">
      <Box>
        <Heading align="center" size="8">
          Welcome
        </Heading>
        <LoginForm onSubmit={handleSubmit} />
        {error && (
          <Text size="1" color="red">
            {error}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default Login;
