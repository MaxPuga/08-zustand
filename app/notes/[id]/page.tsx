import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content.slice(0, 100),
    openGraph: {
      title: note.title,
      description: note.content,
      url: `/notes/${params.id}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
