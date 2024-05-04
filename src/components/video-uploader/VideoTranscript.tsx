import { useEffect, useRef, useState } from "react";
import { ParagraphType } from "../../types";
import { buildParagraphsObject } from "../../utils";

function VideoTranscript({ transcriptId }: { transcriptId: number }) {
  const [videoSrc, setVideoSrc] = useState<string>();
  const [paragraphs, setParagraphs] = useState<ParagraphType[]>();
  const [trascriptTitle, setTrascriptTitle] = useState<string>();

  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordRefs = useRef<{[key: string]: (HTMLSpanElement | null)}>({});

  useEffect(()=> {
    (async (transcriptId) => {
    try {
        setVideoSrc(undefined);
        setParagraphs(undefined);
        const response = await fetch(
          `https://verbit-karaoke-assignment.vercel.app/api/transcripts/${transcriptId}`
        );
        const transcript = await response.json();
  
        setVideoSrc(transcript.audio_url);
        setTrascriptTitle(transcript.name);
        setParagraphs(buildParagraphsObject(transcript));
      } catch (error) {
        console.error(error);
      }
    }
  )(transcriptId)
  }, [transcriptId]);

  const handleTimeUpdate = (event: any) => {
    if (!paragraphs) return;

    const currentParagraphIdx = paragraphs.findIndex(
      (paragraph) =>
        event.target.currentTime >= paragraph.time &&
        event.target.currentTime <= paragraph.time + paragraph.duration
    );

    const currentWordIdx = paragraphs[currentParagraphIdx]?.words?.findIndex(
      (word) =>
        event.target.currentTime >= word.time &&
        event.target.currentTime <= word.time + word.duration
    );

    paragraphRefs.current.forEach((paragraph) =>
      paragraph?.classList.remove("currentParagraph")
    );
    Object.keys(wordRefs.current).forEach((key) => {
      wordRefs.current[key]?.classList.remove("currentWord");
    });

    wordRefs.current[`${currentParagraphIdx}_${currentWordIdx}`]?.scrollIntoView({
        block: "center",
        inline: "nearest",
    });
    
    wordRefs.current[`${currentParagraphIdx}_${currentWordIdx}`]?.classList.add(
      "currentWord"
    );
    paragraphRefs.current[currentParagraphIdx]?.classList.add("currentParagraph");
  };

  let lastSpeakerId: string;

  return paragraphs ? (
    <div className="video" key={transcriptId}>
        <h1>{trascriptTitle}</h1>
      <video key={videoSrc} controls width="100%" onTimeUpdate={handleTimeUpdate}>
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="transcript">
        {paragraphs.map((paragraph, index) => {
            const isSameSpeaker = lastSpeakerId === paragraph.speaker.id;
            lastSpeakerId = paragraph.speaker.id;
          return (
            <div
              className="paragraph"
              key={paragraph.id}
              ref={(ref) => (paragraphRefs.current[index] = ref)}
            >
              {!isSameSpeaker && <span>
                <b className="speaker">{paragraph.speaker.name}:</b> 
              </span>}
              {paragraph.words.map((word, wordIdx) => (
                <span
                  className="word"
                  key={`${index}_${wordIdx}`}
                  ref={(ref) => (wordRefs.current[`${index}_${wordIdx}`] = ref)}
                >
                  {word.text}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  ) : <h1>Loading...</h1>;
}



export default VideoTranscript;