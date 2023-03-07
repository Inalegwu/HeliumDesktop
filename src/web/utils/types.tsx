// types that are necessary to the application

// isOnline or not
export enum States {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export interface NoteType {
  id: number;
  file_content: string;
  file_name: string;
}

// what a page looks like
export interface Page {
  id: number;
  title: string;
  content: string;
  rev: string;
}

// actions in the settings screen
export enum Action {
  CHANGE_COLOR = "CHANGE COLOR",
  SYNC = "SYNC",
}

// settings that are written to disk
// TODO add fontFace,fontSize,screenSize?
export interface Settings {
  blurColor1: string;
  blurColor2: string;
  colorMode?: string;
  fontFace?: string;
  fontSize: number;
}
