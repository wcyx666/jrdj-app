<template>
  <div class="home">
    <div class="home_banner">
      <router-link to="/task">
        <img src="../assets/home/banner_rsq.jpg" alt="">
      </router-link>
    </div>
    <div class="home_process">
      <div class="home_process_title">
        下单流程
      </div>
      <div class="home_process_content">
        <ul>
          <li>
            <img src="../assets/home/icon-1_pr.png" alt="">
            <p>在线/电话下单</p>
          </li>
          <li>
            <img src="../assets/home/icon-2_pr.png" alt="">
            <p>师傅电话确认</p>
          </li>
          <li>
            <img src="../assets/home/icon-3_pr.png" alt="">
            <p>师傅上门服务</p>
          </li>
          <li>
            <img src="../assets/home/icon-4_pr.png" alt="">
            <p>客户售后回访</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="home_assurance">
      <div class="home_process_title">
        服务保障
      </div>
      <div class="home_assurance_content">
        <ul>
          <li>
            <img src="../assets/home/icon-service1.png" alt="">
            <p class="home_assurance_content_title">先行赔付</p>
            <p>每笔订单均有客服跟进保障您的切身利益，售后保障。</p>
          </li>
          <li>
            <img src="../assets/home/icon-service2.png" alt="">
            <p class="home_assurance_content_title">价格统一</p>
            <p>服务与配件明码标价，绝无隐形消费您花的每一分钱都清晰透明。</p>
          </li>
          <li>
            <img src="../assets/home/icon-service3.png" alt="">
            <p class="home_assurance_content_title">安全保障</p>
            <p>全城实现预约服务，2小时上门快捷维修、安装服务。</p>
          </li>
          <li>
            <img src="../assets/home/icon-service4.png" alt="">
            <p class="home_assurance_content_title">专业服务</p>
            <p>维修专业把关，提供标准化服务，提高客户服务。</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '../common/head.vue'
import { MessageBox } from 'mint-ui';
export default {
  name: 'home',
  data () {
    return {
      title: '匠人到家'
    }
  },
  mounted () {
    
  },
  methods: {
    offerClick(){
      MessageBox.confirm('尚未提交实名认证，无法出价').then(action => {
        console.log('确定执行此操作')
      });
    }
  },
  components:{
    Head
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mint-header {
    background: #d43c33;
    font-size: 16px;
  }
  .home {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
  }
  .home_banner img {
    width: 100%;
  }
  .home_process {
    padding: .3rem;
    background: #fff;
  }
  .home_process_title {
    font-size: 16px;
  }
  .home_process_content {
    overflow: hidden;
  }
  .home_process_content ul li {
    width: 25%;
    float: left;
    text-align: center;
    font-size: 14px;
    padding: .3rem;
  }
  .home_process_content ul li img {
    width: .8rem;
    height: .8rem;
  }
  .home_assurance {
    padding: .3rem;
    background: #fff;
    margin-top: .2rem;
  }
  .home_assurance_content ul li {
    float: left;
    width: 50%;
    text-align: center;
    padding: .3rem;
    font-size: 12px;
    color: #999;
  }
  .home_assurance_content ul li img {
    width: 1.2rem;
    height: 1.2rem;
  }
  .home_assurance_content_title {
    font-size: 14px;
    color: #333;
    padding: .2rem 0;
  }
</style>
