import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsSideMenuHeaderComponent } from "./gifs-side-menu-header/gifs-side-menu-header.component";
import { GifsSideMenuOptionsComponent } from "./gifs-side-menu-options/gifs-side-menu-options.component";
@Component({
  selector: 'gift-side-menu',
  imports: [GifsSideMenuOptionsComponent,GifsSideMenuHeaderComponent],
  templateUrl: './gift-side-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftSideMenuComponent { }
