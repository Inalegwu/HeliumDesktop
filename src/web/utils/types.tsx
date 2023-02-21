export enum States {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export interface NoteType {
  id: number;
  title: string;
  content: string;
}
