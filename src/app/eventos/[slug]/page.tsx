import EventDetailComponent from '@/blog/event-detail';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  return <EventDetailComponent slug={slug} />;
}
