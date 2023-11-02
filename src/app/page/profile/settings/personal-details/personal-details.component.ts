import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent {
  @ViewChild('fileInput') fileInput: any;

  profileUpdateModel: boolean = false;
  imageUrl: any = '../../../../../assets/icons/PersonalDetails.svg';
  constructor(
    private router: Router,
    public formbuilder: FormBuilder,
    public apiService: ApiService
  ) {}
  // profileUpdate!: FormGroup;

  openUploadProfile() {
    this.fileInput.nativeElement.click();
  }
  goBack() {
    this.router.navigate(['tabs', 'profile', 'settings']);
  }
  updateDetail() {
    if (
      this.apiService.profileUpdate.get('firstName')?.valid ||
      this.apiService.profileUpdate.get('lastName')?.valid ||
      this.apiService.profileUpdate.get('email')?.valid ||
      this.apiService.profileUpdate.get('file')?.valid
    ) {
      const formData = this.apiService.profileUpdate.value;
      console.log('Request Payload:', formData);
      this.apiService.profileUpdateForm().subscribe(
        (response) => {
          console.log('upadte', response);
          this.profileUpdateModel = true;
        },
        (error) => {
          console.log('error', error);

          if (
            error.error.message == 'Email Already Exists' &&
            error.error.data == 409
          ) {
            this.apiService.profileUpdate
              .get('email')
              ?.setErrors({ existEmail: true });
          }
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
  imageData: any;

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertImageToData(file);
      this.apiService.profileUpdate.get('file')?.setValue(file);
    }
  }

  convertImageToData(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64 = e.target.result ?? '';
      const base64Toblob = fetch(base64)
        .then((response) => response.blob())
        .then((myBlob) => {
          this.imageData = URL.createObjectURL(myBlob);
          const objectURL = URL.createObjectURL(myBlob);
        });
    };

    reader.readAsDataURL(file);
  }

  closePopup() {
    this.profileUpdateModel = false;
    this.router.navigate(['profile', 'settings']);
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  ngOnInit(): void {
    this.apiService.getUserInfo().subscribe((userInfo: any) => {
      this.imageData = environment.baseURL + userInfo?.data?.image;
    });
  }
}
