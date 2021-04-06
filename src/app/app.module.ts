import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExchangeObjectComponent } from './Components/exchange-object/exchange-object.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {listLazyRoutes} from '@angular/compiler/src/aot/lazy_routes';
import { DetailComponent } from './Components/detail/detail.component';
import { MainComponent } from './Components/main/main.component';

const routes: Routes = [
  {path : 'detail', component: DetailComponent},
  {path: '', component: MainComponent}
];

// const config: ExtraOptions = {
// };


@NgModule({
  declarations: [
    AppComponent,
    ExchangeObjectComponent,
    NavBarComponent,
    DetailComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
