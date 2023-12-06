import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Provider } from 'jotai';
import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { DialogProvider } from './components/organisms/SideMenu/context/DialogContext/DialogContext';
import UserContextProvider from './components/organisms/SideMenu/context/UserContext/UserContext';
import { Routes } from './routes/Routes';
import FontStyles from './styles/fonts';
import { GlobalStyles } from './styles/GlobalStyles';
import { muiTheme, theme } from './styles/theme/default';

const App = (): ReactElement => {
  return (
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={muiTheme}>
        <Provider>
          <FontStyles />
          <GlobalStyles />
          <UserContextProvider>
            <DialogProvider>
              <Router>
                <Routes />
              </Router>
            </DialogProvider>
          </UserContextProvider>
        </Provider>
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
};

export default App;
