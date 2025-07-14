import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

import { useRouter } from 'src/routes/hooks';

import { getRandomInt, generateOptions, numberToSinoKorean, numberToNativeKorean } from 'src/utils/helpers';

import { DashboardContent } from 'src/layouts/dashboard';

export function NumberDetailView() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [question, setQuestion] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');


  const router = useRouter();
  const { id } = useParams();

  const limits = id === 'native_korean_number' ?  [0, 10, 40] : [0, 10, 100, 1000, 10000, 100000, 100000];

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

  const handleAnswer = (selected: number) => {
    if (selected === question) {
      setFeedback('✅ Chính xác!');
    } else {
      setFeedback(`❌ Sai. Đúng là: ${numberToSinoKorean(question!)}`);
    }
  };

  useEffect(() => {
    generateQuestion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValue, maxValue]);

  return (
    <DashboardContent>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.back()}
        >
          Trở lại
        </Button>
      </Box>
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
      <Grid container spacing={2}>
        {options.map((num) => (
          <Grid size={{  xs: 12, sm: 6,  md: 6,  }} container spacing={2}>
            <Button
              fullWidth
              sx={{ py: 1 }}
              key={num}
              variant="outlined"
              onClick={() => handleAnswer(num)}
            >
              {id === 'native_korean_number' ? numberToNativeKorean(num) : numberToSinoKorean(num)}
            </Button> 
          </Grid>
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
