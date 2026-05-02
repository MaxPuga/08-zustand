import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <NoteDetails id={params.id} />;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const note = await fetchNoteById(params.id);

    return {
      title: note.title,
      description: note.content.slice(0, 100),
      openGraph: {
        title: note.title,
        description: note.content.slice(0, 100),
        url: `/notes/${params.id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Note not found',
      description: 'This note does not exist',
      openGraph: {
        title: 'Note not found',
        description: 'This note does not exist',
        url: `/notes/${params.id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          },
        ],
      },
    };
  }
}
