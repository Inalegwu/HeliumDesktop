import { AsyncLocalStorage } from "async_hooks";
import { atomWithStorage } from "jotai/utils";

const loggedInAtom = atomWithStorage<boolean>("loggedIn", true);

export default loggedInAtom;
