import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit, ViewChild, DoCheck, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ERROR_MESSAGES } from '../../constants/error-messages';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent implements OnInit, OnDestroy, DoCheck {
  formGroup!: FormGroup;
  errorMessages: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.formGroup = this.controlContainer.control as FormGroup;

    Object.keys(this.formGroup.controls).forEach((controlName) => {
      const control = this.formGroup.get(controlName);
      if (control) {
        const subscription = control.statusChanges.subscribe(() => {
          this.updateErrorMessages();
        });
        this.subscriptions.push(subscription);
      }
    });

    this.updateErrorMessages();
  }

  ngDoCheck(): void {
    this.updateErrorMessages();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private updateErrorMessages(): void {
    if (!this.formGroup) return;

    const messages: string[] = [];

    const collectErrors = (control: AbstractControl, controlName: string): void => {
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((key) => {
          const childControl = control.get(key);
          if (childControl) {
            collectErrors(childControl, `${controlName}.${key}`);
          }
        });
      } else if (control instanceof FormArray) {
        // FormArray
        control.controls.forEach((childControl, index) => {
          collectErrors(childControl, `${controlName}[${index}]`);
        });
      } else {
        if (control && control.invalid && (control.dirty || control.touched)) {
          const label = (control as any).label || controlName;
          const errors = control.errors;
          if (errors?.['required']) {
            messages.push(`${label} は必須入力してください。`);
          }
          if (errors?.['minlength']) {
            messages.push(`${label} は最低 ${errors['minlength'].requiredLength} 文字以上です。`);
          }
          if (errors?.['maxlength']) {
            messages.push(`${label} は最大 ${errors['maxlength'].requiredLength} 文字以下です。`);
          }
          if (errors?.['pattern']) {
            messages.push(`${label} は正しい形式で入力してください。`);
          }
          if (errors?.['email']) {
            messages.push(`${label} は正しい形式で入力してください。`);
          }
          if (errors?.['notPdf']) {
            messages.push(`ファイルはPDF形式である必要があります。`);
          }
          if (errors?.['yesFile']) {
            messages.push(`記録の際はファイル追加が必要です。`);
          }
          if (errors?.['noFile']) {
            messages.push(`作成実行の際はファイル追加はできません。`);
          }

          //郵便番号
          if(errors?.['invalidPostalCode']){
            messages.push(`${label}: ${errors['invalidPostalCode']}`);
          }
          // sameYearMonthWeekValidator
          if (errors?.['notSameYear']) {
            messages.push(`${label}: ${errors['notSameYear']}`);
          }
          if (errors?.['notSameMonth']) {
            messages.push(`${label}: ${errors['notSameMonth']}`);
          }
          if (errors?.['notSameWeek']) {
            messages.push(`${label}: ${errors['notSameWeek']}`);
          }
          if (errors?.['invalidDateFormat']) {
            messages.push(`${label}: ${errors['invalidDateFormat']}`);
          }
          //パスワード
          if(errors?.['invalidPassword']){
            messages.push(`${label}: ${errors['invalidPassword']}`);
          }
          //見積記録の開催日
          if(errors?.['implementationScheduleFormat']){
            messages.push(`${label}: ${errors['implementationScheduleFormat']}`);
          }
        }
      }
    };
  
    Object.keys(this.formGroup.controls).forEach((controlName) => {
      const control = this.formGroup.get(controlName);
      if (control) {
        collectErrors(control, controlName);
      }
    });

    const formErrors = this.formGroup.errors;
    if (formErrors) {
      Object.keys(formErrors).forEach((errorKey) => {
        const errorMessage = ERROR_MESSAGES[errorKey];
        if (errorMessage) {
          messages.push(errorMessage);
        }
      });
    }
  
    this.errorMessages = Array.from(new Set(messages));
  }
}
