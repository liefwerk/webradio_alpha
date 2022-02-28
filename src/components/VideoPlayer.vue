<template>
    <div class="video-container">
        <div id="layer"></div>
        <youtube :player-vars="playerVars" ref="youtube" @playing="playing"></youtube>
    </div>
</template>

<script>
export default {
    name: 'Video Player',
    props: {
        playerVars: Object,
        playing: Function
    },
    computed: {
        player () {
            return this.$refs.youtube.player
        }
    }
}
</script>
