'use client';

import { notFound, useParams } from 'next/navigation';
import TicketDetail from '@/sections/ticket/TicketDetail';

export default function TicketDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    notFound();
  }

  return (
    <div>
      <TicketDetail ticketId={slug} />
    </div>
  );
}