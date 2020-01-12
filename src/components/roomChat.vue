<template>
  <div class="chatbox">
    <div class="chat_message fn-clear">
      <div class="chat_left">
        <div class="message_box" id="message_box">
          <div class="msg_item fn-clear">
            <div class="uface">
              <img src="../assets/images/53f44283a4347.jpg" width="40" height="40" alt />
            </div>
            <div class="item_right">
              <div class="msg">
                欢迎大哥前来视察
              </div>
              <div class="name_time">猫猫 · 3分钟前</div>
            </div>
          </div>

          <div class="msg_item fn-clear">
            <div class="uface">
              <img src="../assets/images/53f442834079a.jpg" width="40" height="40" alt />
            </div>
            <div class="item_right">
              <div
                class="msg"
              >(Visual) FoxPro, 4th Dimension/4D, Alice, APL, Arc, Automator, Awk, Bash, bc, Bourne shell, C++CLI, CFML, cg, CL (OS/400), Clean, Clojure, Emacs Lisp, Factor, Forth, Hack, Icon, Inform, Io, Ioke, J, JScript.NET, LabVIEW, LiveCode, M4, Magic, Max/MSP, Modula-2, Moto, NATURAL, OCaml, OpenCL, Oz, PILOT, Programming Without Coding Technology, Prolog, Pure Data, Q, RPG (OS/400), S, Smalltalk, SPARK, Standard ML, TOM, VBScript, Z shell</div>
              <div class="name_time">白猫 · 1分钟前</div>
            </div>
          </div>

          <div class="msg_item fn-clear">
            <div class="uface">
              <img src="../assets/images/hetu.jpg" width="40" height="40" alt />
            </div>
            <div class="item_right">
              <div class="msg own">那个统计表也不能说明一切</div>
              <div class="name_time">河图 · 30秒前</div>
            </div>
          </div>
        </div>
        <div class="write_box">
          <textarea
            v-model="message"
            @keyup.enter="enter(message)"
            id="message"
            name="message"
            class="write_area"
            placeholder="说点啥吧..."
          ></textarea>
          <input type="hidden" name="fromname" id="fromname" value="河图" />
          <input type="hidden" name="to_uid" id="to_uid" value="0" />
          <div class="facebox fn-clear">
            <div class="expression"></div>
            <div class="chat_type" id="chat_type">群聊</div>
            <button name class="sub_but" @click="send(message)">提 交</button>
          </div>
        </div>
      </div>
      <div class="chat_right">
        <ul class="user_list" title="双击用户私聊">
          <li class="fn-clear selected">
            <em>所有用户</em>
          </li>
          <li class="fn-clear" data-id="1">
            <span>
              <img src="../assets/images/hetu.jpg" width="30" height="30" alt />
            </span>
            <em>河图</em>
            <small class="online" title="在线"></small>
          </li>
          <li class="fn-clear" data-id="2">
            <span>
              <img src="../assets/images/53f44283a4347.jpg" width="30" height="30" alt />
            </span>
            <em>猫猫</em>
            <small class="online" title="在线"></small>
          </li>
          <li class="fn-clear" data-id="3">
            <span>
              <img src="../assets/images/53f442834079a.jpg" width="30" height="30" alt />
            </span>
            <em>白猫</em>
            <small class="offline" title="离线"></small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { resolve } from "path";
import { reject } from "q";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      tip: [],
      message: "",
      chartMember: []
    };
  },
  methods: {
    send(message) {
      if (!window.WebSocket) {
        return;
      }
      if (this.socket.readyState == WebSocket.OPEN) {
        var area = document.getElementById("responseText");
        this.socket.send(message);
        this.message = "";

        //接受到消息回调
        this.socket.onmessage = event => {
          this.tip.push("\n" + event.data + "\n");
          area.scrollTop = area.scrollHeight - area.clientHeight;
          console.log(area.scrollTop, area.scrollHeight, area.clientHeight);
        };
        //滚动条总保持最下端
      } else {
        alert("连接没有开启.");
      }
    },

    //清除消息
    clear() {
      this.tip = [];
    },

    //监听enter
    enter(message) {
      var area = document.getElementById("responseText");
      this.socket.send(message);
      this.message = "";
      this.socket.onmessage = event => {
        this.tip.push("\n" + event.data + "\n");
        area.scrollTop = area.scrollHeight - area.clientHeight;
      };
    }
  },
  beforeCreate(){
  },
  mounted() {
    var socket;
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
      this.socket = new WebSocket("ws://localhost:3001");
      //连接建立成功回调
      this.socket.onopen = () => {
        this.tip.push("连接成功...");
      };
      //连接关闭回调
      this.socket.onclose = () => {
        this.tip.push("连接关闭");
      };

      //新用户连接时欢迎消息
      this.socket.onmessage = event => {
        this.tip.push("\n" + event.data + "\n");
      };
    } else {
      alert("你的浏览器不支持 WebSocket！");
    }
  },
  beforeDestroy() {
    //发送关闭请求
    this.socket.close();
  }
};
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

@font-face {
  font-family: 'fontello';
  src: url('../assets/font/fontello.eot?68245288');
  src: url('../assets/font/fontello.eot?68245288#iefix') format('embedded-opentype'),
       url('../assets/font/fontello.woff?68245288') format('woff'),
       url('../assets/font/fontello.ttf?68245288') format('truetype'),
       url('../assets/font/fontello.svg?68245288#fontello') format('svg');
  font-weight: normal;
  font-style: normal;
}


/*chatbox*/
.chatbox{  background:#176994 url(../assets/images/wood.jpg);overflow:hidden; height:100%; width:100%; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; background-color:rgba(255,255,255,1);}

/*chat_top*/
.chat_top{ height:60px; border-bottom:1px solid #eee;}
.logo{ float:left;}
.logo img{ vertical-align:bottom;}
.uinfo{ margin:10px 0; float:right; padding-right:20px;}
.uface{ float:left; height: 40px;}
.uface img{ -moz-border-radius:50%; -webkit-border-radius:50%; border-radius:50%;}
.uinfo .uname{ float:left; line-height:40px; margin-left:10px; color:#2E4059; position:relative;}
.uinfo .uname i.down{ margin-left:50px;}
.managerbox{ display:none; width:100px; border:1px solid #eee; background-color:#FFF; padding:10px 0; position:absolute; top:40px; right:-10px;}
.managerbox a{ display:block; color:#2E4059; padding:0px 10px;}
.managerbox a i{ margin-right:10px;}
.managerbox a:hover{ background-color:#f9f9f9; text-decoration:none;}

/*chat_message*/
.chat_message{ height:-moz-calc(100% - 61px); height:-webkit-calc(100% - 61px); height:calc(100% - 61px);}

/*chat_left*/
.chat_left{ padding:20px; width:-moz-calc(100% - 240px); width:-webkit-calc(100% - 240px); width:calc(100% - 240px); height:-moz-calc(100% - 40px); height:-webkit-calc(100% - 40px); height:calc(100% - 40px); float:left;}
.message_box{ background-color:#FFF; margin-bottom:20px; height:-moz-calc(100% - 120px); height:-webkit-calc(100% - 120px); height:calc(100% - 120px); overflow:auto;}
.msg_item{ margin-bottom:20px; position:relative;}
.msg_item .uface{ position:absolute; bottom:0px;}
.msg_item .item_right{ margin-left:45px; float:left; margin-right:15px;}
.msg_item .msg{ background-color:#F4F6F8; padding:10px 15px; line-height:24px; -moz-border-radius:10px; -webkit-border-radius:10px; border-radius:10px; color:#2E4059; position: relative; margin-bottom:5px;}
.msg.own{ background-color:#E0F1FC;}/*自己的聊天记录显示为蓝色*/
.msg_item .msg:before {
content: "";
position: absolute;
bottom: -12px;
left: 10px;
border-width: 12px 12px 0 0 ;
border-style: solid;
border-color: #F4F6F8 transparent;
display: block;
width: 0;
}
.msg_item .msg.own:before{ border-color:#E0F1FC transparent;}
.msg_item .name_time{ font-size:12px; color:#7E90A5; line-height:30px; padding-left:10px;}

.write_box{ height:100px; overflow:hidden; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; overflow:hidden;}
.write_area{ border:2px solid #E3E8ED; border-bottom:none; padding:5px; outline:none; color:#B4C0CE; margin:0; vertical-align:bottom; width:-moz-calc(100% - 14px); width:-webkit-calc(100% - 14px); width:calc(100% - 14px); height:56px;}
.facebox{ height:32px; width:100%; background-color:#E3E8ED;}
.sub_but{ float:right; padding:0 25px; background-color:#7E90A5; outline:none; border:none; height:32px; cursor:pointer; line-height:30px; color:#FFF;}

/*chat_right*/
.chat_right{ width:199px; height:100%; float:left; border-left:1px solid #eee;}
.user_list{ padding:0; overflow:auto; height:100%;}
.user_list li{ padding:10px 20px; color:#2E4059; cursor:pointer;}
.user_list li:hover,.user_list li.selected{ background-color:#F4F6F8;}
.user_list li span{ display:block; float:left; width:30px; height:30px; margin-right:10px;}
.user_list li em{ display:block; float:left; height:30px; line-height:30px;}
.user_list li small{ width:10px; height:10px; margin:10px; float:left; -moz-border-radius:50%; -webkit-border-radius:50%; border-radius:50%;}
small.online{ background-color:#57B869;}
small.offline{ background-color:#EB3E3E;}
.user_list li img{ -moz-border-radius:50%; -webkit-border-radius:50%; border-radius:50%; vertical-align:middle;}


/*expression - 表情,有待增加*/
.expression{ float:left;}

/*chat_type - 聊天性质,私聊|群聊*/
.chat_type{ float:left; line-height:30px; padding-left:10px;}

</style>
