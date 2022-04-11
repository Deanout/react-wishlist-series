import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { logoutUser } from './sessionSlice';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = useSelector((state : RootState) => state.session.accessToken);

  useEffect(() => {
    if (refreshToken){
      dispatch(logoutUser(refreshToken));
    }
    navigate('/login');
  }, []);

  return (
    <div>Logout</div>
  )
}

export default Logout