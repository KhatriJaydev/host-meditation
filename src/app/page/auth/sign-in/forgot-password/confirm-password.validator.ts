import { AbstractControl, FormGroup } from '@angular/forms';

export function ConfirmPasswordValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmPasswordValidator']
    ) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }

    // Check password strength criteria
    const password = control.value as string;
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordPattern.test(password)) {
      control.setErrors({ passwordStrength: true });
    } else {
      control.setErrors(null);
    }
  };
}
