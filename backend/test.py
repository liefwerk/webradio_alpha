import requests

BASE = "http://127.0.0.1:5000/"

playlists = requests.get(BASE + 'playlists/yt/')
print(playlists.json())

# response = requests.post(BASE + 'playlist/yt/', { 'playlist_id': 'PLGo4WhVb-_D8-SYmLNrH-AytwLK1eD9s6', 'name': 'Laptop Chill' })
# response2 = requests.post(BASE + 'playlist/yt/', { 'playlist_id': 'PL0tg_AcAB4SX8rw8A-VOOZBdGUilhtwJO', 'name': 'Dean Blunt' })
# print(response.json())
# print(response2.json())
#