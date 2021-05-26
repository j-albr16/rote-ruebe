import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ImageUploadComponent} from './components/image/image-upload/image-upload.component';
import {FileDragDropComponent} from './components/image/file-drag-drop/file-drag-drop.component';


@NgModule({
  declarations: [ImageUploadComponent, FileDragDropComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class SharedModule {
}
