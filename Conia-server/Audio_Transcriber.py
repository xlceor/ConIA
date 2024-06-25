
class Transcriber:
  def __init__(self):
    pass
  def transcribe_audio(client, audio): 
    audio.save("audio.mp3")

    audio_file = open("audio.mp3", 'rb')
    transcribed = client.audio.transcriptions.create(
      model="whisper-1",
      file=audio_file,
      language="es"
    )
    return transcribed.text

