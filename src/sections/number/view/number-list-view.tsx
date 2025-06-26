
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { _number_list } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { NumberItem } from '../number-item';

// ----------------------------------------------------------------------

export function NumberListView() {

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Số đếm
      </Typography>

      <Grid container spacing={3}>
        {_number_list.map((number) => (
          <Grid key={number.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <NumberItem vocabulary={number} />
          </Grid>
        ))}
      </Grid>

      {/* <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} /> */}
    </DashboardContent>
  );
}
