import { CONFIG } from 'src/config-global';

import { NumberDetailView } from 'src/sections/number/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Số đếm - ${CONFIG.appName}`}</title>
      <NumberDetailView />
    </>
  );
}
