import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { scrollStateService } from 'src/app/shared/services/scroll-state.service';



@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {

  gifService = inject(GifService);
  scrollStateServie = inject(scrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')


  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

      scrollDiv.scrollTop = this.scrollStateServie.trendingScrollState();

  }

  onScroll(event : Event) {
     const scrollDiv = this.scrollDivRef()?.nativeElement;
      if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeigth = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeigth;
    this.scrollStateServie.trendingScrollState.set(scrollTop)


      if(isAtBottom){
        this.gifService.loadTrendingGifs();
      }
  }



}
