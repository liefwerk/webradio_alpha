const { Client } = require('pg')

const client = new Client({
  connectionString: process.env.DATABASE_URL
  // ssl: {
  //   rejectUnauthorized: false
  // }
})

client.connect()

const getPlaylistsIds = async (req, res) => {
  try {
    const response = await client.query(
      'SELECT id, playlist_id, playlist_name FROM playlists'
    )
    res.status(200).json(response.rows)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getPlaylistsIds
}
