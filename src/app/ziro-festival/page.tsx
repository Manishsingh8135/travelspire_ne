// app/ziro-festival/page.tsx - Redirect to new optimized URL
import { redirect } from 'next/navigation';

export default function ZiroFestivalRedirect() {
  // Permanent redirect for SEO (301)
  redirect('/ziro-music-festival-2026');
}
