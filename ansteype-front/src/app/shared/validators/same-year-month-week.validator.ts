import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

    return null; // 验证通过
  };
}

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const startOfYearDay = startOfYear.getDay() || 7;
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  return Math.ceil((dayOfYear + startOfYearDay - 1) / 7);
}
