import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';

function Bookings() {
  const history = useHistory();
  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          history.push('/');
        }}
      >
        Browse Hotels
      </Button>
    </Box>
  );
}

export default Bookings;
