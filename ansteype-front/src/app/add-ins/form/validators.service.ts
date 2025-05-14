import {
  ValidatorFn,
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { MsgService } from '../service/msg.service';
import { Util } from '../common/util';
import { Const } from '../common/const';

export class SkydeskValidators {
  static msg: MsgService = new MsgService();

  static required(control: AbstractControl): ValidationErrors | null {
    return Validators.required(control);
  }

  static empty(object?: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return null;
    };
  }


  static isEmail(control: AbstractControl): { [key: string]: any } | null {
    var regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9-]+)*$")
    const message = "メールアドレスの形式が正しくありません。";
    return regex.test(control.value) ? null : { errors: message };
  };

  static isHalfEnNumber(control: AbstractControl): { [key: string]: any } | null {
    var regex = new RegExp('[a-zA-Z0-9!"#\\$\\\\%&\'\\(\\)\\*\\+,\\-\\.\\/:;=\\?@\\[\\]^_\\`\\{\\|\\}~]*')
    const message = "半角英数字及び記号のみ使用できます。";
    return regex.test(control.value) ? null : { errors: message };
  };

  static isHalfEnNumberOnly(control: AbstractControl): { [key: string]: any } | null {
    var regex = new RegExp('[a-zA-Z0-9]*')
    const message = "半角英数字のみ使用できます（カンマ除く）。";
    return regex.test(control.value) ? null : { errors: message };
  };

  static isHalfEnNumberComma(control: AbstractControl): { [key: string]: any } | null {
    var regex = new RegExp('[a-zA-Z0-9,]*')
    const message = "半角英数字とカンマのみ使用できます。";
    return regex.test(control.value) ? null : { errors: message };
  };

  static isHalfEn(control: AbstractControl): { [key: string]: any } | null {
    var regex = new RegExp('[a-zA-Z]*')
    const message = "半角英字のみ使用できます。";
    return regex.test(control.value) ? null : { errors: message };
  };

  static isHalfNumber(control: AbstractControl): { [key: string]: any } | null {
    var regex = new RegExp('[0-9]*')
    const message = "半角数字のみ使用できます。";
    return regex.test(control.value) ? null : { errors: message };
  };

  static isFullCharacter(control: AbstractControl): { [key: string]: any } | null {
    var regex = new RegExp('[^\x01-\x7E]*')
    const message = "全角文字のみ使用できます。";
    return regex.test(control.value) ? null : { errors: message };
  };

  static isMoney(inte: number, dec: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      let tmp = '{0,' + String(inte - dec) + '}';
      let tmp1 = '{1,' + String(dec) + '}';

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[0-9]' + tmp + '?([.][0-9]' + tmp1 + ')?')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get(Const.Messages.MQ00045);

      return hasError ? { isMoney: message } : null;
    };
  }

  static intLength(inte: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const tmp = '{0,' + String(inte) + '}';
      let value = '';
      if (!Util.isEmpty(control.value)) {
        value = String(control.value).replace(/,/g, '');
      } else {
        return null;
      }
      const index = value.lastIndexOf('.');
      let checkValue = value;
      if (index > 0) {
        checkValue = checkValue.slice(0, index);
      }
      const newControl = new FormControl(
        checkValue,
        Validators.pattern('[0-9]' + tmp + '?')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const array = [inte];
      const message = this.msg.get(Const.Messages.MQ00089);

      return hasError ? { intLength: message } : null;
    };
  }

  static isNumber(): ValidatorFn {  // 呼出箇所がない模様
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('(0|[1-9][0-9]*)+([.][0-9]*)?')
      );

      if (newControl.errors) {
        hasError = true;
        // const value = newControl.value;
        // control.setValue(value.substring(0, value.length - 1));
      }

      const message = this.msg.get(Const.Messages.MQ00043);

      return hasError ? { isNumber: message } : null;
    };
  }

  // 自然数またはゼロであるか
  static isNaturalNumberOrZero(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('^(0|([1-9][0-9]*))$')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isNaturalNumberOrZero: message } : null;
    };
  }

  static isYear(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[1-9]\\d{0,3}') // 1文字目は0以外で必須、2～4文字目は数字で任意
        // Validators.pattern('\\d{0,4}')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isYear: message } : null;
    };
  }

  static is3or4DigitYear(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('\\d{3,4}') // 3, 4桁の数値。先頭は0でも可(0001等)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isYear: message } : null;
    };
  }

  static is4DigitYear(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('\\d{4}') // 4桁の数値。先頭は0でも可(0001等)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isYear: message } : null;
    };
  }

  /** 
   * 1から12までの月（「ヵ月」ではない）のための入力制約
   */
  static is1or2DigitMonth(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[1-9]$|^1[0-2]')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { is1or2DigitMonth: message } : null;
    };
  }

  static isMonth(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        //Validators.pattern('[1-9]$|^1[0-2]')
        Validators.pattern('[0-9]$|^1[0-1]')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isMonth: message } : null;
    };
  }

  static isDay(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[1-9]$|^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isDay: message } : null;
    };

  }
  static isPercent(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('(\\d{1,2}(\\.\\d{0,3})?)')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isPercent: message } : null;
    };
  }
  static isArea(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('(\\d{1,4}(\\.\\d{0,2})?)')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isArea: message } : null;
    };
  }

  static isNarrowArea(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('(\\d{1,3}(\\.\\d{0,2})?)')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isNarrowArea: message } : null;
    };
  }

  static isTel(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const symbol = '\\+\\-\\(\\)';

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[0-9' + symbol + ']*')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get(Const.Messages.MQ00090);

      return hasError ? { isTel: message } : null;
    };
  }

  static isHiragana(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[ぁ-んー\\s-]+')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get(Const.Messages.MQ00090);

      return hasError ? { isHiragana: message } : null;
    };
  }

  static isKatakana(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const symbol =
        '!"#\\$\\\\%&\'\\(\\)\\*\\+,\\-\\.\\/:;=\\?@\\[\\]^_\\`\\{\\|\\}~！”＃＄％＆’ー、＜＞？」「｛｝＋＊＝（）～｜‘：￥＿';

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[ァ-ンヴーa-zA-Zａ-ｚＡ-Ｚ0-9０-９　 ' + symbol + ']+')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get(Const.Messages.MQ00090);

      return hasError ? { isKatakana: message } : null;
    };
  }

  static isKatakanaName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[ァ-ンヴー　]+')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get(Const.Messages.MQ00090);

      return hasError ? { isKatakana: message } : null;
    };
  }

  static isKana(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.pattern('[ぁ-んァ-ンヴー\\s-]+')
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get(Const.Messages.MQ00090);

      return hasError ? { isKana: message } : null;
    };
  }

  static minLength(num: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const newControl = new FormControl(
        control.value,
        Validators.minLength(num)
      );
      return Util.clone(newControl.errors);
    };
  }

  static maxLength(num: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const newControl = new FormControl(
        Util.isNumber(control.value) ? control.value.toString() : control.value,
        Validators.maxLength(num)
      );

      // if (newControl.errors) {
      //   let value = newControl.value;
      //   control.setValue(value.slice(0, -1));
      // }

      return Util.clone(newControl.errors);
    };
  }

  static checkAge(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.min(18) && Validators.max(65)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { isNumber: message } : null;
    };
  }

  static checkServiceYears(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.min(1)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkServiceYears: message } : null;
    };
  }

  static checkPreviousYearIncome(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.min(1000000)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkPreviousYearIncome: message } : null;
    };
  }

  static checkFundsTotalAmountMin(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.min(1000000)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkFundsTotalAmountMin: message } : null;
    };
  }

  static checkFundsTotalAmountMax(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.max(80000000)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkFundsTotalAmountMax: message } : null;
    };
  }

  // 借入期間
  static checkBorrowingPeriod(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.min(100) && Validators.max(3500) // 「YY年MMヵ月」は数値（= YY * 100 + MM ）で表現されるため、「35年0ヵ月」は「3500」となる。
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkBorrowingPeriod: message } : null;
    };
  }

  static checkFundsYearsMin(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.min(2)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkFundsYearsMin: message } : null;
    };
  }

  static checkFundsYearsMax(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        Validators.max(35)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkFundsYearsMax: message } : null;
    };
  }

  static checkFundsYearsMinOrMax(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        [Validators.max(35), Validators.min(2)]
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkFundsYearsMinOrMax: message } : null;
    };
  }

  static checkFullAge(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      const newControl = new FormControl(
        control.value,
        [Validators.max(65), Validators.min(20)]
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkFullAge: message } : null;
    };
  }

  static password(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let hasError = false;

      "パスワードは少なくとも6文字以上16文字以下で、数字、英字と特殊文字（@, #, ¥, %, &, *, _, ?, !）を少なくとも1つ含む必要があります。";
      const pattern = '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#¥%&*_?!])[0-9a-zA-Z@#¥%&*_?!]{6,16}$';

      const newControl = new FormControl(
        control.value,
        Validators.pattern(pattern)
      );

      if (newControl.errors) {
        hasError = true;
      }

      const message = this.msg.get("");

      return hasError ? { checkFullAge: message } : null;
    };
  }



}
