# Video Transcript Project

This project allows users to view and navigate through a video transcript. It fetches transcript data from an API and displays the transcript along with the corresponding video.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
git clone https://github.com/your-username/video-transcript-project.git


2. Install the dependencies: 
cd video-transcript-project npm install


3. Start the development server:
npm start


## Usage

1. Open your web browser and navigate to `http://localhost:3000`.

2. Select the video in the select field .

3. The video and transcript will be displayed. You can use the video controls to navigate through the transcript (including playback speed).

## Technologies Used

- React
- TypeScript
- HTML
- CSS

## App.tsx 
has a select input to for the user to choose a transcript,
an "Im feeling lucky" button that chooses a random video transcript,
and a child VideoTranscript component that receives the transcriptId as property

## VideoTranscript component 
this is the main component, which display the video and transcript 
the component fetches the relevant transcript object and renders the video player (has user controls to control track speed),
and the transcript box,         
to keep track of time the "onTimeUpdate" is subscribed and keeeps track of the current word and paragraph, 
which have refs taken and changed (for autoscrolling, changing class list of current paragraph and word)

* this is a mobile friendly (responsive) simple design

