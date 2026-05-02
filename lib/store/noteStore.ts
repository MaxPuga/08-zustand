import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

interface Draft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteStore {
  draft: Draft;
  setDraft: (data: Partial<Draft>) => void;
  clearDraft: () => void;
}

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: data =>
        set(state => ({
          draft: { ...state.draft, ...data },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);
