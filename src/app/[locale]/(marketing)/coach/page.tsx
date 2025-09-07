import type { Metadata } from 'next';
import CoachesContainer from '@/sections/coach/CoachesContainer';

export const metadata: Metadata = {
  title: 'لیست اساتید | آوانو',
  description: 'لیست بهترین اساتید و مربیان آوانو را مشاهده کنید',
};

export default function CoachesPage() {
  return (
    <div className="primary-gradient-bg min-h-screen pt-16">
      <CoachesContainer />
    </div>
  );
}