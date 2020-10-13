import Image from '../models/Image';

export interface ViewImage {
  id: number;
  url: string;
}

export default {
  render(image: Image): ViewImage {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]): ViewImage[] {
    return images.map(this.render);
  },
};
