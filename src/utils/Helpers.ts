/* eslint-disable no-console */
/* eslint-disable regexp/prefer-character-class */
import { AppConfig } from './AppConfig';

const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME || 'sepah';

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (
    process.env.VERCEL_ENV === 'production'
    && process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === AppConfig.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export const isEmpty = function (string: string | null) {
  if (!string) {
    return true;
  }
  // This doesn't work the same way as the isEmpty function used
  // in the first example, it will return true for strings containing only whitespace
  return (string.length === 0 || !string.trim());
};

export const filterPriceNumber = (priceNumber: number) => {
  return priceNumber.toLocaleString('fa-IR');
};

export const toPersianDigits = (number: string) => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'; // Persian numbers
  return number.replace(/\d/g, d => persianDigits[d]); // Replace each digit
};

export const storeAuthToken = (tokens: { access: { token: string }; refresh: { token: string } }, userDoc: any) => {
  console.log('storeAuthToken', { tokens, userDoc });

  if (typeof window !== 'undefined') {
    localStorage.setItem(`${PROJECT_NAME}-access`, tokens.access.token);
    localStorage.setItem(`${PROJECT_NAME}-refresh`, tokens.refresh.token);
    localStorage.setItem(`${PROJECT_NAME}-lastLogin`, Date.now().toString());
    localStorage.setItem(`${PROJECT_NAME}-isAuthenticated`, 'true');
    localStorage.setItem(`${PROJECT_NAME}-user`, JSON.stringify(userDoc));
  }
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  } else {
    return `${remainingMinutes}m`;
  }
};

export const isValidIranianMobileNumber = (mobile) => {
  // First, remove any non-digit characters
  const cleaned = mobile.replace(/\D/g, '');

  // Iranian mobile number regex pattern
  // eslint-disable-next-line regexp/no-unused-capturing-group, regexp/no-useless-non-capturing-group, regexp/no-empty-alternative
  const pattern = /^(?:(?:|0|\+98|0098|98)(9)(0|1|2|3|9)\d{8})$/;

  return pattern.test(cleaned);
};

// Helper function to truncate long strings
export const truncateDescription = (description: string | any[], maxLength = 800) => {
  if (!description || description.length <= maxLength) {
    return description;
  }
  return `${description.slice(0, maxLength)}...`;
};

// const mobileReg = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig,
// junkReg = /[^\d]/ig,
// persinNum = [/۰/gi,/۱/gi,/۲/gi,/۳/gi,/۴/gi,/۵/gi,/۶/gi,/۷/gi,/۸/gi,/۹/gi],
// num2en = function (str){
//   for(var i=0;i<10;i++){
//     str=str.replace(persinNum[i],i);
//   }
//   return str;
// }

// export const getMobiles = (str) => {
//   var mobiles = num2en(str+'').match(mobileReg) || [];
//   mobiles.forEach(function(value,index,arr){
//     arr[index]=value.replace(junkReg,'');
//     arr[index][0]==='0' || (arr[index]='0'+arr[index]);
//   });
//   return mobiles;
// };
