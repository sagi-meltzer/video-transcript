# Frontend interview question

## Clone

First, clone the repo.

## Run

This is a simple create-react-app application, install and run it.

## New feature

As you can see, the project has pre-implemented code, a button which let you choose a video from your file system. There is also video in the repo named *“Deploy_React_App_in_2_min_for_free.mp4”*  located in *“./src/files”.* 

We will use this video for testing our development.

The mission: 

Implement a subtitles generation feature. The flow will be:

1. A user choose a video from the file system (already implemented).
2. After choosing a video, the video will be prossesed and subtitles will be generated for it.
3. When the subtitiles are ready, the video will be shown, and when we’ll play it, the subtitles will be visible at the right timing like in this example:

![Untitled](Frontend%20interview%20question%20319337414b814efba9770e5cf81dc707/Untitled.png)

## Pre-implemented code

1. You should use our extention ability to generate subtitles, the extention can except event messages with the pre-made function *dispatchCustomEvent* with the event name *GENERATE_SUBTITLES_TASK* and the *videoSrc* in the data.

Example usage:

```tsx
dispatchCustomEvent(GENERATE_SUBTITLES_TASK, {
    detail: {
      videoSrc
    }
});
```

2.After some unknown time, the extention will send back a message on custom event called *CAPTIONS_GENERATION_COMPLETED*. The subtitles will be available in the *detail.reponse* of that event message.