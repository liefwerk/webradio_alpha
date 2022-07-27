import sqlite3
import click

from flask import current_app
from flask import g
from flask.cli import with_appcontext

from werkzeug.security import generate_password_hash


def get_db():
    """Connect to the application's configured database. The connection
    is unique for each request and will be reused if this is called
    again.
    """
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config["DATABASE"], detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    """If this request connected to the database, close the
    connection.
    """
    db = g.pop("db", None)

    if db is not None:
        db.close()


def init_db():
    """Clear existing data and create new tables."""
    db = get_db()

    with current_app.open_resource("schema.sql") as f:
        db.executescript(f.read().decode("utf8"))


@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")


"""Seeding"""
def add_user():
    """Adding a user"""

    db = get_db()

    hashed_password = generate_password_hash("1234")

    username = "nathanael"
    password = hashed_password

    try:
        cursor = db.execute(
            "INSERT INTO user (username, password) VALUES (?, ?)",
            (username, hashed_password),
        )
        db.commit()
    except db.IntegrityError:
        return {"error": "This username is already registered"}, 400

    return click.echo("User was added to the database")


def add_playlists():
    """Adding playlists"""

    db = get_db()

    playlists_list = [
        {
            "name": "playlist_1",
            "playlist_id": "123456789",
            "user_id": None,
            "playlist_type": "youtube",
        },
        {
            "name": "playlist_2",
            "playlist_id": "987654321",
            "user_id": None,
            "playlist_type": "youtube",
        },
    ]

    for playlist in playlists_list:
        click.echo("Working with {}".format(playlist["name"]))

        name = playlist["name"]
        playlist_id = playlist["playlist_id"]
        user_id = playlist["user_id"]
        playlist_type = playlist["playlist_type"]
        
        try:
            cursor = db.execute(
                "INSERT INTO playlist (name, playlist_id, user_id, playlist_type) VALUES (?, ?, ?, ?)",
                (name, playlist_id, user_id, playlist_type),
            )
            db.commit()
        except db.IntegrityError:
            return {"error": "This name is already registered"}, 400

    return click.echo("Playlists were added to the database")


@click.command("seed-db")
@with_appcontext
def seed_db_command():
    """Seeding the database"""
    add_user()
    add_playlists()

def init_app(app):
    """Register database functions with the Flask app. This is called by
    the application factory.
    """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(seed_db_command)