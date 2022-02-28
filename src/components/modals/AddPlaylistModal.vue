<template>
    <div class="add-playlist">
        <form class="form" v-on:submit.prevent="addPlaylist">
            <fieldset class="playlist-name">
                <legend>Name of the playlist</legend>
                <input type="text" v-model="name" required>
            </fieldset>
            <fieldset class="password">
                <legend>ID of the playlist</legend>
                <input type="text" v-model="playlistId" required>
            </fieldset>
            <div class="buttons">
                <button class="button">Add the playlist</button>
                <a class="close-modal" @click="$emit('closeModal')">Cancel</a>
            </div>
        </form>
        <div class="opacity-layout"></div>
    </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
    name: 'AddPlaylistModal',
    data () {
        return {
            name: undefined,
            playlistId: undefined
        }
    },
    methods: {
        async addPlaylist () {
            const supabaseUrl = this.$store.state.supabaseUrl
            const supabaseKey = this.$store.state.supabaseKey
            const supabase = createClient(supabaseUrl, supabaseKey)
            const { data, error } = await supabase
                .from('Playlists')
                .insert([
                    { playlist_id: this.playlistId, playlist_name: this.name, user_id: this.$store.state.userId }
                ])
            if (error) console.log(error)
            else {
                console.log(data)
                this.$toast.success('Playlist has been successfully added to the database.')
                this.$emit('closeModal')
                this.$emit('refreshItems')
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .add-playlist {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--white);
    font-family: 'VT323', monospace;
    font-size: 1.25rem;
    z-index: 499;
    position: fixed;
    width: 100%;
    height: 100%;

    .opacity-layout {
        width: 100%;
        height: 100vh;
        opacity: 0.85;
        background: #000;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 399;
    }

    form {
        z-index: 499;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        fieldset {
            border: none;
            padding: 0;
            margin: .5em 0;

            input {
                width: 300px;
                height: 2rem;
                padding: 0 .5em 0 .5em;
            }
        }
        a {
            &.close-modal {
                cursor: pointer;
                margin-top: 1rem;
                &:hover {
                color: var(--primary);
                }
            }
        }
        .buttons {
            display: flex;
            flex-flow: column nowrap;
            button {
                width: 300px;
            }
        }

    }
    }
</style>
