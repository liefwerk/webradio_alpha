# Welcome to Alfonz

## Development

### Launch the development server

```bash
cd backend
. ./venv/bin/activate
export FLASK_APP=app
export FLASK_ENV=development
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

## Production

### Run the prod server

```bash
source ./venv/bin/activate
waitress-serve --p 8145 --call 'app:create_app' > log.txt 2>&1 &
```

### Kill the prod server

```bash
lsof -i tcp
kill <PID> ## Find the PID related to the background process
```

### Run the prod react front

```bash
## If the server isn't start yet
pm2 serve build/ 3006 --name "alfonz-front" --spa

## If the server is already running
pm2 restart alfonz-front
```