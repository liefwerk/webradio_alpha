import requests

BASE = "http://127.0.0.1:5000/"

response = requests.put(BASE + 'video/2', { 'views': 301, "likes": 100000000 })
print(response.json())