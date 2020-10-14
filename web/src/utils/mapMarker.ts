import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

const markerSize = 45;
export const popUpWidth = 240;

const MapMarker = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [markerSize, markerSize],
  iconAnchor: [markerSize / 2, markerSize],
  popupAnchor: [popUpWidth / 2 + markerSize * 0.9, 11],
});

export default MapMarker;
