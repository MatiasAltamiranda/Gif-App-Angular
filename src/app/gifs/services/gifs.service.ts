import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);



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
    this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/search`,{
      params :{
        api_key : environment.giphyApiKey,
        limit : 32,
        q: query,

      }
    }).subscribe((resp)=>{
       const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
       console.log( {search: gifs})
    });
  }



}
