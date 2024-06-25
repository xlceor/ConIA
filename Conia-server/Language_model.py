class LLM:
    def __init__(self):
        pass
    
    @staticmethod
    def asistant(client, history, text, user_data, proyect_data):
        username = str(user_data)
        proyect = str(proyect_data)
        
        content = "Eres un asistente util. Tu proposito es ayudar al usuario con la gestion de proyectos escolares. El nombre del usuario es" + username + " y el proyecto es" + proyect
        messages = [
            {"role": "system", "content": content},
        ]

        if history is not None:
            for msg in history:
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })

        messages.append({"role": "user", "content": text})
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo-0613",
            messages=messages
        )
        
        result = ''
        for choice in completion.choices:
            result += choice.message.content

        return result
    
    @staticmethod
    def completion(client, history, text, user_data,):
        username = str(user_data)
        
        content = "Eres un asistente util. El nombre del usuario es" + username
        messages = [
            {"role": "system", "content": content},
        ]

        if history is not None:
            for msg in history:
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })

        messages.append({"role": "user", "content": text})
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo-0613",
            messages=messages
        )
        
        result = ''
        for choice in completion.choices:
            result += choice.message.content

        return result
