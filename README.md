# :notes: Webradio Alpha

Small web application for storing and playing pre-made youtube playlists. Fully responsive, possibility to create account for adding and keeping your playlists on hand.

## WHat did you learn making this ?

This is my second VueJS project and my first Heroku-hosted project that uses a Firebase-like database. The database is handled through Supabase, a tool similar to Firebase, quite easy to use and very quick to respond.

The most insightful skill I learnt with this project is to be able to go beyond the tools that I am using. To explain it concisely, I am using a youtube-iframe npm package to read the playlists. This is quite powerful as a standalone package, but using it in the context of a VueJS web app and with a databse to store user's playlist it can go quite far. The challenge resides in finding the best way to make all these tools interact together. VueJS is a great framework for quickly organizing the project. I would not have been able this project under such a short notice without it.


---
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
