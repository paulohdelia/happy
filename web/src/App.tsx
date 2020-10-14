import React from 'react';

import Routes from './routes';

import './styles/global.scss';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <>
      <Routes />
    </>
  );
};

export default App;
