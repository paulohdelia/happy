import Orphanage from '../models/Orphanage';

import imagesView, { ViewImage } from './images_view';

type ViewOrphanage = {
  id: number;
  name: string;
  about: string;
  instructions: string;
  latitude: number;
  longitude: number;
  open_on_weekends: boolean;
  opening_hours: string;
  images: ViewImage[];
};

export default {
  render(orphanage: Orphanage): ViewOrphanage {
    return {
      id: orphanage.id,
      name: orphanage.name,
      about: orphanage.about,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanage[]): ViewOrphanage[] {
    return orphanages.map(this.render);
  },
};
