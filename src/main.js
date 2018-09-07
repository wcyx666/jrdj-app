// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import AMap from 'vue-amap'

import Mint from 'mint-ui'
import AwesomePicker from 'vue-awesome-picker';
Vue.use(AwesomePicker);
Vue.use(router)
Vue.use(Mint)
Vue.use(AMap)
Vue.config.productionTip = false
Vue.prototype.$http = Axios;
Axios.defaults.baseURL = "http://127.0.0.1/"
Axios.defaults.withCredentials = true;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; //配置请求头信息。

AMap.initAMapApiLoader({
	key: 'aec3a24100751ab7feaa43f0530de7fb',
	plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation'],
	v: '1.4.4'
});
import 'mint-ui/lib/style.css';
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})