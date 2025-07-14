import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { _topic_vocab_list } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

interface QuestionData {
  question: string;
  answer: string;
  choices: string[];
}

interface VocabList {
  kr: string;
  vi: string;
}

const getRandomQuestion = (list: VocabList[], asked: VocabList[]): QuestionData => {
  const remaining = list.filter(
    (item) => !asked.some((askedItem) => askedItem.kr === item.kr && askedItem.vi === item.vi)
  );

  const source = remaining.length > 0 ? remaining : list;
  const correct = source[Math.floor(Math.random() * source.length)];

  let options = [correct];
  if (list.length < 4) {
    options = [...list];
  } else {
    while (options.length < 4) {
      const rand = list[Math.floor(Math.random() * list.length)];
      if (!options.some((opt) => opt.kr === rand.kr && opt.vi === rand.vi)) {
        options.push(rand);
      }
    }
  }

  return {
    question: correct.kr,
    answer: correct.vi,
    choices: shuffle(options.map((item) => item.vi)),
  };
}

const shuffle = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

export const VocabularyDetailView = () => {
  const [questionData, setQuestionData] = useState<QuestionData | undefined>(undefined);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [questionIndex, setQuestionIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [askedList, setAskedList] = useState<VocabList[]>([]);

  const router = useRouter();

  const { id } = useParams();
  const topic = _topic_vocab_list.find((item) => item.id === id);

  useEffect(() => {
    if (topic) {
      const firstQuestion = getRandomQuestion(topic.vocabulary, []);
      setQuestionData(firstQuestion);
      setQuestionIndex(1);
      setScore(0);
      setFinished(false);
      setAskedList([{ kr: firstQuestion.question, vi: firstQuestion.answer }]);
      setSelected('');
      setFeedback('');
    }
  }, [topic]);

  const handleSelect = (choice: string) => {
    if (!questionData) return;

    setSelected(choice);

    if (choice === questionData.answer) {
      setFeedback('✅ Chính xác!');
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`❌ Sai. Đáp án đúng: ${questionData.answer}`);
    }
  };

  const nextQuestion = () => {
    if (!topic) return;

    if (questionIndex >= 10) {
      setFinished(true);
      setSelected('');
      setFeedback('');
      setQuestionData(undefined);
      return;
    }

    const newQuestion = getRandomQuestion(topic.vocabulary, askedList);
    setQuestionData(newQuestion);
    setAskedList((prev) => [...prev, { kr: newQuestion.question, vi: newQuestion.answer }]);
    setSelected('');
    setFeedback('');
    setQuestionIndex((prev) => prev + 1);
  };

  const resetQuiz = () => {
    if (!topic) return;

    const firstQuestion = getRandomQuestion(topic.vocabulary, []);
    setQuestionData(firstQuestion);
    setAskedList([{ kr: firstQuestion.question, vi: firstQuestion.answer }]);
    setQuestionIndex(1);
    setScore(0);
    setFinished(false);
    setSelected('');
    setFeedback('');
  };

  if (!topic) {
    return (
      <DashboardContent>
        <Typography variant="h6" color="error" sx={{ p: 3 }}>
          Không tìm thấy chủ đề từ vựng.
        </Typography>
      </DashboardContent>
    );
  }

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
        <Typography variant="h4" sx={{ mb: 3 }}>
          Trắc nghiệm từ vựng {topic.vi}
        </Typography>

        {!finished && questionData && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Câu hỏi {questionIndex} / 10
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              &rdquo;{questionData.question}&rdquo; nghĩa là gì?
            </Typography>

            <Grid container spacing={2}>
              {questionData.choices.map((choice) => (
                <Grid size={{  xs: 12, sm: 6,  md: 6,  }} key={choice}>
                  <Button
                    fullWidth
                    sx={{ py: 1 }}
                    variant={selected === choice ? 'contained' : 'outlined'}
                    color={choice === questionData.answer && selected ? 'success' : 'primary'}
                    onClick={() => handleSelect(choice)}
                    disabled={!!selected}
                  >
                    {choice}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {feedback && (
              <Typography sx={{ mt: 3 }} color={feedback.startsWith('✅') ? 'green' : 'red'}>
                {feedback}
              </Typography>
            )}

            {selected && (
              <Button variant="contained" sx={{ mt: 3 }} onClick={nextQuestion}>
                {questionIndex === 10 ? 'Xem kết quả' : 'Câu tiếp theo'}
              </Button>
            )}
          </>
        )}

        {finished && (
          <>
            <Typography variant="h5" sx={{ mt: 3 }}>
              🎉 Bạn đã hoàn thành 10 câu trắc nghiệm.
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Điểm số của bạn: {score} / 10
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} onClick={resetQuiz}>
              Làm lại
            </Button>
          </>
        )}
      </Card>
    </DashboardContent>
  );
}
