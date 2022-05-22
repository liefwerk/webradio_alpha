<template>
    <div>
        <!-- <YoutubePlayer /> -->
        <Maintenance />
    </div>
</template>

<script>
// @ is an alias to /src
// import YoutubePlayer from '../components/player/YoutubePlayer'
import Maintenance from '../components/maintenance/Maintenance'

export default {
    name: 'Home',
    components: {
        // YoutubePlayer,
        Maintenance
    },
    data () {
        return {
            username: '',
            isAuthenticated: false
        }
    },
    methods: {
        checkAuth () {
            this.isAuthenticated = this.$store.state.isAuthenticated
            this.username = this.$store.state.userId
        }
    },
    created () {
        this.checkAuth()
    }
}
</script>
