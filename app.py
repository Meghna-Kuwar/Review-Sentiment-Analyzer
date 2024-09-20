from flask import Flask, request, jsonify, send_from_directory
import re
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)

def analyze_review_sentiment(review):
    review = re.sub("[^a-zA-Z]", ' ', review).lower()
    score = SentimentIntensityAnalyzer().polarity_scores(review)
    sentiment = "Neutral"
    if score['neg'] > score['pos']:
        sentiment = "Negative"
    elif score['pos'] > score['neg']:
        sentiment = "Positive"
    return {'sentiment': sentiment}

@app.route('/analyze', methods=['POST'])
def analyze():
    review = request.json['review']
    result = analyze_review_sentiment(review)
    return jsonify(result)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/styles.css')
def styles():
    return send_from_directory('.', 'styles.css')

if __name__ == '__main__':
    app.run(debug=False)





