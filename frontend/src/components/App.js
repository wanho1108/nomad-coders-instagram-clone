import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import Router from './Router';

export default () => (
  <ThemeProvider theme={Theme}>
    <>
    <GlobalStyles />
    <Router isLoggedIn={false} />
    </>
  </ThemeProvider>
)