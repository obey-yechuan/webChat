<template>
    <div>
        <div class="login_body">
		<i class="iconfont icon-git" id="icon1"></i>
		<div class="input_body" id="input_body1">
			<div class="login_username">
					<i class="iconfont icon-icon_email"></i>
					<input type="text" maxlength="30" placeholder="请输入您的邮箱地址" class="login_input">
			</div>
			<div class="login_password login_username">
				<i class="iconfont icon-icon_password"></i>
				<input type="text" maxlength="30" placeholder="请输入您的密码" class="login_input">
			</div>
				<!-- 确认登录 -->
			<button class="login_btn">登录</button>
		</div>

		<div class="input_body input_box" id="input_body2">
			<div class="login_username">
					<i class="iconfont icon-icon_email"></i>
					<input type="text" maxlength="30" placeholder="请输入您的邮箱地址" class="login_input">
			</div>
			<div class="login_password login_username">
				<i class="iconfont icon-iconuser"></i>
				<input type="text" maxlength="30" placeholder="请输入您的昵称" class="login_input">
			</div>
				<!-- 确认登录 -->
			<button class="login_btn">验证</button>
		</div>

		<div class="operate_body input_body" id="input_box1">
			<div>
				<button class="btn1">忘记密码</button>
				<button class="btn1">点击注册</button>
			</div>
		</div>

		<div class="operate_body input_body" id="input_box2">
			<div>
				<button class="btn1 btn2">已有账号,直接登录</button>
			</div>
		</div>
	</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style lang="css" scoped>
	* {
	margin: 0;
	padding: 0;
}

.login_body {
	position:absolute;
	width: 100%;
    height: 100%;
    overflow:hidden;
    background: url("../assets/ba.jpg") no-repeat center center/cover;
}

#icon1 {
	display:block;
	position:absolute;
	font-size:5rem;
	top:5%;
	left:50%;
	margin-left:-2.5rem;
	color:#eacb20;
}

.input_body {
	position:absolute;
	left:10%;
	margin-top:5rem;
	top:25%;
	width:80%;
}

.input_box {
	left: 100%;
}

.login_username {
	position:relative;
	height:2rem;
	background:rgba(0,0,0,0.5);
	margin-bottom:1rem;
}

.input_body .iconfont {
	float:left;
	color:#eacb20;
	line-height:2rem;
	margin:0 1rem
}

.login_input {
	float:left;
	line-height:2rem;
	width:75%;
	background:rgba(0,0,0,0.1);
	color:#f1f1f1;
	font-size:16px;
}

.login_btn {
	position:relative;
	width:100%;
	line-height:2rem;
	color:#fff;
	background:#eacb20;
	border-radius:1rem;
}

.operate_body {
	top:70%;
	width:80%;
}

.btn1 {
	float:left;
	border-top:2px solid #eacb20;
	box-sizing:border-box;
	width:50%;
	height:2.5rem;
	color:#fff;
}

.btn1:hover {
	background-color: #eacb20;
}

#input_box2 {
	left: 100%;
}

#input_box2 .btn2 {
	width:100%
}
</style>