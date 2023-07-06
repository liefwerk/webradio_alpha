import os

from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth

def create_app(test_config=None):


	app = Flask(__name__, instance_relative_config=False)

	app.config.from_mapping(
		# store the database in the instance folder
		DATABASE=os.path.join(app.instance_path, "app.sqlite"),
	)

	# API
	api = Api(app)
	cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, support_credentials=True)

	# Authentication
	auth = HTTPBasicAuth()

	if test_config is None:
		# load the instance config, if it exists, when not testing
		app.config.from_pyfile("config.py", silent=False)
	else:
		# load the test config if passed in
		app.config.update(test_config)

	# ensure the instance folder exists
	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass


	@app.route("/")
	def hello():
		return {"message": "Hello World!"}


	# Initialize the database
	from app import db
	db.init_app(app)

	# Register the blueprints
	from app import auth
	app.register_blueprint(auth.blueprint)
	
	from app import users
	app.register_blueprint(users.blueprint)
	
	from app import playlists
	app.register_blueprint(playlists.blueprint)

	return app
