import React from 'react';
import * as colors from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import PublicRoutes from './Routes/PublicRoutes';
import { rootStore } from './Slices/rootStore';

const theme = createTheme({
  palette: {
    primary: colors.deepOrange,
    // secondary: {
    //   main: '#000000'
    // },
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={rootStore}>
        <PublicRoutes />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
