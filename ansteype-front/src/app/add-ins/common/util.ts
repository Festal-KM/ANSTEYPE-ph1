

import * as _ from 'lodash';

function convertDate(value: any) {
  return Util.formatValueToDate(value);
}

import * as $ from 'jquery';

export const Util = {

  $: $,

  jQuery: $,

  isString: function (value: any) {
    return typeof value === 'string';
  },

  isIEorEdge: function () {
    return /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  },

  formatDateObject: function (object: string) {
    if (typeof object !== 'string') {
      object = Util.encode(object);
    }
    return JSON.parse(object, (key: any, value: any) => convertDate(value));
  },

  formatValueToDate: function (value: string | number | Date | any) {
    if (typeof value !== 'string') {
      return value;
    }
    if (value === '0001-01-01T00:00:00') {
      return null;
    }
    let match =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:Z)?$/.exec(
        value
      );
    if (!match) {
      return value;
    }

    value = value.toString().replace("T", " ").replace("Z", "")

    return new Date(value);
  },

  isEmpty: function (value: any): boolean {
    if (typeof value === 'undefined') return true;``

    if (value === null) return true;

    if (value === '') return true;

    return false;
  },

  isNull: function (value: any): boolean {
    if (typeof value === 'undefined') return true;

    if (value === null) return true;

    return false;
  },

  isUndefined: function (value: any): boolean {
    if (typeof value === 'undefined') {
      return true;
    }

    return false;
  },

  isEmptyArray: function (array: any): boolean {
    if (array instanceof Array) {
      if (array.length === 0) {
        return true;
      }
      return false;
    } else {
      return true;
    }
  },

  isEmptyDict(dict: any): boolean {
    if (dict instanceof Object) {
      let result = false;
      if (Object.keys(dict).length === 0) {
        result = true;
      }
      return result;
    }
    return false;
  },

  isArray: function (array: any): boolean {
    return array && array instanceof Array;
  },

  isNumber(arg: any): arg is number {
    return typeof arg === 'number';
  },

  isDate: function (value: any) {
    return Object.prototype.toString.call(value) === '[object Date]';
  },

  get_round(num: any, point: any) {
    if (Util.isEmpty(num) || Util.isEmpty(point)) {
      return num;
    }
    if (typeof num === 'string') {
      num = num.replace(/,/g, '');
    }
    const value = parseFloat(num);
    let tmp = 1;
    for (let i = 0; i < point; i++) {
      tmp = tmp * 10;
    }
    return Math.round(value * tmp) / tmp;
  },

  encode: function (obj: any): any {
    return JSON.stringify(obj);
  },

  decode: function (json: string | any): any {
    try {
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  },

  copy: function (data: any): any {
    var str = Util.encode(data),
      model = Util.decode(str);
    return model;
  },

  /**
   * パスを連結する。
   */
  joinpath: function (
    param1: string,
    param2: string,
    separator: string = '/'
  ): string {
    let result: string;

    if (param1.endsWith(separator)) {
      param1 = param1.substr(0, param1.length - 1);
    }
    if (param2.startsWith(separator)) {
      param2 = param2.substr(1);
    }

    const param1s = param1.split(separator);
    const param2s = param2.split(separator);

    result = param1s.join(separator) + separator + param2s.join(separator);

    return result;
  },

  device: (function () {
    var nav = navigator.userAgent;

    if (
      (nav.indexOf('iPhone') > 0 && nav.indexOf('iPad') == -1) ||
      nav.indexOf('ipad') > 0 ||
      nav.indexOf('Android') > 0
    ) {
      return 'smart';
    }
    return 'pc';
  })(),

  clone: function (obj: any) {
    const json = Util.encode(obj);
    return Util.decode(json);
  },

  deepClone: function (obj: any) {

    return _.clone(obj)
  },

  append: function (object: any, config: any, defaults = null) {
    if (defaults) {
      Util.append(object, defaults);
    }
    const skipArray = [
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'valueOf',
      'toLocaleString',
      'toString',
      'constructor',
    ];

    if (object && config && typeof config === 'object') {
      var i, j, k;

      for (i in config) {
        object[i] = config[i];
      }

      if (skipArray) {
        for (j = skipArray.length; j--;) {
          k = skipArray[j];
          if (config.hasOwnProperty(k)) {
            object[k] = config[k];
          }
        }
      }
    }

    return object;
  },

  appendIf: function (args: any, config: any) {
    var property;
    const object = Util.clone(args);
    if (object) {
      for (property in config) {
        if (object[property] === undefined) {
          object[property] = config[property];
        }
      }
    }

    return object;
  },

  appendIfUndefined: function (args: any, config: any) {
    var property;
    if (Util.isEmpty(args))
      return {}

    for (property in config) {
      if (Util.isUndefined(args[property])) {
        args[property] = config[property];
      }
    }
    return args
  },

  toEmptyString(value: string | null) {
    if (Util.isEmpty(value)) {
      return '';
    } else {
      return value;
    }
  },

  booleanToNumber(value: any) {
    if (typeof value === 'undefined') return 0;

    if (value === null) return 0;

    if (value === '') return 0;

    if (typeof value === 'boolean') {
      if (value) {
        return 1;
      } else {
        return 0;
      }
    }

    return value;
  },


  convertBase64ToBlobData(base64Data: string, contentType: string = 'image/png', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays);
    return blob;
  },
  base64ToUrl(base64: string, contentType: string): string {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    return URL.createObjectURL(blob);
  },
  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    return blob;
  },
};

