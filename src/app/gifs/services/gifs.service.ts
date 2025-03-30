import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';


const  loadFromLocalStorage = () => {

  const gifslocalStorage = localStorage.getItem('busquedas') ?? '{}';
  const gifs= JSON.parse(gifslocalStorage);
  return gifs;
}



@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trengingGifGroup = computed<Gif[][]>(()=>{

    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i+=3) {

      groups.push(this.trendingGifs().slice(i, i+3))

    }


    return groups;

  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()))


  saveToLocalStorage = effect(()=> {
    localStorage.setItem('busquedas',JSON.stringify( this.searchHistory()));
  })



  constructor(){
      this.loadTrendingGifs();
  }

  loadTrendingGifs(){

    if(this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);


    this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`,{
      params :{
        api_key : environment.giphyApiKey,
        limit : 24,
        offset : this.trendingPage() * 24
      }
    }).subscribe((resp)=>{
       const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
       this.trendingGifs.update(Currentgifs => [...Currentgifs, ...gifs])
       this.trendingPage.update(value=> value+1 )
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
