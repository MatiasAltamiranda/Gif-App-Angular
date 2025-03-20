import {  Component, inject, } from '@angular/core';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GiftListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {


    gifService = inject(GifService)

  onSearch(query:string){
      this.gifService.searchGifs(query)
  }

 }
