import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const tag = params.slug?.[0] || 'all';

  return {
    title: `Notes - ${tag}`,
    description: `Viewing notes filtered by ${tag}`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `Viewing notes filtered by ${tag}`,
      url: `/notes/filter/${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
