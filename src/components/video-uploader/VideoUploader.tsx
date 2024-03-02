import { ChangeEventHandler, useState } from "react";

/**
 * Events related code:  
 * import { CAPTIONS_GENERATION_COMPLETED, GENERATE_SUBTITLES_TASK, dispatchCustomEvent } from "../../utils/ai-tools";
 */

function VideoUploader() {
    const [videoSrc, setVideoSrc] = useState<string>();

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        
        reader.onload = (e) => {
            if (!e.target) return
            setVideoSrc(e.target.result as string);
        };

        reader.readAsDataURL(file);
    };

    return (
            <div>
                {!videoSrc && <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                />}
            </div>
    );
}

export default VideoUploader;