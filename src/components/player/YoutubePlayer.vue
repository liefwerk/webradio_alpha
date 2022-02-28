<template>
    <div>
        <Playlists :idList="idList" @send-playlist="handleClick" />
        <div class="video-container">
            <div id="layer"></div>
            <youtube :player-vars="playerVars" ref="youtube" @playing="playing"></youtube>
            <PlaylistName :name="currentName" />
        </div>
            <!-- <div class="debug">
            <span>duration: {{ this.duration }}</span>
            <span>currentTime: {{ this.currentTime }}</span>
            <span>ratio: {{ this.ratio }}</span>
            <span>selectedTimeToJumpTo: {{ this.selectedTimeToJumpTo }}</span>
            </div> -->
        <div id="controls">
            <div
                id="time-control"
                :class="timeHovered ? 'enlarged' : ''"
                @mouseenter="timeHovered = true"
                @mousemove="timeToJumpTo"
                @click="handleTimeJump"
                @mouseleave="timeHovered = false">
                <span id="time-cursor"></span>
            </div>
            <button id="btns-toggle">
                <arrow-left-icon v-if="showed" size="1.4x" class="custom-class" @click="handleOverlay"></arrow-left-icon>
                <arrow-right-icon v-else size="1.4x" class="custom-class" @click="handleOverlay"></arrow-right-icon>
            </button>
            <button id="prev-btn" @click="prevVideo"><skip-back-icon size="1x" class="custom-class"></skip-back-icon></button>
            <button
                v-if="isPlaying"
                id="pause-btn"
                :class="isPlaying === true ? 'active' : ''"
                @click="pauseVideo">
                <pause-icon size="1.5x" class="custom-class"></pause-icon>
            </button>
            <button v-else id="play-btn" @click="playVideo"><play-icon size="1.5x" class="custom-class"></play-icon></button>
            <button id="next-btn" @click="nextVideo"><skip-forward-icon size="1.2x" class="custom-class"></skip-forward-icon></button>
            <button
                id="next-btn"
                :class="isShuffled === true ? 'active' : ''"
                @click="shuffleVideo">
                <shuffle-icon size="1.2x" class="custom-class"></shuffle-icon>
            </button>
        </div>
        <div v-if="currentTitle" id="meta-footer">
            <TrackTitle class="marquee" :title="currentTitle" :url="currentUrl" />
        </div>
    </div>
</template>

<script>
import Playlists from '@/components/playlists/Playlists.vue'
import PlaylistName from '@/components/playlists/PlaylistName.vue'
import TrackTitle from '@/components/playlists/TrackTitle.vue'
import { createClient } from '@supabase/supabase-js'
import { PlayIcon, SkipForwardIcon, SkipBackIcon, PauseIcon, ArrowRightIcon, ArrowLeftIcon, ShuffleIcon } from 'vue-feather-icons'

import { getIdFromUrl } from 'vue-youtube'
var getYoutubeTitle = require('get-youtube-title')

export default {
    name: 'YoutubePlayer',
    components: {
        Playlists,
        PlaylistName,
        TrackTitle,
        PlayIcon,
        SkipForwardIcon,
        SkipBackIcon,
        PauseIcon,
        ArrowRightIcon,
        ArrowLeftIcon,
        ShuffleIcon
    },
    data () {
        return {
            idList: [],
            currentId: null,
            currentName: null,
            currentUrl: null,
            currentTitle: null,
            duration: null,
            ratio: null,
            selectedTimeToJumpTo: null,
            timeCursorWidth: null,
            currentTime: null,
            isPlaying: false,
            isShuffled: false,
            showed: true,
            timeHovered: false,
            playerVars: {
                controls: 0,
                listType: 'playlist',
                list: this.currentId,
                modestbranding: 1,
                rel: 0,
                showinfo: 0
            }
        }
    },
    methods: {
        async handleClick (playlist) {
            this.isPlaying = true
            this.currentId = playlist.id
            this.playerVars.list = playlist.id
            this.currentName = playlist.name
            await this.player.loadPlaylist({
                controls: 0,
                listType: 'playlist',
                list: this.currentId,
                modestbranding: 1,
                rel: 0,
                showinfo: 0
            })
        },
        async playVideo () {
            await this.player.playVideo()
        },
        pauseVideo () {
            this.isPlaying = false
            this.player.pauseVideo()
            document.title = '⏸ Alfonz - Paused'
        },
        prevVideo () {
            // this.isPlaying = !this.isPlaying
            this.player.previousVideo()
        },
        nextVideo () {
            // this.isPlaying = !this.isPlaying
            this.player.nextVideo()
        },
        handleTimeJump () {
            // this.isPlaying = !this.isPlaying
            this.player.seekTo(this.selectedTimeToJumpTo, true)
        },
        shuffleVideo () {
            this.isShuffled = !this.isShuffled
            this.player.setShuffle(this.isShuffled)
        },
        playing () {
            this.isPlaying = true
            this.player.getVideoUrl()
                .then((res) => {
                    this.currentUrl = res
                    const youtubeId = getIdFromUrl(this.currentUrl)
                    getYoutubeTitle(youtubeId, (err, title) => {
                        if (err) { console.log(err) } else {
                            this.currentTitle = title
                            document.title = `🎺 Alfonz - ${this.currentTitle}`
                        }
                    })
                })
        },
        handleOverlay () {
            document.getElementById('btns-parent').classList.toggle('show-me')
            this.showed = !this.showed
        },
        async handleFetching () {
            try {
                const supabaseUrl = this.$store.state.supabaseUrl
                const supabaseKey = this.$store.state.supabaseKey
                const supabase = createClient(supabaseUrl, supabaseKey)
                const { data: Playlists, error } = await supabase
                    .from('Playlists')
                    .select('*')
                if (error) console.log(error)
                else {
                    this.idList = await Playlists
                    this.currentId = this.idList[0].playlist_id
                }
            } catch (err) {
                console.log(err)
            }
        },
        handleTimebar () {
            const cursor = document.querySelector('#time-cursor')
            clearInterval()
            this.interval = setInterval(() => {
                this.player.getDuration().then((res) => {
                    this.duration = res
                    this.player.getCurrentTime().then((res) => {
                        this.currentTime = res
                        cursor.style.width = ((this.currentTime / this.duration) * 100) + '%'
                        this.timeCursorWidth = cursor.style.width
                    })
                })
            }, 500)
        },
        timeToJumpTo (e) {
            const timebarWidth = window.innerWidth
            const xPosition = e.clientX
            this.ratio = (xPosition / timebarWidth)

            this.selectedTimeToJumpTo = this.duration * this.ratio
        }
    },
    computed: {
        player () {
            return this.$refs.youtube.player
        }
    },
    async created () {
        this.handleFetching()
    },
    async mounted () {
        this.handleTimebar()
    }
}
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=VT323&display=swap');

    .marquee {
        margin: 0 auto;
        white-space: nowrap;
        overflow: hidden;
    }

    .marquee .title {
        display: inline-block;
        padding-left: 100%;
        animation: marquee 5s linear infinite;
        width: 150vw;
    }

    /* Make it move */
    @keyframes marquee {
        0%   { transform: translate(0, 0); }
        100% { transform: translate(-100%, 0); }
    }

    .hidden {
        overflow: hidden;
    }

    /* Responsive Iframe */

    .video-container {
        position: absolute;
        height: 0;
        padding-bottom: 15rem;
        width: 20rem;
        margin: 0 auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: visible;
    }

    .video-container iframe {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

    /* The mask */

    #layer {
        width: 100.01%;
        height: 100.01%;
        position: absolute;
        z-index: 9;
        top: 0;
        background: rgba(55, 58, 81, 0.22);
    }

    #btns-parent {
        display: flex;
        flex-flow: column nowrap;
        position: absolute;
        left: -100%;
        bottom: 3.5rem;
        height: 72vh;
        width: 75%;
        z-index: 199;
        margin: 1em;
        transition: all .5s ease-in-out;
        overflow-y: auto;
        background: #212121;
        padding-bottom: .5em;
    }

    #btns-parent.show-me {
        left: 0;
    }

    #btns-toggle {
        position: absolute;
        left: 0;
        color: var(--white);
        cursor: pointer;
        font-size: 1rem;
        margin: .5rem;
        padding: 0 .9rem;
    }

    #meta-footer {
        padding: 0;
        margin: .5em 1rem;
        position: absolute;
        bottom: 3.5rem;
        right: 0;
    }

    /* Controls */

    #time-control {
        display: block;
        position: absolute;
        width: 100%;
        height: .25rem;
        background: #212121;
        top: -.4rem;
        cursor: pointer;
        &.enlarged {
            height: .75rem;
            top: -.9rem;
        }
        #time-cursor {
            height: 100%;
            display: block;
            width: 0;
            background: var(--white);
        }
    }

    #controls {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        padding: .25rem 0;
        z-index: 300;
        background: var(--primary);
        text-align: center;
        flex-flow: row wrap;
        justify-content: flex-end;

        .active {
            color: var(--secondary);
        }
    }

    #btns-parent button {
        background: transparent;
        font-family: 'VT323', monospace;
        font-size: 1.3rem;
        font-weight: normal;
        border: none;
        margin: .5rem;
        padding: 0 .5rem;
        color: var(--white);
        cursor: pointer;
        text-align: left;
        display: block;
    }

    #controls button {
        background: transparent;
        font-family: 'Major Mono Display', monospace;
        min-height: unset;
        font-size: 1.1rem;
        margin: .3rem 1rem;
        padding: 0 .25rem;
        color: var(--white);
        cursor: pointer;
        height: auto;
        min-width: unset;
        border: none;
        display: inline-block,
    }

    #controls button.playing {
        color: #ffb300;
    }

    .playlist-name {
        position: absolute;
        bottom: -1.5rem;
        right: 0;
    }

    @media all and (min-width: 647px){
        .video-container {
        padding-bottom: 20rem;
        width: 30rem;
        }

        /* The mask */

        #video-mask {
        top: -4.8rem;
        right: 3.5rem;
        }

        #btns-parent {
        width: 20rem;
        }
    }

    @media all and (min-width: 985px){
        .video-container {
        padding-bottom: 30rem;
        width: 40rem;
        }

        /* The mask */

        #video-mask {
        top: -6.9rem;
        right: 3.9rem;
        }

        #btns-parent {
        width: 20rem;
        height: 78vh;
        }
    }

</style>
