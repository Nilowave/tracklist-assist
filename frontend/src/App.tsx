import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes/Routes';

const App = (): ReactElement => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
