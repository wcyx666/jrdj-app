<template>
  <div class="home">
    <Head :title="title"></Head>
    <div class="home-list">
      <ul>
        <li class="item">
          <div class="item-title">
            洗衣机（维修）<span>已确认</span>
          </div>
          <div class="item-label">  
            <ul>
              <li>不进水</li>
              <li>漏电</li>
            </ul>
          </div>
          <div class="item-money">
            <p>成交价：<span>328元</span>（包含平台服务费*26%）</p>
          </div>
          <div class="item-local">
            <p>订单号：9685525355485545</p>
          </div>
          <div class="item-local">
            <p>地址：大同市南郊区至京城小区2号楼B204室</p>
          </div>
          <div class="item-btn">
            <a href="javascript:void(0)">拨打电话</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Head from '../common/head.vue'
export default {
  name: 'home',
  data () {
    return {
      title: '匠人到家'
    }
  },
  components:{
    Head
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
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
  .item-money {
    font-size: 14px;
    color: #999;
    line-height: .5rem;
    padding-bottom: .1rem;
  }
  .item-money span {
    color: red;
  }
  .item-local {
    color: #999;
    font-size: 14px;
    display: box;
    display: -webkit-box;
    display: -o-box;
    padding-bottom: .1rem;
  }
  .item-local i {
    display: inline-block;
    width: .5rem;
    height: .5rem;
    background: url(../assets/icon_local.png) no-repeat;
    background-size: 100%;
  }
  .item-local p {
    -webkit-box-flex:1;
    line-height: .5rem;
  }
  .item-remarks {
    font-size: 14px;
    color: #999;
    padding-bottom: .15rem;
    display: box;
    display: -webkit-box;
    display: -o-box;
  }
  .item-remarks i {
    display: inline-block;
    width: .5rem;
    height: .5rem;
    background: url(../assets/icon_remarks.png) no-repeat;
    background-size: 100%;
  }
  .item-remarks p {
    -webkit-box-flex:1;
    line-height: .5rem;
  }
  .item-btn a {
    display: block;
    width: 100%;
    height: .8rem;
    text-align: center;
    line-height: .8rem;
    color: #fff;
    background: #d43c33;
    font-size: 16px;
    border-radius: .05rem;
  }
</style>
