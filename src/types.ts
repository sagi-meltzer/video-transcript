export type WordType = {
    text: string;
    time: number;
    duration: number;
}

export type ParagraphType = {
    id: string;
    speaker: SpeakerType;
    duration: number;
    time: number;
    words: WordType[];
}

export type SpeakerType = {
    id: string;
    name: string;
}

export type TranscriptType = {
  id: number,
  name: string
}