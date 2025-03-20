import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";

@Component({
  selector: 'gif-history',
  imports: [GiftListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  gifService = inject(GifService)
  query=toSignal(inject(ActivatedRoute).params.pipe(map(params => params['query'])));
  gifsByKey = computed(()=>{
      return this.gifService.getHistoryGifs(this.query())
  })
}
