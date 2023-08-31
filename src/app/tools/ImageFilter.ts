import {Image} from "../model/Image";


export class ImageFilter{
  static getBestBackdrop(imgs: Image[]): string{
    const bestImage = imgs.sort((a, b) => b.height - a.height)[0];
    return "https://image.tmdb.org/t/p/original"+bestImage.file_path;
  }

}
