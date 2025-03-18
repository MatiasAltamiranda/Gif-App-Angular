import { Gif } from '../interfaces/gif.interfaces';
import { GiphyItem } from './../interfaces/giphy.interfaces';


export class GifMapper{
  static mapGiphyItemToGif(GiphyItem : GiphyItem):Gif{
      return{
        id: GiphyItem.id,
        titulo : GiphyItem.title,
        url : GiphyItem.images.original.url
      }
  }

  static mapGiphyItemsToGifArray(GiphyItem : GiphyItem[]):Gif[]{

      return GiphyItem.map(this.mapGiphyItemToGif)

  }

}
