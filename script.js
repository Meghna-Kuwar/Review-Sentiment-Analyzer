<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sentiment Analysis</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Sentiment Analysis</h1>
            <p>Analyze the sentiment of your text and get instant feedback.</p>
        </header>
        <main>
            <textarea id="reviewText" placeholder="Enter your review here..."></textarea>
            <button onclick="submitReview()">Analyze Sentiment</button>
            <div class="result" id="result"></div>
        </main>
        <footer>
            <p>&copy; 2024 Sentiment Analysis App. All rights reserved.</p>
        </footer>
    </div>
    <script>
        async function submitReview() {
            const reviewText = document.getElementById('reviewText').value;
            const response = await fetch('http://127.0.0.1:5000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ review: reviewText })
            });
            const result = await response.json();
            document.getElementById('result').innerText = `Sentiment: ${result.sentiment}`;
        }
    </script>
</body>
</html>body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: url('customer.jpg') no-repeat center center fixed;
    background-size: cover;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background-color: #FFDAB9; 
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    width: 350px;
    max-width: 100%;
    text-align: center;
    transform: translateX(-0px); 
}

header {
    margin-bottom: 10px;
}

header h1 {
    font-size: 2em;
    margin: 0;
    color: #333;
}

header p {
    font-size: 1em;
    color: #666;
}

main {
    margin-bottom: 20px;
}

textarea {
    width: 100%;
    height: 150px;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    resize: none;
    font-size: 1em;
}

button {
    width: 100%;
    padding: 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.result {
    font-size: 1.2em;
    margin-top: 10px;
    color: #333;
}

footer {
    font-size: 0.8em;
    color: #888;
}document.addEventListener('DOMContentLoaded', () => {
    const reviewInput = document.getElementById('reviewInput');
    const submitButton = document.getElementById('submitButton');
    const reviewsContainer = document.getElementById('reviews-container');

    submitButton.addEventListener('click', () => {
        const reviewText = reviewInput.value.trim();

        if (reviewText) {
            // Create a new review card
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.textContent = reviewText;

            // Append the new review card to the reviews container
            reviewsContainer.appendChild(reviewCard);

            // Clear the input field
            reviewInput.value = '';
        } else {
            alert('Please enter a review before submitting.');
        }
    });
});from flask import Flask, request, jsonify, send_from_directory
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
import requests
url = 'http://127.0.0.1:5000/analyze'
data = {'review': 'The product was really amazing and exceeded my expectations!'}
response = requests.post(url, json=data)
print(response.json())