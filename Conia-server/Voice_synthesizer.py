from typing import IO

from io import BytesIO
from elevenlabs import VoiceSettings
class Synthesizer :
    def __init__(self):
        pass
    
    def synthesize(client, text: str) -> IO[bytes]:
            response = client.text_to_speech.convert(
                voice_id="Xb7hH8MSUJpSbSDYk0k2",
                optimize_streaming_latency="0",
                output_format="mp3_22050_32",
                text=text,
                model_id="eleven_multilingual_v2",
                voice_settings=VoiceSettings(
                    stability=0.5,
                    similarity_boost=0.6,
                    style=0.0,
                    use_speaker_boost=True,
                ),
            )

            audio_stream = BytesIO()

            for chunk in response:
                if chunk:
                    audio_stream.write(chunk)

            audio_stream.seek(0)

            return audio_stream
                
                
                
            

        

