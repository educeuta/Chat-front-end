<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <a class="btn btn-primary mb-2" href="/" role="button">Cambiar nombre de usuario</a>
      <form class="form-inline" v-on:submit.prevent="newChat(chatName)">
        <div class="form-group mb-2">
          <input type="text" minlength=3 class="form-control" placeholder="Nombre del chat" v-model="chatName">
        </div>
        <button class="btn btn-primary ml-2 mb-2">Crear chat</button>
      </form>
      <div class="list-group">
        <paginate name="chats" :list="chats" :per="8">
          <button v-for="item in paginated('chats')" :key="item._id"
          type="button" class="list-group-item list-group-item-action"
          v-on:click="goChat(item.id.$oid)">
            <h5>{{ item.name }}</h5>
            <small>Último mensaje: {{ item.updated_at | moment('hh:mm a, DD/MM/YYYY') }}</small>
          </button>
        </paginate>
        <paginate-links for="chats" :classes="{'ul': 'pagination',
        'li': 'page-item', 'a': 'page-link'}"></paginate-links>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chats',
  data () {
    return {
      chats: [],
      error: [],
      paginate: ['chats'],
      chatName: '',
      userName: ''
    }
  },
  created () {
    if (this.$cookies.isKey('user_name')) {
      this.userName = this.$cookies.get('user_name')
      if (this.userName.length < 3) {
        this.$router.push('/')
      }
    } else {
      this.$router.push('/')
    }
  },
  mounted () {
    this.$http.get('http://localhost:3000/chats.json').then(response => {
      this.chats = response.data.chats
    }, error => {
      console.error(error)
    })
  },
  methods: {
    goChat (id) {
      this.$router.push({ path: '/chat/' + id })
    },
    newChat (chatName) {
      this.$http.post('http://localhost:3000/chats', {name: chatName}).then(response => {
        console.log(response.data)
      }, error => {
        console.error(error)
      })
      this.$router.go()
    }
  }
}
</script>

<style scoped>
  ul{
    padding-inline-start: 0px;
  }
</style>
