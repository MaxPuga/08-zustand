'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(draft);
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      {/* TITLE */}
      <div className={css.formGroup}>
        <label>Title</label>
        <input
          className={css.input}
          value={draft.title}
          onChange={e => setDraft({ title: e.target.value })}
          placeholder="Enter title"
        />
      </div>

      {/* CONTENT */}
      <div className={css.formGroup}>
        <label>Content</label>
        <textarea
          className={css.textarea}
          value={draft.content}
          onChange={e => setDraft({ content: e.target.value })}
          placeholder="Enter content"
        />
      </div>

      {/* TAG */}
      <div className={css.formGroup}>
        <label>Tag</label>
        <select
          className={css.select}
          value={draft.tag}
          onChange={e => setDraft({ tag: e.target.value as NoteTag })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      {/* ACTIONS */}
      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create'}
        </button>

        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>

      {/* ERROR */}
      {mutation.isError && <p className={css.error}>Failed to create note</p>}
    </form>
  );
}
