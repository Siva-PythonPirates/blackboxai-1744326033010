import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, getUserProfile, refreshToken } from '../store/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        await dispatch(getUserProfile());
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, dispatch]);

  const loginUser = async (credentials) => {
    const userData = await dispatch(login(credentials)).unwrap();
    return userData;
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const refreshUserToken = async () => {
    await dispatch(refreshToken());
  };

  return {
    user,
    isAuthenticated,
    accessToken,
    loginUser,
    logoutUser,
    refreshUserToken,
  };
};

export default useAuth;
