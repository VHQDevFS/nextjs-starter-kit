/* eslint-disable no-bitwise */

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

/**
 * Replace all non-word characters with an empty string, replace all spaces with an empty string,
 * replace all spaces followed by a character with that character in uppercase, and lowercase the whole
 * thing.
 * @param {string} word - The word to be converted to camel case.
 * @returns the word in lowercase, replacing all the - and _ with spaces, replacing all the non-word
 * characters with nothing, replacing the first letter of each word with an uppercase letter, and then
 * removing all the spaces.
 */
function toCamelCase(word: string) {
  return word
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/ /g, '');
}

/**
 * It takes an object, converts all the keys to camel case, and returns the new object
 * @param origObj - The original object that you want to convert to camel case.
 * @returns A new object with the keys converted to camelCase.
 */
export function objectToCamelCase(origObj: Record<string, unknown>): object {
  return Object.keys(origObj).reduce(function (newObj: Record<string, unknown>, key) {
    const val = origObj[key];
    const newVal =
      typeof val === 'object' ? objectToCamelCase(val as Record<string, unknown>) : val;
    newObj[toCamelCase(key)] = newVal;

    return newObj;
  }, {});
}

/**
 * It takes a string and a number as arguments, and returns a string that is the first argument cut off
 * at the second argument
 * @param {string} text - The text you want to cut.
 * @param {number} length - The length of the text you want to cut.
 * @returns A function that takes two arguments, text and length, and returns a string.
 */
export const cutText = (text: string, length: number) => {
  if (text.split(' ').length > 1) {
    const string = text.substring(0, length);
    const splitText = string.split(' ');
    splitText.pop();

    return `${splitText.join(' ')}...`;
  }

  return text;
};

/**
 * If the string exists, return the first letter capitalized and the rest of the string, otherwise
 * return an empty string.
 * @param {string} string - The string to capitalize.
 * @returns A function that takes a string as an argument and returns a string with the first letter
 * capitalized.
 */
export const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return '';
};

/**
 * It takes a string and returns a new string with all non-numeric characters removed
 * @param {string} string - The string to be formatted.
 * @returns A function that takes a string as an argument and returns a string with all non-numeric
 * characters removed.
 */
export const onlyNumber = (string: string) => {
  if (string) {
    return string.replace(/\D/g, '');
  }

  return '';
};

/**
 * It takes a number and returns a string with the number formatted as currency
 * @param {number} number - The number to be formatted.
 * @returns A function that takes a number as a parameter and returns a formatted number.
 */
export const formatCurrency = (number: number) => {
  if (number) {
    const formattedNumber = number.toString().replace(/\D/g, '');
    const rest = formattedNumber.length % 3;
    let currency = formattedNumber.substr(0, rest);
    const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
    let separator: string;

    if (thousand) {
      separator = rest ? '.' : '';
      currency += separator + thousand.join('.');
    }

    return currency;
  }

  return '';
};

/**
 * If the date is less than a minute ago, return "just now", if it's less than an hour ago, return "X
 * minutes ago", if it's less than a day ago, return "X hours ago", if it's less than a week ago,
 * return "X days ago", if it's less than a month ago, return "X weeks ago", otherwise return the full
 * date
 * @param {string} time - The time string to convert to a time ago string.
 * @returns A string that is the time difference between the current time and the time passed in.
 */
export const timeAgo = (time: string) => {
  const date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' '));
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const dayDiff = Math.floor(diff / 86400);

  if (Number.isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return dayjs(time).format('MMMM DD, YYYY');
  }

  return (
    (dayDiff === 0 &&
      ((diff < 60 && 'just now') ||
        (diff < 120 && '1 minute ago') ||
        (diff < 3600 && `${Math.floor(diff / 60)} minutes ago`) ||
        (diff < 7200 && '1 hour ago') ||
        (diff < 86400 && `${Math.floor(diff / 3600)} hours ago`))) ||
    (dayDiff === 1 && 'Yesterday') ||
    (dayDiff < 7 && `${dayDiff} days ago`) ||
    (dayDiff < 31 && `${Math.ceil(dayDiff / 7)} weeks ago`)
  );
};

/**
 * It takes a time string and returns an object with the days, hours, minutes, and seconds between the
 * time string and now
 * @param {string} time - The time you want to calculate the difference from.
 * @returns An object with the following properties:
 * - days: a string with the number of days, with a leading zero if the number is less than 10
 * - hours: a string with the number of hours, with a leading zero if the number is less than 10
 * - minutes: a string with the number of minutes, with a leading zero if the number is less than 10
 * - seconds:  a string with the number of seconds, with a leading zero if the number is less than 10
 */
export const diffTimeByNow = (time: string | Date) => {
  const startDate = dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss').toString());
  const endDate = dayjs(dayjs(time).format('YYYY-MM-DD HH:mm:ss').toString());

  const duration = dayjs.duration(endDate.diff(startDate));
  const milliseconds = Math.floor(duration.asMilliseconds());

  const days = Math.round(milliseconds / 86400000);
  const hours = Math.round((milliseconds % 86400000) / 3600000);
  let minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000);
  const seconds = Math.round((((milliseconds % 86400000) % 3600000) % 60000) / 1000);

  if (seconds < 30 && seconds >= 0) {
    minutes += 1;
  }

  return {
    days: days.toString().length < 2 ? `0${days}` : days,
    hours: hours.toString().length < 2 ? `0${hours}` : hours,
    minutes: minutes.toString().length < 2 ? `0${minutes}` : minutes,
    seconds: seconds.toString().length < 2 ? `0${seconds}` : seconds,
  };
};

export const isset = (obj: any) => {
  if (obj !== null && obj !== undefined) {
    if (typeof obj === 'object' || Array.isArray(obj)) {
      return Object.keys(obj).length;
    }

    return obj.toString().length;
  }

  return false;
};

export const toRaw = (obj: any) => JSON.parse(JSON.stringify(obj));

/**
 * It returns an array of random numbers between a given range
 * @param {number} from - the minimum number
 * @param {number} to - The minimum number that can be generated.
 * @param {number} length - the length of the array
 * @returns An array of random numbers
 */
export const randomNumbers = (from: number, to: number, length: number) => {
  const numbers = [0];
  for (let i = 1; i < length; i++) {
    numbers.push(Math.ceil(Math.random() * (from - to) + to));
  }

  return numbers;
};

/**
 * It creates a random string of characters that looks like a GUID
 * @returns A function that returns a string.
 */

export function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

export const objToFormData = (obj: Record<string, any>, formData?: FormData, pre = '') => {
  formData = formData || new FormData();

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) {
      const deepPre = pre ? `${pre}[${prop}]` : prop;
      objToFormData(obj[prop], formData, deepPre);
    } else if (typeof obj[prop] === 'object' && Array.isArray(obj[prop])) {
      obj[prop].forEach((item: any, index: any) => {
        formData?.append(`${prop}[${index}]`, item || '');
      });
    } else if (pre) {
      formData.append(`${pre}[${prop}]`, obj[prop] || '');
    } else {
      formData.append(prop, obj[prop] || '');
    }
  }

  return formData;
};

export const getKeyStringFromEnum = <T extends Record<string | number, string | number>>(
  myEnum: T
) =>
  Object.keys(myEnum)
    .map((key) => myEnum[key])
    .filter((value) => typeof value === 'string') as (keyof T)[];

// Turn enum into array
export const enumToArrObjOptions = <T extends Record<string, string | number>>(_enum: T) =>
  Object.keys(_enum)
    .filter((value: string) => Number.isNaN(Number(value)) === false)
    .map((key) => ({
      label: _enum[key],
      value: Number(key),
    }));

export const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
