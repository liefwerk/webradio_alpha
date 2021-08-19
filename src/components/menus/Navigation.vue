<template>
  <span id="nav">
    <div>
      <svg @click="menuOpened = !menuOpened" v-if="menuOpened" xmlns="http://www.w3.org/2000/svg" class="menu-icon active" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4" />
      </svg>
      <svg @click="menuOpened = !menuOpened" v-else xmlns="http://www.w3.org/2000/svg" class="menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </div>
    <div v-if="menuOpened" class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <template v-if="this.$store.state.isAuthenticated">
        <router-link to="/account">My Account</router-link>
        <p class="disconnect-btn" @click="disconnect">Disconnect</p>
      </template>
      <template v-else>
        <router-link to="/connect">Connect</router-link>
      </template>
    </div>
  </span>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'Navigation',
  data () {
    return {
      menuOpened: false
    }
  },
  methods: {
    disconnect: async function () {
      const supabaseUrl = this.$store.state.supabaseUrl
      const supabaseKey = this.$store.state.supabaseKey
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { error } = await supabase.auth.signOut()
      if (error) console.log(error)
      else {
        this.$store.state.isAuthenticated = false
        this.$toast.success("You've been successfully disconnected! See ya!")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  font-family: 'Courier New', monospace;
  margin: 0 1rem;
  display: flex;
  flex-flow: column nowrap;
  text-align: right;
  position: relative;
  .links {
    float: right;
    display: flex;
    flex-flow: column nowrap;
    text-align: right;
    font-size: 1.2rem;
    cursor: pointer;
    position: absolute;
    top: 3rem;
    right: 0;
    transition: all .5s ease-in-out;

    a {
      color: var(--primary);
      text-decoration: none;
      margin-bottom: .5rem;

      &:hover {
        color: var(--white);
      }
    }
    .disconnect-btn {
      color: var(--primary);
      margin: 0;
      &:hover {
        color: var(--white);
      }
    }
  }

  .menu-icon {
    width: 2rem;
    height: 2rem;
    color: var(--primary);
    cursor: pointer;
    &:hover {
      color: var(--secondary);
    }
    &.active {
      transform: translateY(50%);
    }
  }

}
</style>
