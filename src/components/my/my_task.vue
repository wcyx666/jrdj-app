<template>
  <div class="task">
    <mt-header :title="title">
      <mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
    </mt-header>
    <div class="home-list">
      <ul>
        <li class="item">
          <div class="item-title">
            洗衣机（维修）<span>已完成</span>
          </div>
          <div class="item-number">  
            订单编号：85996633225857458596
          </div>
          <div class="item-number">  
            维修费：<span class="money">285</span>元（包括平台服务费）
          </div>
          <div class="item-number last">
            <p>维修地址：大同市南郊区至京城小区2号楼B204室</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  name: 'task',
  data () {
    return {
      title: '历史任务'
    }
  },
  methods :{
    backClick (){
      this.$router.go(-1);
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
  .task {
    background: #f5f5f5;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .item {
    background: #fff;
    padding: .4rem .2rem;
    margin-top: .2rem;
  }
  .item-title {
    font-size: 16px;
    padding-bottom: .15rem;
  }
  .item-title span {
    float: right;
    font-size: 14px;
    position: relative;
  }
  .item-title span:after {
    display: block;
    content: "";
    width: .2rem;
    height: .2rem;
    background: red;
    border-radius: .2rem;
    position: absolute;
    top: .1rem;
    left: -.3rem;
  }
  .item-label {
    overflow: hidden;
    padding-bottom: .15rem;
  }
  .item-label ul li {
    float: left;
    font-size: 14px;
    border:.01rem solid #d43c33;
    display: inline-block;
    padding: .1rem .15rem;
    border-radius: .05rem;
    margin-right: .1rem;
  }
  .item-local {
    color: #999;
    font-size: 14px;
    display: box;
    display: -webkit-box;
    display: -o-box;
  }
  .item-number {
    font-size: 14px;
    color: #333;
    padding-bottom: .2rem;
  }
  .last {
    padding-bottom: 0;
  }
  .money {
    color: red;
  }
</style>
