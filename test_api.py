#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import requests

# URL of your Flask API
url = 'http://127.0.0.1:5000/analyze'

# Example review data to send
data = {'review': 'The product was really amazing and exceeded my expectations!'}

# Sending a POST request
response = requests.post(url, json=data)

# Print the response from the server
print(response.json())

