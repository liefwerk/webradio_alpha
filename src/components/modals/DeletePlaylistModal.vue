<template>
    <div class="add-playlist">
        <div class="delete-modal">
            <p>Êtes-vous sûr de vouloir supprimer cette playlist ?</p>
            <div class="buttons">
                <button class="button" @click="deletePlaylist">Delete the playlist</button>
                <a class="close-modal" @click="$emit('closeModal')">Cancel</a>
            </div>
        </div>
        <div class="opacity-layout"></div>
    </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
    name: 'AddPlaylist',
    props: {
        playlistId: null
    },
    methods: {
        async deletePlaylist () {
            const supabaseUrl = this.$store.state.supabaseUrl
            const supabaseKey = this.$store.state.supabaseKey
            const supabase = createClient(supabaseUrl, supabaseKey)

            const { data, error } = await supabase
                .from('Playlists')
                .delete()
                .eq('id', this.playlistId)

            if (error) console.log(error)
            else {
                console.log(data)
                this.$emit('closeModal')
                this.$emit('refreshItems')
                this.$toast.success('Playlist has been successfully deleted.')
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

        .delete-modal {
            z-index: 499;
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);

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
