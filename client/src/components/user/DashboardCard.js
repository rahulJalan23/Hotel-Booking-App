import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';

function DashboardCard() {
  const { auth } = useSelector((state) => state);

  return (
    <Box sx={{ bgcolor: 'primary.main' }}>
      This is Dashboard Card
      <Paper elevation={0}>
        <Card elevation={0} sx={{ bgcolor: 'secondary.main' }}>
          <CardHeader>This is Card Header</CardHeader>
          <CardContent>This is card content</CardContent>
          <CardActions>This is card action</CardActions>
        </Card>
        {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_anabled ? (
          <>
            <Box>PendingBalance</Box>
            <Box>Payout Settings</Box>
          </>
        ) : (
          <Box>Coonect Stripe Account and Start Recieving Payments</Box>
        )}
      </Paper>
    </Box>
  );
}

export default DashboardCard;
