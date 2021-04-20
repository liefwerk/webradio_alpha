<template>
  <div class="container wrapper">
    <div class="sign-up-page">
      <form class="form" v-on:submit.prevent="signUp">
        <fieldset class="email">
          <legend>Email</legend>
          <input type="email" v-model="email">
        </fieldset>
        <fieldset class="password">
          <legend>Password</legend>
          <input type="password" v-model="password">
        </fieldset>
        <button class="button" @click="signUp">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: async function () {
      try {
        const supabaseUrl = 'https://epqrpjmozlcsvbgkxjkp.supabase.co'
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNTE0ODMyNCwiZXhwIjoxOTMwNzI0MzI0fQ.GxLEzrl9Faolqb12sImfJ2OGGIGsYU72FYPJcrA0cO4'
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { user, error } = await supabase.auth.signUp({
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

<style lang="scss">
.container.wrapper {
  height: 100vh;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
}

.sign-up-page {
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  color: white;
  text-align: center;
  font-family: 'VT323', monospace;
  font-size: 1.25rem;

  form {
    width: 300px;
    margin: 0 auto;

    fieldset {
      border: none;

      input {
        width: 250px;
        height: 2rem;
        padding: 0;
      }

    }

    button {
      width: 250px;
      border: none;
      padding: .25rem 0;
      margin-top: .5rem;
      background-color: #d03636;
      font-family: 'VT323', monospace;
      cursor: pointer;
      font-size: 1.25rem;

      &:hover {
        background: white;
      }
    }
  }
}

</style>
