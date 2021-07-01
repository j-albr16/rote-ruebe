import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Svg} from '../../../shared/components/svg/svg.component';
import {AuthService} from '@core/services';
import {AppRoutes, navRoute} from '@core/utils/enums';

interface NavBarEntry {
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

  constructor(private router: Router, private authService: AuthService) {
  }

  // Icons
  favIcon = Svg.Flower;
  dashboardIcon = Svg.Dashboard;
  socialIcon = Svg.Person;
  homeIcon = Svg.Home;
  grassIcon = Svg.Grass;

  private _navBarData: NavBarEntry[] = [
    {name: 'Home', path: navRoute(AppRoutes.Home), icon: this.homeIcon},
    {name: 'Dashboard', path: navRoute(AppRoutes.Dashboard), icon: this.dashboardIcon},
    {name: 'Social', path: navRoute(AppRoutes.Social), icon: this.socialIcon},
  ];
  // private _navBarData: NavBarEntry[] = [
  //   {name: 'Home', path: '/home', icon: this.homeIcon},
  // ];

  private _authNavBarData: NavBarEntry[] = [
    {name: 'Authentication', path: navRoute(AppRoutes.Auth), icon: this.socialIcon}
  ];
  // private _authNavBarData: NavBarEntry[] = [
  //   {name: 'Authentication', path: '/auth', icon: this.socialIcon}
  // ];

  get isAuth(): boolean {
    return this.authService.isAuth;
  }

  get navBarData(): NavBarEntry[] {
    return this.isAuth ? this._navBarData : this._authNavBarData;
  }

  ngOnInit(): void {
  }
}
