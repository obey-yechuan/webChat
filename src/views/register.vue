<template>
  <div>
    <div class="login_body">
      <i class="iconfont icon-git" id="icon1"></i>

      <transition name="sign">
        <div v-if="isSignIn" class="input_body" id="input_body1">
          <div class="login_username">
            <i class="iconfont icon-icon_email"></i>
            <input v-model="email" type="text" maxlength="30" placeholder="请输入您的邮箱地址" class="login_input" />
          </div>
          <div class="login_password login_username">
            <i class="iconfont icon-icon_password"></i>
            <input v-model="password" type="text" maxlength="30" placeholder="请输入您的密码" class="login_input" />
          </div>
          <!-- 确认登录 -->
          <button @click="signIn" class="login_btn">登录</button>
        </div>

        <div v-else class="input_body input_box" id="input_body2">
          <div class="login_username">
            <i class="iconfont icon-icon_email"></i>
            <input v-model="email" type="text" maxlength="30" placeholder="请输入您的邮箱地址" class="login_input" />
          </div>
          <div class="login_password login_username">
            <i class="iconfont icon-iconuser"></i>
            <input v-model="admin" type="text" maxlength="30" placeholder="请输入您的昵称" class="login_input" />
          </div>
          <div class="login_admin login_username">
            <i class="iconfont icon-iconuser"></i>
            <input v-model="password" type="text" maxlength="30" placeholder="请输入您的密码" class="login_input" />
          </div>
          <!-- 确认登录 -->
          <button class="login_btn" @click="signUp">注册</button>
        </div>
      </transition>

      <div v-if="isSignIn" class="operate_body input_body" id="input_box1">
        <div>
          <button class="btn1">忘记密码</button>
          <button class="btn1" @click="isSignIn=!isSignIn">点击注册</button>
        </div>
      </div>

      <div v-else class="operate_body input_body" id="input_box2">
        <div>
          <button class="btn1 btn2" @click="isSignIn=!isSignIn">已有账号,直接登录</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { stringify } from 'querystring';
export default {
  data() {
    return {
      isSignIn: Boolean || true,
      admin:'',
      password:'',
      email:''
    };
  },
  methods: {
    signUp(){
      this.$axios({
        method:'post',
        url:'/api/register',
        data:{
          admin:this.admin,
          password:this.password,
          email:this.email
        }
      }).then(res=>{
        console.log(res)
        if(res.data.data.status == 'success'){
          this.isSignIn = true
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    signIn(){
      this.$axios({
        method:'post', 
        url:'/api/login',
        data:{
          password:this.password,
          email:this.email
        }
      }).then(res=>{
        if(res.data.status == 'success'){
          localStorage.setItem('chatUser',JSON.stringify(res.data.data.token))
          this.$router.push({name:'home'})
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  watch: {
    isSignIn: function() {
      if (this.isSignIn) {
		console.log("显示登录页面");
		
      } else {
        console.log("显示注册页面");
      }
    }
  }
};
</script>
<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
}

.login_body {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../assets/ba.jpg") no-repeat center center/cover;
}

#icon1 {
  display: block;
  position: absolute;
  font-size: 5rem;
  top: 5%;
  left: 50%;
  margin-left: -2.5rem;
  color: #eacb20;
}

.input_body {
  position: absolute;
  left: 10%;
  margin-top: 5rem;
  top: 25%;
  width: 80%;
}


.login_username {
  position: relative;
  height: 2rem;
  background: rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
}

.input_body .iconfont {
  float: left;
  color: #eacb20;
  line-height: 2rem;
  margin: 0 1rem;
}

.login_input {
  float: left;
  line-height: 2rem;
  width: 75%;
  background: rgba(0, 0, 0, 0.1);
  color: #f1f1f1;
  font-size: 16px;
}

.login_btn {
  position: relative;
  width: 100%;
  line-height: 2rem;
  color: #fff;
  background: #eacb20;
  border-radius: 1rem;
}

.operate_body {
  top: 70%;
  width: 80%;
}

.btn1 {
  float: left;
  border-top: 2px solid #eacb20;
  box-sizing: border-box;
  width: 50%;
  height: 2.5rem;
  color: #fff;
}

.btn1:hover {
  background-color: #eacb20;
}

#input_box2 .btn2 {
  width: 100%;
}

.sign-enter-active{
	transition: all .3s ease
}
.sign-leave-active{
	transition: all .3s ease
}
.sign-enter, .sign-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>