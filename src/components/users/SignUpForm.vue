<template>
    <div class="sign-up-page main-form">
        <form class="form" v-on:submit.prevent="">
        <fieldset class="email">
            <legend>Email</legend>
            <input type="email" v-model="email">
        </fieldset>
        <fieldset class="password">
            <legend>Password</legend>
            <input type="password" v-model="password">
        </fieldset>
        <button class="button" @click="signUp">Create an account</button>
        </form>
    </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js'
export default {
    name: 'SignUpForm',
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

                if (error) {
                    console.log(error)
                    this.$toast.error(error.message)
                } else {
                    this.$router.push('/')
                    this.$toast.info('A mail has been sent to ' + user.email + '. Please activate your account.')
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>
