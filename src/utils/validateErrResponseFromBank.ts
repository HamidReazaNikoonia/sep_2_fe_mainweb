export function validateErrResponseFromBank(response: any) {
  if (response.code !== 100) {
    return 'خطا در انتقال به بانک هستید';
  }
}
