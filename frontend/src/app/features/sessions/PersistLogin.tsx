import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

function PersistLogin() {
  const loading = false;
  const accessToken = false;
  const refreshToken = null;

  useEffect(() => {
    function verifyRefreshToken() {
      try {
        // dispatch(refreshAccessToken(refreshToken));
        console.log("Refreshing Access token");
      } catch (error) {
        console.log("Error refreshing access token");
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