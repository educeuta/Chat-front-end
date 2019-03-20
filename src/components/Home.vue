<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <form class="form-login" v-on:submit.prevent="setName()">
        <h2 class="form-login-heading">Introduce nombre de usuario</h2>
        <input type="username" minlength=3 class="form-control mb-2" v-model="userName" required autofocus>
        <button class="btn btn-lg btn-primary btn-block" v-on:click="setName()">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: ''
    }
  },
  methods: {
    setName () {
      if (this.$cookies.isKey('user_name')) {
        this.UserName = this.$cookies.get('user_name')
      }
      if (this.userName.length >= 3) {
        this.$cookies.set('user_name', this.userName)
        this.$router.push('chats')
      }
    }
  }
}
</script>
