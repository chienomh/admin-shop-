// material
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getInforDashboard } from 'src/services/loginAPI';
// components
import Page from '../components/Page';
import {
  AppBugReports,
  AppItemOrders,
  AppNewUsers,
  AppWeeklySales,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [dataDashboard, setDataDashboard] = useState();

  useEffect(() => {
    (async () => {
      const data = await getInforDashboard();
      setDataDashboard(data.data);
    })();
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        {dataDashboard && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWeeklySales data={dataDashboard.countProductTotal} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppNewUsers data={dataDashboard.countProductSelled} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders data={dataDashboard.UserEnabled} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports data={dataDashboard.UserBan} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
