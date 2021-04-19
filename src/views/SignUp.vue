<template>
  <div class="container wrapper">
    <div class="sign-up-page">
      <form class="form">
        <field class="email">
          <label>Email</label>
          <input type="email" v-model="email">
        </field>
        <field class="password">
          <label>Password</label>
          <input type="password" v-model="password">
        </field>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style lang="css">
.container.wrapper {
  height: 100vh;
}

.sign-up-page {
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  color: white;
  text-align: center;
}

.form {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: last baseline;
  row-gap: .5em;
}

.email {
  grid-column: 4 / span 4;
  grid-row: 1 / span 2;
}

.password {
  grid-column: 4 / span 4;
  grid-row: 2;
}

label {
  margin-right: .5em;
}

</style>
