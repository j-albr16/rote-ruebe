import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavBarComponent} from '@core/components/nav-bar/nav-bar.component';
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@shared/shared.module';



@NgModule({
  declarations: [NavBarComponent, ProfileMenuComponent],
  exports: [
    NavBarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ]
})
export class CoreModule { }
