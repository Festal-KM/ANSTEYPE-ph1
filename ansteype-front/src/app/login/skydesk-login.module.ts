import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompleteComponent } from './complete/complete.component';
import { AccountComponent } from './account/account.component';
import { SkydeskLoginRoutingModule } from './skydesk-login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { DemoComponent } from './demo/demo.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { PasswordComponent } from './password/password.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    CompleteComponent,
    AccountComponent,
    DemoComponent,
    PasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SkydeskLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    RadioButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    ButtonModule,
    InputSwitchModule,
    SidebarModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    DropdownModule,
    CalendarModule,
    RouterModule,
    TranslateModule,
    DividerModule,
    CardModule,
    TooltipModule,
    DialogModule
  ]
})
export class SkydeskLoginModule { }
