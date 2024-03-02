let sleepSetTimeout_ctrl: NodeJS.Timeout;

function sleep(ms: number) {
  clearInterval(sleepSetTimeout_ctrl);
  return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

export function dispatchCustomEvent(eventName: string, dynamicPayload: object) {
  var customEvent = new CustomEvent(eventName, { detail: dynamicPayload });
  document.dispatchEvent(customEvent);
}

// Supported events:
export const CAPTIONS_GENERATION_COMPLETED = 'CAPTIONS_GENERATION_COMPLETED';
export const GENERATE_SUBTITLES_TASK = 'GENERATE_SUBTITLES_TASK';


// Mock of the extention behaviour:
document.addEventListener(GENERATE_SUBTITLES_TASK, async function (event: any) {
  await sleep(3000);
  const response = await fetch('/transcript.txt')
    .then(response => {
      return response.text();
    })
    .catch(error => {
      console.error('Error fetching file:', error);
    });

  dispatchCustomEvent(CAPTIONS_GENERATION_COMPLETED, {
    response
  });
});
