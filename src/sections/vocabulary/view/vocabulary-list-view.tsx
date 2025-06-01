
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { _topic_vocab_list } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { VocabularyItem } from '../vocabulary-item';

// ----------------------------------------------------------------------

export function VocabularyListView() {

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Từ vựng
      </Typography>

      <Grid container spacing={3}>
        {_topic_vocab_list.map((vocabulary) => (
          <Grid key={vocabulary.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <VocabularyItem vocabulary={vocabulary} />
          </Grid>
        ))}
      </Grid>

      {/* <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} /> */}
    </DashboardContent>
  );
}
