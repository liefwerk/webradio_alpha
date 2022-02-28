<template>
    <div class="sign-in-page main-form">
        <form class="form" v-on:submit.prevent="signIn">
            <fieldset class="email">
                <legend>Email</legend>
                <input type="email" v-model="email">
            </fieldset>
            <fieldset class="password">
                <legend>Password</legend>
                <input type="password" v-model="password">
            </fieldset>
            <button class="button">Connect</button>
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

                if (error) {
                    console.log(error)
                    this.$toast.error(error.message)
                } else {
                    this.$store.commit('setUserId', user.id)
                    localStorage.setItem('userId', user.id)
                    this.$router.push('/')
                    this.$toast.success('You are now connected!')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>
