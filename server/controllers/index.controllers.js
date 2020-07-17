const { Pool } = require('pg')

const pool = new Pool()

const getPlaylistsIds = async (req, res) => {
  try {
    const response = await pool.query(
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
