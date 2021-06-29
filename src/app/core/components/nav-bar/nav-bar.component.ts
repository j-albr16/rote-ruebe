import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Svg} from '../../../shared/components/svg/svg.component';

interface NavBarData {
  path: string;
  name: string;
  icon: Svg;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) {
  }

  favIcon = Svg.Flower;
  notificationIcon = Svg.Notification;
  dashboardIcon = Svg.Dashboard;
  socialIcon = Svg.Person;
  homeIcon = Svg.Home;
  grassIcon = Svg.Grass;

  private _navBarData: NavBarData[] = [
    {name: 'Home', path: '/home', icon: this.homeIcon},
    {name: 'Dashboard', path: '/dashboard', icon: this.dashboardIcon},
    {name: 'Social', path: '/social', icon: this.socialIcon},
  ]

  private _authNavBarData: NavBarData[] = [
    {name: 'Authentication', path: '/auth', icon: this.socialIcon}
  ]

  get isAuth(): boolean {
    return this.router.url === '/auth';
  }

  get navBarData(): NavBarData[] {
    console.log(this._navBarData[0].icon.valueOf())
    return this.isAuth ? this._authNavBarData : this._navBarData;
  }


  ngOnInit(): void {

  }

  getIsSelected(route: string): string {
    return route === this.router.url ? 'selected' : '';
  }

}
