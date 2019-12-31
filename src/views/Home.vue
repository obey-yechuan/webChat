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
      url:'/api/roomNumber',
      method:'ger'
    }).then(res=>{
      console.log(res)
    })
  }
}
</script>
