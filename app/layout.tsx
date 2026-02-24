import type { Metadata } from 'next';
import { Providers } from './providers';
import EmotionCache from './EmotionCache';
import ThemeRegistry from './ThemeRegistry';

export const metadata: Metadata = {
  title: 'Kanban ToDo Dashboard',
  description: 'Kanban-style task board with Next.js, Redux, and React Query',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <EmotionCache>
          <ThemeRegistry>
            <Providers>{children}</Providers>
          </ThemeRegistry>
        </EmotionCache>
      </body>
    </html>
  );
}
