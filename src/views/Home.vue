<template>
  <div class="home">
    <div class="number">房间人数:{{roomNum}}</div>
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
      tip:[],
      roomNum:''
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    createRoom(){
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
  }
}
</script>
