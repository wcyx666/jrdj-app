<template>
  <div class="info">
    <mt-header :title="title">
      <mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
    </mt-header>
    <div class="info-content-list">
      <div class="info-content" @click="add">
        <span class="info-name">头像</span>
        <div class="info-content-tx">
          <img :src="tx_url" alt="">
        </div>
      </div>
      <div class="info-content-name">
        <span>昵称</span>
        <input type="text" placeholder="请填写你的姓名" v-model="name">
      </div>
      <div class="info-content-name">
        <span>手机号</span>
        <input type="text" placeholder="请填写你的手机号码" v-model="phone">
      </div>
      <div class="info-content-name" @click="toMap">
        <span>地址</span>
        <input type="text" placeholder="请选择地址" v-model="local">
      </div>
      <div class="info-content-name">
        <span>门牌号</span>
        <input type="text" placeholder="例：16号楼5层301室" v-model="num">
      </div>
    </div>
	 <div class="info_btn">
	 	<a href="javascript:void(0)" @click="getInfo">提交</a>
	 </div>
   <input @change="upload" type="file" accept="image/*" ref="file" style="display:none;/">
  </div>
</template>

<script>
import { Header,Toast } from 'mint-ui';
import Qs from 'qs'
export default {
  name: 'info',
  data () {
    return {
      tx_url:"", // 头像url
      uid:'',
      name:'', // 姓名
      phone:'', // 手机号
      local:"",// 地址
      num:'', // 门牌号
      imgFile:'', //上传图片
      title: '我的资料'
    }
  },
  methods :{
    backClick (){
      this.$router.go(-1);
    },
    add(){
      this.$refs.file.click();
    },
    toMap(){
      this.$router.push({ path:'/task/details/map' })
    },
    upload(e){
      let vm = this;
      vm.imgFile = e.target.files[0];
      let file = e.target.files[0];
      let imgSize = file.size/1024;
      if(imgSize>200){
          alert('请上传大小不要超过200KB的图片')
      }else{
        let reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
            vm.tx_url = reader.result;
            
        }
      }
    },

    selectInfo(){
      let vm = this;
      let params = Qs.stringify({
        uid:vm.uid,
      })
      vm.$http({
        method: 'post',
        url: '/lib/user_info.php',
        data: params,
        xhrFields: {
          withCredentials: true
        },
      }).then(res =>{
        console.log(res);
        let url = 'http://127.0.0.1/lib/';
        let data = res.data.data;
        vm.name = data.name,
        vm.phone = data.phone,
        vm.num = data.num,
        vm.local = data.local,
        vm.tx_url = url+data.icon
      }, res => {
      // 错误回调
      })
    },
    // 提交个人信息
    getInfo(){
      let vm = this;
      let params = Qs.stringify({
        uid:vm.uid,
        name:vm.name,
        phone:vm.phone,
        num:vm.num,
        local:vm.local
      })
      vm.$http({
        method: 'post',
        url: '/lib/update_info.php',
        data: params,
        xhrFields: {
          withCredentials: true
        },
      }).then(res =>{
        if(res.data.success == 1){
          let param = new FormData(); //创建form对象
          param.append('uid',vm.uid);
          param.append('type',1);
          param.append('file',vm.imgFile,vm.imgFile.name)
          vm.$http({
            method: 'post',
            url: '/lib/upload_img.php',
            data: param,
            xhrFields: {
              withCredentials: true
            },
          }).then(res =>{
            let instance = Toast({
              message: '提交成功',
              position: 'bottom',
              duration: 5000
            });
            setTimeout(() => {
              instance.close();
              vm.$router.push({ path: '/my' });
            }, 1500);
          }, res => {
          // 错误回调
          })
        }
      }, res => {
      // 错误回调
      })
    }
  },
  mounted(){
    let key = JSON.parse(localStorage.getItem('userInfo'));
    this.uid = key.uid;
    this.selectInfo();
  },
  updated: function () {
    this.$nextTick(function () {
      if(sessionStorage.getItem('key_local')){
        // 获取地址
        var key_local = JSON.parse(sessionStorage.getItem('key_local'));
        this.local = key_local.name;
      }
      
    })
  },
  components:{
    Header,
    Toast
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .info-content-list {
    padding: 0 .3rem;
  }
  .info-content {
    padding: .2rem 0;
    border-bottom: .01rem solid #ededed;
  }
  .info-content-tx {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    background: #fff;
    float: right;
  }
  .info-content-tx img {
    width: 100%;
    height: 100%;
  }
  .info-name {
    font-size: 14px;
    line-height: 1rem;
  }
  .info-content-add {
    font-size: 16px;
    line-height: 1.5rem;
    color: #999;
    margin-left: .3rem;
    float: left;
  }
  .info-content-name {
    border-bottom: .01rem solid #ededed;
    padding: .3rem 0;
    background: #fff;
    font-size: 14px;
  }
  .info-content-name input {
  	outline: none;
    border:0;
  }

  .info-content-name h2 {
  	font-size: 14px;
  	color: #999;
  	padding: .3rem 0;
  }
  .info-content-name-put {
  	font-size: 14px;
  	padding: .3rem 0;
  	background: #fff;
  }
  .info-content-name span {
  	display: inline-block;
  	width: 1.5rem;
  }
  .info_btn {
  	padding: .3rem;
  }
  .info_btn a {	
  	display: block;
  	width: 100%;
  	height: .8rem;
  	text-align: center;
  	line-height: .8rem;
  	color: #fff;
  	font-size: 16px;
  	background: #d43c33;
  	border-radius: .1rem;
  }
  .info_btn p {
  	text-align: center;
  	font-size: 14px;
  	color: #999;
  	padding: .3rem 0;
  }
</style>
