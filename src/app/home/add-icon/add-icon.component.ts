import { Component, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-add-icon',
  templateUrl: './add-icon.component.html',
  styleUrls: ['./add-icon.component.scss'],
})
export class AddIconComponent implements OnInit {
  modalVersion: boolean;
  modalPwaPlatform: string | undefined;
  modalPwaEvent: any;

  constructor(private platform: Platform) {
    this.modalVersion = true;
  }

  ngOnInit(): void {
    this.loadModalPwa();
  }
  loadModalPwa() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }
    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }

  addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  closeVersion(): void {
    this.modalVersion = false;
  }
  
}
