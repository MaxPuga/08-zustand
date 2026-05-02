import axios from 'axios';
import type { Note } from '@/types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
  tag?: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
    search,
  };

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const res = await api.get('/notes', { params });

  return res.data;
};

export const createNote = async (
  data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
) => {
  const res = await api.post<Note>('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
