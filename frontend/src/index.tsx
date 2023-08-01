import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Provider } from 'jotai';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import App from './App';
import FontStyles from './styles/fonts';
import { GlobalStyles } from './styles/GlobalStyles';
import { muiTheme, theme } from './styles/theme/default';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={muiTheme}>
        <Provider>
          <FontStyles />
          <GlobalStyles />
          <App />
        </Provider>
      </MuiThemeProvider>
    </StyledThemeProvider>
  </StrictMode>
);
