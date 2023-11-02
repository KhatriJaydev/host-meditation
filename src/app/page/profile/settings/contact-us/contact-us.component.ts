import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  constructor(private router: Router) {}

  isPopUpOpen: boolean = false;
  popUptitle: string = '';
  popupIcon: string = '';
  popupText: string = '';
  poupButtonText: String = '';

  contactItems = [
    {
      icon: '../../../../../assets/icons/Phone.svg',
      contactname: 'Phone',
      contact: '+01 234567890',
      span: 'You can just call us directly and we will help you.',
      buttonText: 'Call Us',
    },
    {
      icon: '../../../../../assets/icons/Email.svg',
      contactname: 'Email',
      contact: 'support@relax.io',
      span: 'Just send us an email and we will get back to you.',
      buttonText: 'Send Email',
    },
  ];

  openContactModel(item: any) {
    this.popUptitle = item.contactname;
    this.popupText = item.span;
    this.popupIcon = item.icon;
    this.poupButtonText = item.buttonText;
    this.isPopUpOpen = true;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  closePopup() {
    if (this.poupButtonText === 'Call Us') {
      window.location.href = 'tel:' + this.contactItems[0].contact;
      this.isPopUpOpen = false;
    } else if (this.poupButtonText === 'Send Email') {
      this.isPopUpOpen = false;
      window.location.href = 'mailto:' + this.contactItems[1].contact;
    }
  }

  goBack() {
    this.router.navigate(['tabs', 'profile', 'settings']);
  }
}
