from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

from .db import get_db

blueprint = Blueprint("users", __name__, url_prefix="/users")

@blueprint.route("/", methods=["GET"])
def list_users():
	db = get_db()

	cursor = db.execute("SELECT * FROM user")
	users = cursor.fetchall()

	user_list = []
	for user in users:
		user_list.append(
			{
				"id": user["id"],
				"username": user["username"]
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