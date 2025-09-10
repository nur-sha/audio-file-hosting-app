import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import CreateUser, {
  CreateUserFormValues,
} from '../../features/auth/create-user';
import { registerUser } from '../../api/user';
import useUser from '../../hooks/useUser';
import { UserModel } from '../../api/interfaces/user.types';

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser, isAdmin } = useUser();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: registerUser,
  });

  const handleSubmit = (formValues: CreateUserFormValues) => {
    mutate(formValues, {
      onSuccess: (data: { data: UserModel }) => {
        if (!user || !isAdmin) {
          setUser(data?.data);
          navigate('/profile');
          return;
        }

        if (isAdmin) {
          queryClient.invalidateQueries({ queryKey: ['users'] });
          navigate('/users');
        }
      },
    });
  };

  return (
    <CreateUser
      title="Register"
      submitBtnLabel="Register Now!"
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
