## Launch the backend

### Development launch

```bash
cd backend
. ./venv/bin/activate
FLASK_APP=app
FLASK_ENV=development
```

### Initialize the database and seed it

```bash
flask init-db
flask seed-db
```

### Start the dev server

```bash
flask run
```