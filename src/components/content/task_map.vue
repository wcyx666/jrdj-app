<template>
  <div class="map">
  	<mt-header title="选择地址">
		<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
	</mt-header>
	 <div class="search-box">
      <div class="search">
        <i class="icon_sec"></i>
        <input type="text" placeholder="查找/小区/街道等" v-model="value">
      </div>
    </div>
  	<div class="local-list">
  		<ul>
  			<li v-for="items in localData" @click="getLocalInfo(items)">
  				<h2>{{ items.name }}</h2>
  				<p>{{ items.district }}{{ items.address }}</p>
  			</li>
  		</ul>
  	</div>
  </div>
</template>

<style>
  .amap-page-container {
    height: 500px;
  }
</style>


<script>
	// 节流函数
	const delay = (function() {
	  let timer = 0;
	  return function(callback, ms) {
	    clearTimeout(timer);
	    timer = setTimeout(callback, ms);
	  };
	})();
	import AMap from 'AMap'
	import { Header,Toast,Checklist  } from 'mint-ui';
	export default {
		data () {
			return {
				value:"",
				localData:"",
			}
		},
		methods:{
			get(){
				let vm = this;
				if(vm.value != ''){
					AMap.plugin('AMap.Autocomplete', function(){
					  // 实例化Autocomplete
					  var autoOptions = {
					    //city 限定城市，默认全国
					    city: '大同市'
					  }
					  var autoComplete= new AMap.Autocomplete(autoOptions);
					  autoComplete.search(vm.value, function(status, result) {
					  	vm.localData = result.tips;
					    // 搜索成功时，result即是对应的匹配数据
					  })
					})
				}	
			},
			init(){
				let vm = this;
				AMap.plugin('AMap.Autocomplete', function(){
				  // 实例化Autocomplete
				  var autoOptions = {
				    //city 限定城市，默认全国
				    city: '大同市'
				  }
				  var autoComplete= new AMap.Autocomplete(autoOptions);
				  autoComplete.search('大同', function(status, result) {
				  	vm.localData = result.tips;
				    // 搜索成功时，result即是对应的匹配数据
				  })
				})
			},
			backClick (){
				this.$router.go(-1);
			},
			getLocalInfo(obj){
				let data = JSON.stringify(obj);
				sessionStorage.setItem('key_local', data);
				this.$router.go(-1);
			}
		},
		mounted(){
			this.init();
		},
		compontents:{
			Header,
			Checklist
		},
		watch: {
			value() {
			  delay(() => {
			    this.get();
			  }, 300);
			},
		}

	}
</script>
<style scoped>
  .search-box {
    padding: .3rem;
  }
  .search {
    position: relative;
    width: 100%;
    height: .6rem;
    padding-left: .6rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: .1rem;
    border-bottom: .01rem solid #ebecec;
  }
  .icon_sec {
    position: absolute;
    left: 0;
    top: .06rem;
    margin: 0 .1rem;
    vertical-align: middle;
    width: .5rem;
    height: .5rem;
    background-image: url(../../assets/task/icon_seachar.png);
    background-size: 100%;
  }
  .search input {
    width: 80%;
    height: .6rem;
    line-height: .6rem;
    background: transparent;
    font-size: 14px;
    color: #333;
    -webkit-appearance: none;
    border-radius: 0;
    border: 0;
    outline: none;
    float: left;
  }
  .local-list {
  	padding: 0 .3rem;
  	font-size: 14px;
  }
  .local-list ul li {
	padding-bottom: .2rem;
	padding-top: .2rem;
	border-bottom: .01rem solid #ededed;
  }
  .local-list h2 {
  	color: #333;
  	font-size: 14px;
  }
  .local-list p {
  	color: #999;
  	font-size: 12px;
  	padding-top: .1rem;
  }
</style>