import { atom } from "jotai";
import { Action } from "../utils/types";

export let actionAtom = atom<Action>(Action.CHANGE_COLOR);
