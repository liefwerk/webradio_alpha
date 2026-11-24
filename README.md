# Welcome to Alfonz

## Development

### Launch the development server

```bash
cd backend
. ./venv/bin/activate
export FLASK_APP=app
export FLASK_DEBUG=True
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

### Run the prod backend

```bash
cd backend
## If the server isn't started yet
pm2 start ./venv/bin/waitress-serve --name "alfonz-back" -- --host=127.0.0.1 --port=8145 --call 'app:create_app'
pm2 save

## If the server is already running
pm2 restart alfonz-back
```

### Check backend logs and kill server
```
pm2 logs alfonz-back
pm2 stop alfonz-back
```

### Run the prod react front

```bash
## If the server isn't start yet
pm2 serve build/ 3006 --name "alfonz-front" --spa

## If the server is already running
pm2 restart alfonz-front
```
