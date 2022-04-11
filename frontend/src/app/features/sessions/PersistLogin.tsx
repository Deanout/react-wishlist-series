import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../store';
import { refreshAccessToken } from './sessionSlice';

function PersistLogin() {
  const loading = useSelector((state: RootState) => state.session.loading);
  const accessToken = useSelector((state : RootState) => state.session.accessToken);
  const refreshToken = useSelector((state : RootState) => state.session.refreshToken);
  const dispatch = useDispatch();

  useEffect(() => {
    function verifyRefreshToken() {
      try {
        dispatch(refreshAccessToken(refreshToken));
      } catch (error) {
        console.log(error);
      }
    }
    if (!accessToken) {
      verifyRefreshToken();
    }
  }, [accessToken, refreshToken]);

  return (
    <>
      {loading ? <p>Loading...</p> : <Outlet />}
    </>
  )
}

export default PersistLogin