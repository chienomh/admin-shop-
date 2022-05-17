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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

const faker = [12, 100, 223, 123, 500, 323, 123, 123];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '(Gross) Revenue',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: '$',
      data: faker.map(e => e),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
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
        <Box>
          <Bar options={options} data={data} />;
        </Box>
      </Container>
    </Page>
  );
}
