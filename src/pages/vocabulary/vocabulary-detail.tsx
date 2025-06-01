import { CONFIG } from 'src/config-global';

import { VocabularyDetailView } from 'src/sections/vocabulary/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Từ vựng - ${CONFIG.appName}`}</title>
      <VocabularyDetailView />
    </>
  );
}
