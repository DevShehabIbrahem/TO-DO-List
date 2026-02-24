'use client';

import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { useState } from 'react';

export default function EmotionCache({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const c = createCache({ key: 'mui', prepend: true });
    c.compat = true;
    return c;
  });

  useServerInsertedHTML(() => {
    const inserted = cache.inserted as Record<string, string> | undefined;
    const entries = inserted ? Object.entries(inserted) : [];
    if (entries.length === 0) return null;
    const names = entries.map(([name]) => name).join(' ');
    const styles = entries.map(([, style]) => style).join('\n');
    return (
      <style
        data-emotion={`${cache.key} ${names}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
