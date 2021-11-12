// import { Switch } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useState } from 'react';
// import PrivateRoute from '../PrivateRoute';
import DashboardNav from './DashboardNav';
import Bookings from './Bookings';
import Hotels from './Hotels';
import DashboardCard from './DashboardCard';
function Dashboard() {
  console.log(window.location.pathname);
  const [path, setpath] = useState(window.location.pathname);
  useEffect(() => {
    setpath(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <Box>
      <DashboardCard />
      <DashboardNav border />
      {path === '/dashboard' && (
        <>
          <Bookings />
        </>
      )}
      {path === '/dashboard/seller' && (
        <>
          <Hotels />
        </>
      )}
    </Box>
  );
}

export default Dashboard;
