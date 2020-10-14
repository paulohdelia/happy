import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.scss';

import mapMarkerImg from '../../images/map-marker.svg';

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#fff" />
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
