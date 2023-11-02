import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  activeTab: string = '';

  constructor(private router: Router) {}

  goToSelectedItem(SelectedSection: string) {
    this.activeTab = SelectedSection;
    if (SelectedSection === 'dashboard') {
      this.router.navigate(['tabs', 'dashboard']);
    } else if (SelectedSection === 'explor') {
      this.router.navigate(['tabs', 'explore']);
    } else if (SelectedSection === 'profile') {
      this.router.navigate(['tabs', 'profile']);
    }
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const activeTabName = currentUrl.split('/');
    // this.activeTab = activeTabName[activeTabName.length - 1];
    this.activeTab = activeTabName[2];
  }
}
