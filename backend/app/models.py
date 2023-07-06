# from app.extensions import db

# class PlaylistModel(db.Model):
# 	__abstract__ = True

# 	name = db.Column(db.String(100), nullable=False)

# 	def __repr__(self):
# 		return f"Playlist(name = {self.name})"

# class YoutubePlaylistModel(PlaylistModel):
# 	__tablename__ = "youtube_playlists"

# 	id = db.Column(db.String(100), primary_key=True)
# 	playlist_id = db.Column(db.String(100), nullable=False)

# 	def __repr__(self):
# 		return f"YoutubePlaylist(playlist_id = {self.playlist_id}, name = {self.name})"
