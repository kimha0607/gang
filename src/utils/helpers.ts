export const numberToSinoKorean = (num: number): string => {
  if (num === 0) return '영';
  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const units = ['', '십', '백', '천'];
  const bigUnits = ['', '만', '억'];

  let result = '', bigUnitIndex = 0;
  while (num > 0) {
    const chunk = num % 10000;
    if (chunk) {
      let chunkStr = '';
      String(chunk).padStart(4, '0').split('').map(Number).forEach((digit, i) => {
        if (digit) chunkStr += (digit === 1 && i !== 3 ? '' : digits[digit]) + units[3 - i];
      });
      result = chunkStr + bigUnits[bigUnitIndex] + result;
    }
    num = Math.floor(num / 10000);
    bigUnitIndex++;
  }
  return result;
};

export const numberToNativeKorean = (num: number): string => {
  if (num === 0) return '영';

  const units = [
    '', '하나', '둘', '셋', '넷', '다섯',
    '여섯', '일곱', '여덟', '아홉', '열',
    '열한', '열두', '열세', '열네', '열다섯',
    '열여섯', '열일곱', '열여덟', '열아홉', '스물',
    '스물한', '스물두', '스물세', '스물네', '스물다섯',
    '서른', '서른한', '서른두', '서른세', '서른네',
    '마흔', '쉰', '예순', '일흔', '여든', '아흔'
  ];

  if (num <= 40) {
    return units[num] ?? '';
  }

  return `(${num})`;
};

export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateOptions = (correct: number, min: number, max: number) => {
  const options = new Set([correct]);
  while (options.size < 4) options.add(getRandomInt(min, max));
  return Array.from(options).sort(() => Math.random() - 0.5);
};
