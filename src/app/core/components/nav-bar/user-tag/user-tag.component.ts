import {Component, OnInit} from '@angular/core';
import {Svg} from '../../../../shared/components/svg/svg.component';
import {UserService} from '@core/services/user.service';
import AppImage from '@core/models/app-image';

@Component({
  selector: 'app-user-tag',
  templateUrl: './user-tag.component.html',
  styleUrls: ['./user-tag.component.scss']
})
export class UserTagComponent implements OnInit {
  userSvg = Svg.AccountCircle;
  userName = 'username';
  image: AppImage;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    // this.loadAuthUserData();
  }

  loadAuthUserData(): void {
    this.userService.authUser.subscribe(
      user => {
        this.image = user.image;
        this.userName = user.userName;
      },
      error => console.error(error)
    )
    ;
  }
}
