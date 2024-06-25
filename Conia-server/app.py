from Audio_Transcriber import Transcriber
from Voice_synthesizer import Synthesizer
from Language_model import LLM
import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import firebase_admin
from firebase_admin import credentials, db
from elevenlabs.client import ElevenLabs

app = Flask(__name__)
CORS(app)

load_dotenv()
AI_API_KEY = os.getenv('OPENAI_API_KEY')
XI_API_KEY = os.getenv('XI_API_KEY')
clientXI = ElevenLabs(api_key=XI_API_KEY)
clientAI = OpenAI(api_key=AI_API_KEY)




# Ruta al archivo de credenciales de servicio descargado desde Firebase
cred = credentials.Certificate('./coney-asistant-firebase-adminsdk-848td-840f802dab.json')

# Inicializa la app de Firebase
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://coney-asistant-default-rtdb.firebaseio.com'
})

# Función para obtener proyectos de un usuario
def get_project_by_id(user_id, project_id):
    ref = db.reference(f'users/{user_id}/projects/{project_id}')
    snapshot = ref.get()
    if snapshot:
        return snapshot
    else:
        return {}


# Ejemplo de uso

@app.route('/', methods=['POST'])
def asistente():
    prompt = None

    if 'audio' not in request.files and 'text' not in request.form:
        return 'No se recibió ningún archivo', 400

    if 'audio' in request.files:
        inputFile = request.files.get('audio')
        prompt = Transcriber.transcribe_audio(clientAI, inputFile)
    elif 'text' in request.form:
        prompt = request.form.get('text')

    if prompt is None:
        return 'No se pudo procesar la solicitud', 400

    history_json = request.form.get('messages')
    if history_json:
        try:
            history = json.loads(history_json)
            if not isinstance(history, list):
                return 'El historial debe ser una lista', 400
            for msg in history:
                if not isinstance(msg, dict):
                    return 'Cada mensaje en el historial debe ser un diccionario', 400
                if 'role' not in msg or 'content' not in msg:
                    return 'Cada mensaje debe tener las claves "role" y "content"', 400
        except json.JSONDecodeError:
            return 'Error al decodificar el historial de mensajes', 400
    else:
        history = []
    user_name = request.form.get('username')
    project_id = request.form.get('project_id')
    user_id = request.form.get('user_id')
    
    project = get_project_by_id(user_id, project_id)
    
    responseTx = LLM.asistant(clientAI, history, prompt, user_name, project)
    
    audio_stream = Synthesizer.synthesize(clientXI, responseTx)
    audio_data = audio_stream.getvalue()
    responseStr = base64.b64encode(audio_data).decode('utf-8')
    
    responseJson = {
        'result': 'ok',
        'text': responseTx,
        'file': responseStr,
        'prompt': prompt
    }
    

    return jsonify(responseJson)

@app.route('/asistant', methods=['POST'])
def asistant():
    prompt = None

    if 'audio' not in request.files and 'text' not in request.form:
        return 'No se recibió ningún archivo', 400

    if 'audio' in request.files:
        inputFile = request.files.get('audio')
        prompt = Transcriber.transcribe_audio(clientAI, inputFile)
    elif 'text' in request.form:
        prompt = request.form.get('text')

    if prompt is None:
        return 'No se pudo procesar la solicitud', 400

    history_json = request.form.get('messages')
    if history_json:
        try:
            history = json.loads(history_json)
            if not isinstance(history, list):
                return 'El historial debe ser una lista', 400
            for msg in history:
                if not isinstance(msg, dict):
                    return 'Cada mensaje en el historial debe ser un diccionario', 400
                if 'role' not in msg or 'content' not in msg:
                    return 'Cada mensaje debe tener las claves "role" y "content"', 400
        except json.JSONDecodeError:
            return 'Error al decodificar el historial de mensajes', 400
    else:
        history = []
    user_name = request.form.get('username')
    
    responseTx = LLM.completion(clientAI, history, prompt, user_name)
    
    audio_stream = Synthesizer.synthesize(clientXI, responseTx)
    audio_data = audio_stream.getvalue()
    responseStr = base64.b64encode(audio_data).decode('utf-8')
    
    responseJson = {
        'result': 'ok',
        'text': responseTx,
        'file': responseStr,
        'prompt': prompt
    }
    

    return jsonify(responseJson)

if __name__ == '__main__':
    app.run(debug=True)