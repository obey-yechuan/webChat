### 接口地址说明
1. 查询用户登陆状态 
方式: get
参数: token
地址: `http://127.0.0.1:3000/api/status `


2. 查询总人数 
方式：get 
参数：
地址：`http://127.0.0.1:3000/api/roomNumber`

3. 用户登录接口
方式：post
参数：email, password
地址：`http://127.0.0.1:3000/api/login`

4. 用户登录接口
方式：post
参数：email, admin, password
地址：`http://127.0.0.1:3000/api/register`

5. 用户创建房间
方式：post
参数：roomName, roomMaster
地址：`http://127.0.0.1:3000/user/createRoom`

6. 所有房间列表
方式：get
参数：
地址：`http://127.0.0.1:3000/user/queryRoom`