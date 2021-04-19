<template>
  <div class="sign-up-page">
    <field>
      <label>Email</label>
      <input type="email" v-model="email">
    </field>
    <div>{{email}}</div>
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

</style>
