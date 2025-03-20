import {  Component, inject, signal, } from '@angular/core';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'app-search-page',
  imports: [GiftListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {


    gifService = inject(GifService);
    gifsResultSearch = signal<Gif[]>([]);

  onSearch(query:string){
      this.gifService.searchGifs(query)
      .subscribe((res) =>{
          this.gifsResultSearch.set(res)
      })
  }

 }
