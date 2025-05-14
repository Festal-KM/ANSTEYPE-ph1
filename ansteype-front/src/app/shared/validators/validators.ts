import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * 郵便番号
 */
export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const postalCodePattern = /^[0-9]{3}-[0-9]{4}$|^[0-9]{7}$/;
      if (control.value && !postalCodePattern.test(control.value)) {
        return { invalidPostalCode: '郵便番号の形式が正しくありません (例: 123-4567 または 1234567)。' };
      }

      return null;
    };
  }
  

/**
 * 同じ年 同じ月 同じ週
 */
export function sameYearMonthWeekValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const inputDates = control.value;

        if (!inputDates) {
            return null;
        }

        const dateList = inputDates.split(',').map((dateStr: string) => {
            const [year, month, day] = dateStr.split('/').map(Number);
            const fullYear = 2000 + year;
            return new Date(fullYear, month - 1, day);
        });

        const sameYear = dateList.every((date: Date) => date.getFullYear() === dateList[0].getFullYear());
        if (!sameYear) {
            return { notSameYear: '入力された開催日は同じ年に属していません。' };
        }

        const sameMonth = dateList.every((date: Date) => date.getMonth() === dateList[0].getMonth());
        if (!sameMonth) {
            return { notSameMonth: '入力された開催日は同じ月に属していません。' };
        }

        const weekNumbers = dateList.map((date: Date) => getWeekNumber(date));
        const sameWeek = weekNumbers.every((week: number) => week === weekNumbers[0]);
        if (!sameWeek) {
            return { notSameWeek: '入力された開催日は同じ週に属していません。' };
        }

        return null;
    };
}

function getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const startOfYearDay = startOfYear.getDay() || 7;
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;

    return Math.ceil((dayOfYear + startOfYearDay - 1) / 7);
}

/**
 * パスワード
 */
export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#¥%&*_?!]).+$/;
      if (control.value && !passwordPattern.test(control.value)) {
        return { invalidPassword: 'パスワードは数字、英字と特殊文字（@, #, ¥, %, &, *, _, ?, !）を少なくとも1つ含む必要があります。' };
      }

      return null;
    };
  }