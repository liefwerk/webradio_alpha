from flask import Blueprint, jsonify, request

from .db import get_db

blueprint = Blueprint("playlists", __name__, url_prefix="/playlists")

@blueprint.route("/", methods=["GET"])
def list_playlists():
	db = get_db()

	cursor = db.execute("SELECT * FROM playlist")
	playlists = cursor.fetchall()

	playlist_list = []
	for playlists in playlists:
		playlist_list.append(
			{
				"id": user["id"],
				"name": user["name"],
				"playlist_id": user["playlist_id"],
				"user_id": user["user_id"],
				"type": user["type"]
			}
		)

	return jsonify(user_list)


@blueprint.route("/<int:user_id>/", methods=["GET"])
def get_user(user_id):
    return {"action": f"get user {user_id}"}


@blueprint.route("/", methods=["POST"])
def create_user():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if not all([username, password]):
        return {"error": "Required fields are missing"}, 400

    db = get_db()

    hashed_password = generate_password_hash(password)

    try:
        cursor = db.execute(
            "INSERT INTO user (username, password) VALUES (?, ?)",
            (username, hashed_password),
        )
        db.commit()
    except db.IntegrityError:
        return {"error": "This username is already registered"}, 400

    return jsonify({"id": cursor.lastrowid}), 201


@blueprint.route("/<int:user_id>/", methods=["PUT"])
def update_user(user_id):
    return {"action": f"update user {user_id}"}


@blueprint.route("/<int:user_id>/", methods=["DELETE"])
def delete_user(user_id):
    return "", 204