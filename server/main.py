from flask import Flask, jsonify
from flask_cors import CORS
import random


app = Flask(__name__)
cors = CORS(app, origins='*')
word_list = ["hangman", "python", "flask", "react", "javascript"]
hint_list = ["A word guessing game", "A programming language", "A web framework", "A JavaScript library", "A programming language"]

@app.route("/api/start_game", methods=['GET'])
def start_game():
    index = random.randint(0, len(word_list) - 1)
    word = word_list[index]
    hint = hint_list[index]

    game_state = {
        'word': word,
        'hint': hint,
        'incorrect_guesses_allowed': 6,
        'correct_guesses': [],
        'incorrect_guesses': [],
        'game_over': False
    }
    return jsonify(game_state)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
