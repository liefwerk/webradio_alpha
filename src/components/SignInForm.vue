<template>
  <div class="sign-in-page main-form">
    <form class="form" v-on:submit.prevent="">
      <fieldset class="email">
        <legend>Email</legend>
        <input type="email" v-model="email">
      </fieldset>
      <fieldset class="password">
        <legend>Password</legend>
        <input type="password" v-model="password">
      </fieldset>
      <button class="button" @click="signIn">Connect</button>
    </form>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'
export default {
  name: 'SignInForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: async function () {
      try {
        const supabaseUrl = 'https://epqrpjmozlcsvbgkxjkp.supabase.co'
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTE0ODMyNCwiZXhwIjoxOTMwNzI0MzI0fQ.GxLEzrl9Faolqb12sImfJ2OGGIGsYU72FYPJcrA0cO4'
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { user, error } = await supabase.auth.signIn({
          email: this.email,
          password: this.password
        })

        if (error) console.log(error)
        else {
          console.log(user)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
