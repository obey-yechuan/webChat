<template>
  <div class="home">
    <div class="create" @click="createRoom">创建房间</div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data() {
    return {
      tip:[]
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    createRoom(){
      var socket;
		if (!window.WebSocket) {
			window.WebSocket = window.MozWebSocket;
		}
		if (window.WebSocket) {
      this.socket = new WebSocket("ws://localhost:3001");
      //连接建立成功回调
      this.socket.onopen = ()=>{
        this.tip.push('连接成功...')
      }
      //连接关闭回调
      this.socket.onclose = ()=>{
        this.tip.push('连接关闭')
      }

      //新用户连接时欢迎消息
      this.socket.onmessage = (event)=>{
        this.tip.push('\n'+event.data+'\n')
      }
		} else {
			alert("你的浏览器不支持 WebSocket！");
    }
    }
  },
}
</script>
