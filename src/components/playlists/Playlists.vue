<template>
    <div id="btns-parent" class="show-me">
        <div class="filters">
            <p
                v-for="(filter, index) in filters"
                :key="index"
                :class="filter === activeFilter ? 'active-filter' : ''"
                @click="handleFilter(filter)">
                {{filter}}
            </p>
        </div>
        <div v-if="!$store.state.isAuthenticated && activeFilter === 'My Playlists'" class="links">
            <a class="link-connect" href="/connect">Please connect to display your own playlists</a>
        </div>
        <button
            v-for="id in filteredList"
            :key="id.id"
            @click="handlePlaylist(id.playlist_id, id.playlist_name)"
            :class="id.playlist_id === activeItem ? 'active' : ''">
                {{id.playlist_name}}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Playlists',
    data () {
        return {
            playlist: {
                id: '',
                name: ''
            },
            filters: [
                'All',
                'My Playlists'
            ],
            activeItem: null,
            activeFilter: 'All'
        }
    },
    props: {
        idList: Array
    },
    methods: {
        handlePlaylist (id, name) {
            this.playlist.id = id
            this.playlist.name = name
            this.$emit('send-playlist', this.playlist)
            this.activeItem = id
        },
        handleFilter (filter) {
            this.activeFilter = filter
        }
    },
    created () {
        this.$emit('created')
    },
    computed: {
        filteredList: function () {
            if (this.activeFilter === 'My Playlists') {
                return this.idList.filter(id => id.user_id === this.$store.state.userId)
            } else {
                return this.idList
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .filters {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding-bottom: 1rem;
        border-bottom: 1px solid #ffffff24;
        margin: 1rem;
        p {
            margin: 0;
            font-size: 2rem;
            font-family: 'VT323', monospace;
            cursor: pointer;
            &.active-filter {
                color: var(--secondary);
            }
            &:hover {
                color: var(--secondary);
            }
        }
    }
    #btns-parent {
        button {
            text-transform: uppercase;
            &:hover {
                color: var(--secondary);
            }
            &.active{
                color: var(--secondary);
            }
        }
        .links {
            margin: 0 1rem 0 1rem;
            .link-connect {
                color: var(--white);
                text-decoration: none;
                font-family: 'Courrier New', monospace;
                &:hover {
                    color: var(--primary)
                }
            }
        }
    }
</style>
