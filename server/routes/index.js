const { Router } = require('express')
const router = Router()

const { getPlaylistsIds } = require('../controllers/index.controllers')

router.get('/playlists-ids', getPlaylistsIds)

module.exports = router
