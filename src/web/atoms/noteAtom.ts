import { atom } from "jotai";
import { NoteType } from "../utils/types";

export let noteAtom = atom<NoteType>({});
