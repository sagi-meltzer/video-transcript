import { ParagraphType } from "../types";

export const buildParagraphsObject = (transcript: any) => {
    const paragraphs: ParagraphType[] = [];
    const paragraphArr = transcript.paragraphs;
    const speakers = transcript.speakers;
    const words = transcript.words;
  
    for (let i = 0; i < paragraphArr.length; i++) {
      const paragraph = paragraphArr[i];
      const speaker = speakers.find((s: { id: string; }) => s.id === paragraph.speaker_id);
      const wordArr = words
        .filter((w: { paragraph_id: string; }) => w.paragraph_id === paragraph.id)
        .map((w: { text: string; time: number; duration: number; }) => ({ text: w.text, time: w.time, duration: w.duration }));
  
      if (speaker) {
        paragraphs.push({
          id: paragraph.id,
          speaker,
          duration: paragraph.duration,
          time: paragraph.time,
          words: wordArr,
        });
      }
    }
  
    return paragraphs;
  };
