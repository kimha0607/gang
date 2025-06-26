import { CONFIG } from 'src/config-global';

import { NumberListView } from 'src/sections/number/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Số đếm - ${CONFIG.appName}`}</title>

      <NumberListView />
    </>
  );
}
