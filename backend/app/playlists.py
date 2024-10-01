from flask import Blueprint, jsonify, request

from .db import get_db
from .auth import login_required

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
@login_required
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


@blueprint.route("/update/<int:id>/", methods=["PUT"])
@login_required
def update_playlist(id):
    data = request.json

    name = data.get("name")
    playlist_id = data.get("playlist_id")
    
    # fields validation array
    fields = ["name", "playlist_id"]

    db = get_db()

    sql_query = "UPDATE playlist SET name=?, playlist_id=? WHERE id=?"
    sql_values = (name, playlist_id, id)

    try:
        cursor = db.execute(sql_query, sql_values)
        db.commit()
    except db.IntegrityError:
        return {"error": "There has been an error with the values you provided"}, 406

    return jsonify({"update_playlist": "hello world"}), 200


@blueprint.route("/del/<int:playlist_id>/", methods=["DELETE"])
@login_required
def delete_playlist(playlist_id):
    
    db = get_db()

    db.execute("DELETE FROM playlist WHERE id=?", (playlist_id,))
    db.commit()

    return {"delete": f"delete playlist {playlist_id}"}