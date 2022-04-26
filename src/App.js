// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { useDispatch } from 'react-redux';
import { login } from './sections/authentication/login/slice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  dispatch(login());

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
