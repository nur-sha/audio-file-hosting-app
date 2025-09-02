import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import CreateUser, {
  CreateUserFormValues,
} from '../../features/auth/create-user';
import { registerUser } from '../../api/user';
import useUser from '../../hooks/useUser';
import { UserModel } from '../../api/interfaces/user.types';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { mutate } = useMutation({
    mutationFn: registerUser,
  });

  const handleSubmit = (formValues: CreateUserFormValues) => {
    mutate(formValues, {
      onSuccess: (data: { data: UserModel }) => {
        setUser(data?.data);
        navigate('/profile');
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
