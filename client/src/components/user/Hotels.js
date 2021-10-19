import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

function Hotels() {
  return (
    <Box>
      <Link to="/hotels/new">
        <Button variant="contained">+ Add New</Button>
      </Link>
    </Box>
  );
}

export default Hotels;
