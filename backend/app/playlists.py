from flask import Blueprint, jsonify, request

from .db import get_db

blueprint = Blueprint("playlists", __name__, url_prefix="/playlists")

@blueprint.route("/", methods=["GET"])
def list_playlists():
	db = get_db()

	cursor = db.execute("SELECT * FROM playlist")
	playlists = cursor.fetchall()

	playlist_list = []
	for playlist in playlists:
		playlist_list.append(
			{
				"id": playlist["id"],
				"name": playlist["name"],
				"playlist_id": playlist["playlist_id"],
				"user_id": playlist["user_id"],
				"playlist_type": playlist["playlist_type"]
			}
		)

	return jsonify(playlist_list)


@blueprint.route("/<int:playlist_id>/", methods=["GET"])
def get_playlist(user_id):
    return {"action": f"get playlist {playlist_id}"}


@blueprint.route("/", methods=["POST"])
def create_playlist():
    data = request.json

    name = data.get("name")
    playlist_id = data.get("playlist_id")
    user_id = data.get("user_id")
    playlist_type = data.get("type")

    if not all([name, playlist_id, playlist_type]):
        return {"error": "Required fields are missing"}, 400

    db = get_db()

    try:
        cursor = db.execute(
            "INSERT INTO playlist (name, playlist_id, user_id, playlist_type) VALUES (?, ?, ?, ?)",
            (name, playlist_id, user_id, playlist_type),
        )
        db.commit()
    except db.IntegrityError:
        return {"error": "This name is already registered"}, 400

    return jsonify({"id": cursor.lastrowid}), 201


@blueprint.route("/<int:user_id>/", methods=["PUT"])
def update_user(user_id):
    return {"action": f"update user {user_id}"}


@blueprint.route("/yt/<int:playlist_id>/", methods=["DELETE"])
def delete_playlist(playlist_id):
    
    db = get_db()

    db.execute("DELETE FROM playlist WHERE id=?", (playlist_id,))
    db.commit()

    return {"delete": f"delete playlist {playlist_id}"}