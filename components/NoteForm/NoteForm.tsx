'use client';

import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';
// import type { NoteTag } from '../../types/note';
import { useNoteStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import type { NoteTag } from '@/types/note';

export default function NoteForm() {
  const { draft, setDraft, clearDraft } = useNoteStore();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await createNote(draft);

    clearDraft();
    router.push('/notes/filter/all');
  }

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label>Title</label>
        <input
          className={css.input}
          value={draft.title}
          onChange={e => setDraft({ title: e.target.value })}
          placeholder="Title"
        />
      </div>

      <div className={css.formGroup}>
        <label>Content</label>
        <textarea
          className={css.textarea}
          value={draft.content}
          onChange={e => setDraft({ content: e.target.value })}
        />
      </div>

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

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create
        </button>

        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
