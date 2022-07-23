from email import message
from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import uuid

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, support_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class PlaylistModel(db.Model):
	__abstract__ = True

	name = db.Column(db.String(100), nullable=False)

	def __repr__(self):
		return f"Playlist(name = {self.name})"

class YoutubePlaylistModel(PlaylistModel):
	__tablename__ = "youtube_playlists"

	id = db.Column(db.String(100), primary_key=True)
	playlist_id = db.Column(db.String(100), nullable=False)

	def __repr__(self):
		return f"YoutubePlaylist(playlist_id = {self.playlist_id}, name = {self.name})"

# db.create_all()

playlist_post_args = reqparse.RequestParser()
playlist_post_args.add_argument("name", type=str, help="Name of the playlist is required", required=True)
playlist_post_args.add_argument("playlist_id", type=str, help="ID of the playlist is required", required=True)

playlist_put_args = reqparse.RequestParser()
playlist_put_args.add_argument("name", type=str, help="Name of the playlist is not required", required=False)
playlist_put_args.add_argument("playlist_id", type=str, help="ID of the playlist is required", required=True)

resource_fields = {
	'id': fields.String,
	'name': fields.String,
	'playlist_id': fields.String
}

class YoutubePlaylist(Resource):
	@marshal_with(resource_fields)
	def get(self, uuid):
		result = YoutubePlaylistModel.query.filter_by(id=uuid).first()
		if not result:
			abort(404, message="Could not find a playlist with this ID.")
		return result

	@marshal_with(resource_fields)
	def post(self):
		args = playlist_post_args.parse_args()
		
		id = str(uuid.uuid4())
		playlist = YoutubePlaylistModel(id=id, name=args['name'], playlist_id=args['playlist_id'])
		db.session.add(playlist)
		db.session.commit()
		return playlist, 201

	@marshal_with(resource_fields)
	def put(self, uuid):
		args = playlist_put_args.parse_args()
		result = YoutubePlaylistModel.query.filter_by(id=uuid).first()

		if not result:
			abort(404, message="Video doesn't exist.")

		if args['name']:
			result.name = args["name"]
		if args['playlist_id']:
			result.playlist_id = args["playlist_id"]

		db.session.commit()

		return result

	def delete(self, uuid):
		playlist = YoutubePlaylistModel.query.get(uuid)
		db.session.delete(playlist)
		db.session.commit()
		
		return '', 204

class YoutubePlaylists(Resource):
	@marshal_with(resource_fields)
	def get(self):
		result = YoutubePlaylistModel.query.all()
	
		return result, 200

@app.before_request
def check_flight():
	if request.method.lower() == 'options':
		return 'ok', 200

api.add_resource(YoutubePlaylist, '/playlists/single/yt',  '/playlists/single/yt/<string:uuid>')
api.add_resource(YoutubePlaylists, '/playlists/yt')

if __name__ == "__main__":
	app.run(debug=True)