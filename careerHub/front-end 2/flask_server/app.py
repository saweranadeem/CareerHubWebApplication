from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as ggi
import os

app = Flask(__name__, static_folder='frontend/dev', static_url_path='')

fetched_api_key = "AIzaSyDp17AjWrSCKyr35QYfIt6c2lZVHRJwyvY"
if not fetched_api_key:
    raise ValueError("API Key not found. Please check your .env file.")

# Configure the Gemini Pro API with the fetched API key
ggi.configure(api_key=fetched_api_key)

# Initialize the Gemini Pro generative model
model = ggi.GenerativeModel("gemini-pro")
chat = model.start_chat()

# Initialize chat history
chat_history = []

# Function to send a question to the LLM and receive a response
def LLM_Response(question):
    # Predefine the context for career counseling in Pakistan
    career_counseling_context = "Considering career counseling in Pakistan, "
    # Concatenate the context with the user's question
    full_question = career_counseling_context + question
    try:
        # Send the full question to Gemini Pro and stream the response
        response = chat.send_message(full_question, stream=True)
        # Convert response to a single string for easier handling
        full_response = ''.join([word.text for word in response])
    except Exception as e:
        full_response = "An error occurred: " + str(e)
    return full_response

@app.route('/api/chat', methods=['POST'])
def chat_api():
    global chat_history

    data = request.json
    user_question = data.get('question')
    if user_question:
        # Get the response from Gemini Pro
        answer = LLM_Response(user_question)
        # Append the question and answer to the chat history
        chat_history.append(("You", user_question))
        chat_history.append(("Career Hub", answer))
        return jsonify({"question": user_question, "answer": answer})

    return jsonify({"error": "No question provided"}), 400

@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
