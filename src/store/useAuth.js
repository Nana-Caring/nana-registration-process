import { useSelector, useDispatch } from 'react-redux';
import { logout, clearError, clearRegistrationSuccess } from './authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const clearRegSuccess = () => {
    dispatch(clearRegistrationSuccess());
  };

  return {
    ...auth,
    logout: handleLogout,
    clearError: clearAuthError,
    clearRegistrationSuccess: clearRegSuccess,
  };
};
