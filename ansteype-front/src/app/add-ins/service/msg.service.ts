import { Injectable } from '@angular/core';
import { Util } from '../common/util';

const __Message_Store__ = '__Message_Store__';

@Injectable({
  providedIn: 'root',
})
export class MsgService {
  store: any = {};
  get: any;

  constructor() {
    // console.log('MessageService');

    this.get = function (id: string) {
      const msg = this.store[id];
      if (Util.isEmpty(msg)) {
        return String(id) + '対するメッセージ取得できません。';
      }

      var args = Array.prototype.slice.call(arguments, 1);
      return msg.replace(/{(\d+)}/g, function (match: any, number: any) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
      });
    };
  }

  initData(initData: any) {
    this.store = initData["msg"];
  }

  getMessage(key: any, error: any) {
    const symbol = '!"#\$\%&\'\(\)\*\+,\-\.\/:;=\?@\[\]^_\`\{\|\}~';
    switch (key) {
      case "required":
        return this.get("G2001")
      case "maxlength":
        if (error["requiredLength"] === 1) {
          return this.get("G2036", error["requiredLength"])
        } else {
          return this.get("G2002", error["requiredLength"])
        }
      case "minlength":
        return this.get("G2003", error["requiredLength"])
      case "email":
        return this.get("G2004")
      case "isHalfNumber":
        return this.get("G2005")
      case "isNaturalNumberOrZero":
        return this.get("G2031")
      case "isHalfEnNumberOnly":
        return this.get("G2006")
      case "isHalfEnNumber":
        return this.get("G2006", symbol)
      case "isYear":
        return this.get("G2008")
      case "is3or4DigitYear":
        return this.get("G2008")
      case "is4DigitYear":
        return this.get("G2008")
      case "is1or2DigitMonth":
        return this.get("G2042")
      case "isMonth":
        return this.get("G2009")
      case "isDay":
        return this.get("G2010")
      case "isPercent":
        return this.get("G2011")
      case "isArea":
        return this.get("G2012")
      case "isNarrowArea":
        return this.get("G2022")
      case "isHiragana":
        return this.get("G2013")
      case "isKatakana":
        return this.get("G2014")
      case "isKatakanaName":
        return this.get("G2014")
      case "isKana":
        return this.get("G2015")
      case "checkServiceYears":
        return this.get("G2016")
      case "checkPreviousYearIncome":
        return this.get("G2017")
      case "checkFundsTotalAmountMin":
        return this.get("G2018")
      case "checkFundsTotalAmountMax":
        return this.get("G2019")
      case "checkFundsYearsMin":
        return this.get("G2020")
      case "checkFundsYearsMax":
        return this.get("G2021")
      case "checkFullAge":
        return this.get("G2023")
      case "checkFundsYearsMinOrMax":
        return this.get("G2024")
      case "checkBorrowingPeriod":  // 借入希望期間、借入期間
        return this.get("G2026")
      case "PhoneNumberCheck":      // 電話番号の11桁以内チェック
        return this.get("G2033")
      default:
        return "入力内容が正しくありません。" // 保険としてこの内容にしておく
    }
  }
}
