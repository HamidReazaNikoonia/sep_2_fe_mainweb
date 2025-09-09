import React from 'react';
import CoachSpecificContainer from '@/sections/coach/CoachSpecificContainer';

type CoachPageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function CoachPage({ params }: CoachPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-svh bg-slate-100">
      <CoachSpecificContainer coachId={slug} />
    </div>
  );
}
