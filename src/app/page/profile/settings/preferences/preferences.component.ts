import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {
  preferences: any[] = [];
  constructor(private router: Router, private apiService: ApiService) {}

  getPreferencessStatus() {
    this.apiService.getUserPreferencesStatus().subscribe(
      (response: any) => {
        if (response) {
          response.data.forEach((preference: any) => {
            preference.is_flag = (preference.is_flag === 'true');
          });
          this.preferences = response.data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  togglePreference(preferencesId: any, preferenceFlag: any) {
    this.apiService
      .updatePreferences(preferencesId, preferenceFlag)
      .subscribe((response) => {
        console.log(response);
      });
  }
  goBack() {
    this.router.navigate(['tabs', 'profile', 'settings']);
  }
  ngOnInit() {
    this.getPreferencessStatus();
  }
}
