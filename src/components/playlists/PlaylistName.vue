<template>
    <div class="playlist-name">
        <h2>in {{this.name}}</h2>
    </div>
</template>

<script>
export default {
    name: 'PlaylistName',
    props: {
        name: String
    }
}
</script>

<style lang="scss">
    .playlist-name {
        h2 {
        text-align: right;
        font-size: 1.2rem;
        font-weight: 500;
        margin-right: .15rem;
        font-family: 'Courier New', monospace;
        margin-bottom: .25rem;
        }
    }
    @media all and (max-width: 985px){
        .playlist-name {
            h2 {
                font-size: 1rem;
            }
        }
    }
</style>
