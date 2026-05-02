'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <button onClick={() => router.back()} className={css.backBtn}>
          ✕
        </button>

        <h2 className={css.header}>{data.title}</h2>
        <p className={css.tag}>{data.tag}</p>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>
          {new Date(data.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Modal>
  );
}
