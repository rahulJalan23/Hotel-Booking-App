import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

function DashboardNav() {
  const activePath = window.location.pathname;

  return (
    <Box sx={{ flexDirection: 'row', color: 'primary.main' }}>
      <Link
        className={`${activePath === '/dashboard' && 'activeTab'}`}
        to="/dashboard"
      >
        Your Bookings
      </Link>
      <Link
        className={`${activePath === '/dashboard/seller' && 'activeTab'}`}
        to="/dashboard/seller"
      >
        Your Hotels
      </Link>
    </Box>
  );
}

export default DashboardNav;
