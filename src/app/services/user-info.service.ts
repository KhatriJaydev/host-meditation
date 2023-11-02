// import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserInfoService {
//   loginResponseData: any = '';
//   userToken: any = ''; //token save when login
//   constructor(private apiservice: ApiService) {}

//   loginResponse() {
//     this.apiservice.loginUserAccount().subscribe((response) => {
//       if (response) {
//         this.loginResponseData = response;
//         this.userToken = this.loginResponseData.data;
//         console.log('this.userToken', this.userToken);
//       }
//     });
//   }
// }
