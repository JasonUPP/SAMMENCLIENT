import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { signUpDto } from 'src/app/Models/Dtos/signUpDto';


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;
  formData: any = {};  

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;
    const { email, password, name, lastName } = this.formData;
    const usr: signUpDto = {      
      Name: name,
      LastName: lastName,
      Email: email,
      Password: password   
    };
    this.authService.signUp(usr)
    .subscribe({
      next: () => {        
        this.router.navigate(['/login-form']);        
      },
      error: (error) => {
        this.loading = false;
        notify(error.error, 'error', 2000);
      }
    })

    // const result = await this.authService.createAccount(email, password);
    this.loading = false;

    // if (result.isOk) {
    //   this.router.navigate(['/login-form']);
    // } else {
    //   notify(result.message, 'error', 2000);
    // }
  }

  confirmPassword = (e: ValidationCallbackData) => {    
    return e.value === this.formData.password;
  }

  minimumLength = (e:ValidationCallbackData) => {    
    return (e.value).length < 8 ?  false : true;
  }

  checkForNumber = (e:ValidationCallbackData) => {
    return /\d/.test(e.value);
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ CreateAccountFormComponent ],
  exports: [ CreateAccountFormComponent ]
})
export class CreateAccountFormModule { }
