from io import BytesIO

class Synthesizer:
    def __init__(self):
        pass
    
    def syntetize(client, input_text: str) -> BytesIO:
        response = client.audio.speech.create(
            model="tts-1",
            voice="nova",
            input=input_text,
        )
        
        audio_stream = BytesIO()
        audio_stream.write(response.content)
        
        audio_stream.seek(0)
        return audio_stream