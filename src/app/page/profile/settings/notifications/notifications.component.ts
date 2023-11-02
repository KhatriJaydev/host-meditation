import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  constructor(private router: Router, private apiService: ApiService) {}

  getNotificationsStatus() {
    this.apiService.getUserNotificationStatus().subscribe(
      (response: any) => {
        if (response) {
          response.data.forEach((notification: any) => {
            notification.is_sub_flag = (notification.is_sub_flag === 'true');
          });
          this.notifications = response.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleNotification(notificationId: any, notificationFlag: any) {
    this.apiService
      .updateNotification(notificationId, notificationFlag)
      .subscribe((response) => {
        console.log(response);
      });
  }
  goBack() {
    this.router.navigate(['tabs', 'profile', 'settings']);
  }
  ngOnInit() {
    this.getNotificationsStatus();
  }
}
