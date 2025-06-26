import { useState, useEffect } from 'react';

import {
  Box,
  Card,
  Grid,
  Alert,
  Button,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

const numberToSinoKorean = (num: number): string => {
  if (num === 0) return '영';
  const digits = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const units = ['', '십', '백', '천'];
  const bigUnits = ['', '만', '억'];

  let result = '';
  let bigUnitIndex = 0;

  while (num > 0) {
    const chunk = num % 10000;
    if (chunk > 0) {
      let chunkStr = '';
      const chunkStrArr = String(chunk).padStart(4, '0').split('').map(Number);
      chunkStrArr.forEach((digit, i) => {
        if (digit !== 0) {
          chunkStr += (digit === 1 && i !== 3 ? '' : digits[digit]) + units[3 - i];
        }
      });
      result = chunkStr + bigUnits[bigUnitIndex] + result;
    }
    num = Math.floor(num / 10000);
    bigUnitIndex++;
  }

  return result;
};

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateOptions = (correct: number, min: number, max: number) => {
  const options = new Set([correct]);
  while (options.size < 4) {
    const rand = getRandomInt(min, max);
    if (rand !== correct) options.add(rand);
  }
  return Array.from(options).sort(() => 0.5 - Math.random());
};

export function NumberDetailView() {
  const limits = [0, 10, 100, 1000, 10000, 100000, 1000000];

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [question, setQuestion] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const generateQuestion = () => {
    if (minValue === maxValue) {
      setQuestion(null);
      setOptions([]);
      setError('⚠️ Bắt đầu và kết thúc không được trùng nhau.');
      return;
    }

    const correct = getRandomInt(minValue, maxValue);
    const opts = generateOptions(correct, minValue, maxValue);
    setQuestion(correct);
    setOptions(opts);
    setFeedback('');
    setError('');
  };

  useEffect(() => {
    generateQuestion();
  }, [minValue, maxValue]);

  const handleAnswer = (selected: number) => {
    if (selected === question) {
      setFeedback('✅ Chính xác!');
    } else {
      setFeedback(`❌ Sai. Đúng là: ${numberToSinoKorean(question!)}`);
    }
  };

  return (
    <DashboardContent>
      <Card sx={{ p: 3, mb: 5 }}>



      <Box display="flex" gap={2} mb={3}>
        <FormControl>
          <InputLabel>Giới hạn từ</InputLabel>
          <Select
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            label="Giới hạn từ"
            sx={{ minWidth: 100 }}
          >
            {limits.map((val) => (
              <MenuItem key={val} value={val}>
                {val.toLocaleString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Đến</InputLabel>
          <Select
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            label="Đến"
            sx={{ minWidth: 100 }}
          >
            {limits.map((val) =>
              val !== minValue ? (
                <MenuItem key={val} value={val}>
                  {val.toLocaleString()}
                </MenuItem>
              ) : null
            )}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Hãy chọn cách đọc Hán Hàn cho số: <strong>{question ?? '---'}</strong>
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid size={{  xs: 12, sm: 6,  md: 6,  }} container spacing={2}>
        {options.map((num) => (
          <Button
            key={num}
            variant="outlined"
            onClick={() => handleAnswer(num)}
            sx={{ minWidth: 100, fontSize: '1.2rem' }}
          >
            {numberToSinoKorean(num)}
          </Button>
        ))}
      </Grid>

      <Button variant="contained" sx={{ mt: 3 }} onClick={() => generateQuestion()}>
          Câu tiếp theo
      </Button>

      <Typography mt={3} fontSize="1.1rem">
        {feedback}
      </Typography>
      </Card>
    </DashboardContent>
  );
}
