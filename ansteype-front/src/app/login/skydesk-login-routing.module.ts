import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompleteComponent } from './complete/complete.component';
import { AccountComponent } from './account/account.component';
import { DemoComponent } from './demo/demo.component';
import { PasswordComponent } from './password/password.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'password', component: PasswordComponent },
    { path: 'changepassword', component: ChangePasswordComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'complete', component: CompleteComponent },
    { path: 'account', component: AccountComponent },
    { path: 'demo', component: DemoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SkydeskLoginRoutingModule { }
