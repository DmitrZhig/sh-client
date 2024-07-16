import { useAppDispatch } from '../../../redux/hooks';
import { fetchSignOut } from '../../../redux/auth/authThunkActions';

export default function Logout() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(fetchSignOut())
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='navbarBtnGrey' onClick={handleLogout}>
      Выйти
    </div>
  );
}
