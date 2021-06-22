import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

interface NavBarData {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) {
  }

  private _navBarData: NavBarData[] = [
    {name: 'Home', path: '/home'},
    {name: 'Dashboard', path: '/dashboard'},
    {name: 'Social', path: '/social'},
  ]

  private _authNavBarData: NavBarData[] = [
    {name: 'Authentication', path: '/auth'}
  ]

  get isAuth(): boolean {
    return this.router.url === '/auth';
  }

  get navBarData(): NavBarData[] {
    return this.isAuth ? this._authNavBarData : this._navBarData;
  }


  ngOnInit(): void {

  }

  getIsSelected(route: string): string {
    return route === this.router.url ? 'selected' : '';
  }

}
