import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
