<template>
  <div class="container">
    <button @click="handleSwitchForm">I already have an account.</button>
    <div class="wrapper" v-if="handleForm">
      <SignUpForm />
    </div>
    <div class="wrapper" v-else>
      <SignInForm />
    </div>
  </div>
</template>

<script>
import SignUpForm from '@/components/SignUpForm'
import SignInForm from '@/components/SignInForm'

export default {
  name: 'SignUp',
  components: {
    SignUpForm,
    SignInForm
  },
  data () {
    return {
      handleForm: true
    }
  },
  methods: {
    handleSwitchForm: function () {
      console.log('switch!')
      this.handleForm = !this.handleForm
    }
  }
}
</script>

<style lang="scss">
.container .wrapper {
  height: 100vh;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;

}

button {
  position: relative;
  z-index: 2
}

.sign-up-page{}

.main-form {
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
