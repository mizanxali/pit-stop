import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/user/actions';
import useLeaderboard from './useLeaderboard';

export default function useUser() {
  const dispatch = useDispatch();
  const { fetchLeaderboard } = useLeaderboard();

  const fetchUser = useCallback(async (token: string) => {
    const authData = await fetch(`/api/user?token=${token}`);
    const user = await authData.json();
    console.log(user);
    // @ts-ignore
    dispatch(getUser(user.user));
  }, []);

  const changeProfilePhoto = useCallback(async (token: string, url: string) => {
    const authData = await fetch(`/api/profile?token=${token}&url=${url}`);
    const user = await authData.json();
    console.log(user);
    // @ts-ignore
    dispatch(getUser(user.user));
  }, []);

  const changeUsername = useCallback(
    async (token: string, username: string) => {
      const authData = await fetch(
        `/api/profile?token=${token}&username=${username}`
      );
      const user = await authData.json();
      console.log(user);
      // @ts-ignore
      dispatch(getUser(user.user));
      fetchLeaderboard();
    },
    []
  );

  return {
    fetchUser,
    changeProfilePhoto,
    changeUsername
  };
}
