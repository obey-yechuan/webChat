<template>
  <div class="home">
      <div id="nav">
      <router-link to="/">聊天房间列表</router-link> |
      <router-link to="/about">个人中心</router-link>
    </div>
    <div class="info">
      <div class="number">房间人数:{{roomNum}}</div>
      <input type="text" v-model="cusName" placeholder="请输入房间名">
      <button class="create" @click="createRoom">创建房间</button>
      <span @click="register">点击注册</span>
    </div>
    <div class="roomlist">
      <ul>
        <li class="room" v-for="(room,index) in rooms" :key="index" @click = 'enter(index)'  >
          <div class="title">房名:{{room.roomName}}</div>
          <div class="master">房主:{{room.roomMaster}}</div>
          <div class="into">点击进入房间</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data() {
    return {
      tip:[],
      rooms:[],
      roomNum:'',
      cusName:''
    }
  },
  components: {
  },
  methods: {
    createRoom(){
      this.$axios({
        method:'post',
        url:'/users/createRoom',
        data:{
          roomName:this.cusName,
          roomMaster:this.userName || 'admin'
        }
      }).then(res=>{
        console.log(res)
      })

      this.rooms.push({roomName:this.cusName,roomMaster:'admin'})
      this.cusName=''
    },

    //进入房间
    enter(index){
      this.$router.push({name:'roomChat'})
    },

    //注册账号
    register(){
      this.$router.replace({name:'register'})
    }

  },
  created(){
    this.$axios({
      method:'get',
      url:'/api/roomNumber',
    }).then(res=>{
      this.roomNum = res.data.data.roomNumber
    }).catch(err=>{
      console.log(err)
    })
    this.$axios({
      method:'get',
      url:'/users/queryRoom',
    }).then(res=>{
      this.rooms = res.data.data
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>
<style lang="scss">
  .info{
    display: flex;
    justify-content: space-around;
    .number{
      line-height: 40px;
      color:green
    }
    .create{
      width:80px;
      height: 40px;
      line-height: 40px;
      background: #0d8680;;
      color: #fff
    }
  }
  .roomlist{    
    .room{
      height: 80px;
      background: #0d8680;
      color:#fff;
      border: 1px solid pink;
      margin:20px 10px;

    }
  }
</style>
