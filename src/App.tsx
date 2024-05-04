import './App.css';
import VideoUploader from './components/VideoTranscript';
import { useEffect, useState } from 'react';
import { TranscriptType } from './types';


function App() {
  const [transcripts, setTranscripts] = useState([]);
  const [selectedTranscript, setSelectedTranscript] = useState<number>();

  useEffect(() => {
    fetch(`https://verbit-karaoke-assignment.vercel.app/api/transcripts`).then(response => {
      return response.text();
    })
    .then(transcript => {
      const transcriptObj = JSON.parse(transcript);
      setTranscripts(transcriptObj);
    })
  }, [])

  const handleRandomTranscript = () => {
    fetch(`https://verbit-karaoke-assignment.vercel.app/api/transcripts/random`).then(response => {
      return response.text();
    })
    .then(transcript => {
      const transcriptObj = JSON.parse(transcript);
      setSelectedTranscript(transcriptObj.id);
    })
  }

  return (
    <div className="App">
      <h3>Select a transcript</h3>
      <select onChange={e => setSelectedTranscript(parseInt(e.target.value))} defaultValue={'select'}>
        <option disabled value={'select'} > -- select a transcript -- </option>
        {transcripts.map((transcript: TranscriptType) => <option key={transcript.id} value={transcript.id}>{transcript.name}</option>)}
      </select>
      <button onClick={() => handleRandomTranscript()}>I'm feeling lucky!</button>
      {selectedTranscript && <VideoUploader transcriptId={selectedTranscript}/>}
    </div>
  );
}

export default App;
