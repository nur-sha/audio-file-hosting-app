import { UserModel } from '../api/interfaces/user.types';
import useSessionStorage from './useStorageQuery';

function useUser() {
  const [user, setUserStorage] = useSessionStorage('user');

  const setUser = (data: UserModel) => {
    setUserStorage(data);
  };

  return { user, setUser, isLoggedIn: Boolean(user?.token) };
}

export default useUser;
