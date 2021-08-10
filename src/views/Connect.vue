<template>
  <div class="container main-connect">
    <div class="main-position">
      <div class="wrapper" v-if="handleForm">
        <SignInForm />
      </div>
      <div class="wrapper" v-else>
        <SignUpForm />
      </div>
      <p class="connect" v-if="handleForm" @click="handleSwitchForm">I do not have an account.</p>
      <p class="connect" v-else @click="handleSwitchForm">I already have an account.</p>
    </div>
  </div>
</template>

<script>
import SignUpForm from '@/components/users/SignUpForm'
import SignInForm from '@/components/users/SignInForm'

export default {
  name: 'Connect',
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
.container {
  z-index: 0;
}

.main-connect {
  height: 100vh;
  position: absolute;
  top: 0;
  width: 100%;

  .main-position {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

.connect {
  position: relative;
  z-index: 2;
  color: var(--primary);
  cursor: pointer;
  text-align: right;
  width: 300px;
  margin: 1em auto 0 auto;

  &:hover {
      color: var(--white);
  }
}

.sign-up-page{}

.main-form {
  position: relative;
  color: var(--white);
  text-align: center;
  font-family: 'VT323', monospace;
  font-size: 1.25rem;

  form {
    width: 300px;
    margin: 0 auto;

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

    button {
      width: 300px;
      border: none;
      padding: .25rem 0;
      margin-top: .5rem;
      background-color: #d03636;
      font-family: 'VT323', monospace;
      cursor: pointer;
      font-size: 1.25rem;

      &:hover {
        background: var(--white);
      }
    }
  }
}

</style>
