# Frontend interview question

## Clone

First, clone the repo: *http://flsdjkhfdskjf.com*

## Run

This is a simple create-react-app application, install and run it.

## New feature

Now, we will implement a subtitles generation feature. As a Guidde user, I would like to have a place in the editor, where I can select a video from my file system, and watch it with generated subtitiles. 

The flow:

1. I chose a video from my file system with the existing file uploader.
2. When I select a video,  I will be asked if I want to generate subtitiles or not.
3. After pressing “Approve”, the video will be prossesed and I will be able to play it with/without subtitiles.

## Pre-made functionality

You can use our extention ability to generate subtitles, by sending him an event with the video source, example:

```tsx
dispatchCustomEvent(GENERATE_SUBTITLES_TASK, {
    detail: {
      videoSrc
    }
});
```

After some unknown time, the extention will send back a message on custom event called “*CAPTIONS_GENERATION_COMPLETED*”. The subtitles will be available in the “*detail.reponse*” of that event message.