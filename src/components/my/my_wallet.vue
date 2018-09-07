<template>
  <div class="wallet">
    <mt-header :title="title">
      <mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
    </mt-header>
    <div class="wallet-content-total">
      <p class="total-name">总资产（元）</p>
      <p class="total-money">{{ toFixed(money) }}</p>
    </div>
    <div class="wallet-content-balance">
      <div class="wallet-content-left">
        <p class="total-name">余额（元）</p>
        <p class="total-money">{{ toFixed(money) }}</p>
      </div>
      <div class="wallet-content-right">
        <a href="javascript:void(0)" @click="waletClick">提现</a>
      </div>
    </div>
    <div class="wellet-router">
      <div class="wellet-router-title">
        <h2>接单子，挣佣金</h2>
      </div>
      <div class="wellet-router-content">
        <img src="../../assets/bag_img.png" alt="">
        <p>你不接单，单不理你</p>
        <a href="javascript:void(0)">去接单</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  name: 'wallet',
  data () {
    return {
      title: '我的钱包',
      money:2585
    }
  },
  methods :{
    backClick (){
      this.$router.go(-1);
    },
    toFixed (val) {
      return val.toFixed(2);
    },
    waletClick () {
      console.log('提现')
    }
  },
  mounted(){

  },
  components:{
    Header
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mint-header {
    background: #d43c33;
  }
  .wallet {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }
  .wallet-content-total {
    padding: .3rem;
    background: #d43c33;
    color: #fff;
  }
  .total-name {
    font-size: 14px;
  }
  .total-money {
    font-size: 24px;
    font-weight: bold;
  }
  .wallet-content-balance {
    background: #fff;
    margin-top: .2rem;
    padding: .3rem;
  }
  .wallet-content-balance .total-name {
    color: #999;
  }
  .wallet-content-left {
    float: left;
  }
  .wallet-content-right a {
    display: block;
    width: 1.5rem;
    height: .6rem;
    border:.01rem solid #d43c33;
    text-align: center;
    line-height: .6rem;
    color: #333;
    border-radius: .5rem;
    float: right;
    margin-top: .3rem;
  }
  .wellet-router {
    background: #fff;
    margin-top: .2rem;
  }
  .wellet-router-title {
    border-bottom: .01rem solid #f8f8f8;
    line-height: 1rem;
    font-size: 16px;
    padding: 0 .3rem;
  }
  .wellet-router-content {
    text-align: center;
    padding: 1rem 0;
  }
  .wellet-router-content img {
    width: 1rem;
    height: .8rem;
  }
  .wellet-router-content p {
    color: #999;
    padding: .3rem 0;
  }
  .wellet-router-content a {
    display: inline-block;
    padding: .2rem 1rem;
    background: #d43c33;
    font-size: 14px;
    color: #fff;
    border-radius: 1rem;
  }
</style>
