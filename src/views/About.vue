<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{data}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      data:''
    }
  },
  created(){
    // this.$axios({
    //   method:'get',
    //   url:'/api/aaa'
    // }).then(res=>{
    //   console.log(res)
    //   this.data = res.data.status
    // })
  }
}
</script>