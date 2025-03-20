import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';



@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchHistory = signal <Record<string,Gif[]>>({})
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()))

  constructor(){
      this.loadTrendingGifs();
  }

  loadTrendingGifs(){

    this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`,{
      params :{
        api_key : environment.giphyApiKey,
        limit : 32,
      }
    }).subscribe((resp)=>{
       const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
       this.trendingGifs.set(gifs)
       this.trendingGifsLoading.set(false)
    });

  }

  searchGifs(query:string){
   return this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/search`,{
      params :{
        api_key : environment.giphyApiKey,
        limit : 32,
        q: query,

      }
    }).pipe(
      map( ({data}) => data ),
      map( (items) => GifMapper.mapGiphyItemsToGifArray(items) ),

      tap(items =>{
        this.searchHistory.update(history => ({...history,[query.toLocaleLowerCase()] : items }))
      })

    );
    /* .subscribe((resp)=>{
       const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
       console.log( {search: gifs})
       return gifs
    }); */
  }

  getHistoryGifs (query: string): Gif[]{
    console.log(this.searchHistory())
      return this.searchHistory()[query] ?? []
  }

}
