<template>
  <div class="hello">
    <form onsubmit="return false;">
		<textarea id="responseText" style="width: 500px; height: 300px;"  v-model="tip"></textarea>
		<br>
		<input type="text" name="message" style="width: 300px" v-model="message" @keyup.enter="enter(message)">
		<input type="button" value="发送消息" @click="send(message)">
		<input type="button" 
			value="清空聊天记录">
	</form>
  </div>
</template>

<script>
import { resolve } from 'path';
import { reject } from 'q';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      tip:[],
      message:'',
      chartMember:[]
    }
  },
  methods: {  
		send(message) {
			if (!window.WebSocket) {
				return;
      }
			if (this.socket.readyState == WebSocket.OPEN) {
        var area = document.getElementById('responseText');
        this.socket.send(message);
        this.message = ''

         //接受到消息回调
        this.socket.onmessage = (event)=>{
          this.tip.push('\n'+event.data+'\n')
          area.scrollTop = area.scrollHeight-area.clientHeight
          console.log(area.scrollTop,area.scrollHeight,area.clientHeight)

        }
          //滚动条总保持最下端
        
			} else {
				alert("连接没有开启.");
			}
    },
    
    //监听enter
    enter(message){
      var area = document.getElementById('responseText');
      this.socket.send(message);
      this.message=''
      this.socket.onmessage = (event)=>{
        this.tip.push('\n'+event.data+'\n')
        area.scrollTop = area.scrollHeight-area.clientHeight
      }
    }
  },
  mounted(){
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
    
    

  },
  beforeDestroy(){
    //发送关闭请求
    this.socket.close()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
