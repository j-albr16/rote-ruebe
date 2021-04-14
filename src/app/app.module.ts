import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {listLazyRoutes} from '@angular/compiler/src/aot/lazy_routes';
import { CreateExchangeObjectComponent } from './components/create-exchange-object/create-exchange-object.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  // {path : 'detail', component: DetailComponent},
  // {path: '', component: MainComponent}
];

// const config: ExtraOptions = {
// };


@NgModule({
  declarations: [
    AppComponent,
    CreateExchangeObjectComponent,
    ImageUploadComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
