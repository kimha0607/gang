import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';


// ----------------------------------------------------------------------

export type VocabularyItemProps = {
    id: string;
    kr: string;
    vi: string;
    vocabulary: {
        kr: string;
        vi: string;
    }[];
}

export function VocabularyItem({ vocabulary }: { vocabulary: VocabularyItemProps }) {

  const router = useRouter();

  const handleClick = (id: any) => {
    router.push(`/vocabulary/vocabulary-detail/${id}`);
  };

  return (
    <Card onClick={() => handleClick(vocabulary.id)} sx={{ cursor: 'pointer' }}>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {vocabulary.kr} - {vocabulary.vi}
        </Typography>
      </Stack>
    </Card>
  );
}
