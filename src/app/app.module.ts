import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {listLazyRoutes} from '@angular/compiler/src/aot/lazy_routes';

const routes: Routes = [
  // {path : 'detail', component: DetailComponent},
  // {path: '', component: MainComponent}
];

// const config: ExtraOptions = {
// };


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
