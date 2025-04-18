import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption{
  label : string,
  subLabel : string,
  route : string,
  icon : string
}



@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuOptionsComponent {



   gifService = inject(GifService);

    menuOptions : MenuOption[] = [
      {
        icon : 'fa-solid fa-chart-line',
        label : 'Trending',
        subLabel : 'Gif Populares',
        route : '/dashboard/trending'
      },
      {
        icon : 'fa-solid fa-magnifying-glass',
        label : 'Buscador',
        subLabel : 'Buscar gif',
        route : '/dashboard/search'
      }
    ]




}
