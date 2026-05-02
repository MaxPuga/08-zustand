// // import axios from "axios";
// // import type { Note } from "../types/note";

// // // const BASE_URL = "https://notehub-public.goit.study/api";
// // const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// // axios.defaults.baseURL = "https://notehub-public.goit.study/api";
// // axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

// // export interface FetchNotesResponse {
// //   notes: Note[];
// //   totalPages: number;
// // }

// // interface FetchParams {
// //   page: number;
// //   perPage: number;
// //   search?: string;
// // }

// // export const fetchNotes = async (
// //   params: FetchParams,
// // ): Promise<FetchNotesResponse> => {
// //   const { page, perPage, search } = params;

// //   const res = await axios.get<FetchNotesResponse>("/notes", {
// //     params: { page, perPage, search },
// //   });

// //   return res.data;
// // };

// // export const createNote = async (
// //   data: Omit<Note, "id" | "createdAt" | "updatedAt">,
// // ): Promise<Note> => {
// //   const res = await axios.post<Note>("/notes", data, {
// //     headers: {
// //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
// //     },
// //   });
// //   return res.data;
// };
