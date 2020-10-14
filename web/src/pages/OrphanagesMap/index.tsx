import React from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../../images/map-marker.svg';

import './styles.scss';

const markerSize = 45;
const popUpWidth = 240;

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [markerSize, markerSize],
  iconAnchor: [markerSize / 2, markerSize],
  popupAnchor: [popUpWidth / 2 + markerSize * 0.9, 11],
});

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Guarulhos</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.4442507, -46.5354676]}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
      >
        {/* TileLayer from Open Street Map */}
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        <Marker icon={mapIcon} position={[-23.4442507, -46.5354676]}>
          <Popup
            closeButton={false}
            minWidth={popUpWidth}
            maxWidth={popUpWidth}
            className="map-popup"
          >
            Hello
            <Link to="/orphanages/1">
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
