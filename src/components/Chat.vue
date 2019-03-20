<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <a class="btn btn-primary mb-2" href="/chats" role="button">Salir de este chat</a>
      <ul class="list-group">
        <li class="list-group-item" v-for="item in messages" v-bind:key="item.id">
          <span class="font-weight-bold">{{ item.user }}</span>
          <small class="font-italic">{{ showDate(item.created_at) }}</small>: {{ item.content }}
        </li>
      </ul>
      <form v-on:submit.prevent="sendMessage(message)">
        <div class="input-group">
          <input type="text" class="form-control mt-2 mb-5" v-model="message">
          <span class="input-group-btn">
            <input type="button" class="btn btn-primary mt-2 ml-2 mb-5" value="Enviar" v-on:click="sendMessage(message)">
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ActionCable from 'actioncable'
import moment from 'moment'
var cable = ActionCable.createConsumer('ws://localhost:3000/cable')

export default {
  name: 'Chat',
  data () {
    return {
      messages: [],
      error: [],
      message: '',
      respuesta: '',
      currentDay: null,
      userName: ''
    }
  },
  mounted () {
    this.$http.get('http://localhost:3000/chats/' + this.$route.params.id + '/messages.json').then(response => {
      this.messages = response.data.messages.slice(-20)
    }, error => {
      console.error(error)
    })
  },
  created () {
    cable.subscriptions.create({
      channel: 'ChatChannel',
      chat: this.$route.params.id
    }, {
      connected: function () {
        console.log('connected')
      },
      disconnected: function () {
        console.log('disconnected')
      },
      received: (data) => {
        this.messages.push(data.message)
      }
    })
    if (this.$cookies.isKey('user_name')) {
      this.userName = this.$cookies.get('user_name')
      if (this.userName.length < 3) {
        this.$router.push('/')
      }
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    sendMessage (message) {
      console.log('enviado')
      this.$http.post('http://localhost:3000/chats/' + this.$route.params.id + '/messages.json', {user: this.userName, content: message}).then(response => {
        console.log(response.data)
      }, error => {
        console.error(error)
      })
      this.message = ''
    },
    showDate (date) {
      this.currentDay = moment().format('DD/MM/YYYY')
      if (this.currentDay === moment(date).format('DD/MM/YYYY')) {
        return 'Hoy a las ' + moment(date).format('HH:MM')
      } else {
        return moment(date).format('DD/MM/YYYY')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
