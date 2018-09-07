<template>
	<section class="task_details">
		<mt-header title="填写维修信息">
			<mt-button icon="back" slot="left" @click.native="backClick"></mt-button>
		</mt-header>
		<div class="task_details_conyent">
			<div class="task_details_goods">
				<div class="task_details_title">
					<h2>维修物品</h2>
				</div>
				<div class="task_details_goods_list">
					<ul>
						<li v-for="(items,index) in data" @click="getfault(items.repair_name)">
							<img src="../../assets/任务.png" alt="">
							<p>{{ items.repair_name }}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="task_details_fault">
				<div class="task_details_title">
					<h2>故障描述<span>（可多选）</span></h2>
				</div>
				<div class="task_details_fault_box">
					<div class="task_details_fault_box_bq">
						<label :for="val" v-for="(val,index) in fault" :class="{ faultArctive:isArctive(wx_problem,val) }">
							<input type="checkbox" :id="val" :value="val" v-model="wx_problem" style="display:none;">
							<span>{{ val }}</span>
						</label>
						
					</div>
					<div class="task_details_fault_box_text">
						<div class="task_details_fault_box_top">
							<textarea name="" id="" cols="30" rows="10" placeholder="准确描述保修问题，以便更快让师傅解决问题" v-model="wx_remarks"></textarea>
						</div>
						<div class="task_details_fault_box_upload">
							<ul>
								<li v-for="(img,index) in files">
									<i @click="remove(index)">
										<img src="../../assets/task/icon_remove.png" alt="">
									</i>
									<img :src="img.src" alt="">
								</li>
							</ul>
							<div class="add_btn" @click="add" v-if="files.length < 1">
								<img src="../../assets/task/icon_add.png" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="task_details_info">
				<div class="task_details_info_input">
					<span class="name">上门联系人</span>
					<input type="text" placeholder="请填写上门联系人" v-model="wx_name">
				</div>
				<div class="task_details_info_input">
					<span class="name">联系人电话</span>
					<input type="text" placeholder="请填写联系人电话" v-model="wx_phone">
				</div>
				<div class="task_details_info_input" @click="toMap">
					<span class="name">维修地址</span>
					<input type="text" placeholder="点击选择" v-model="wx_local">
				</div>
				<div class="task_details_info_input">
					<span class="name">门牌号</span>
					<input type="text" placeholder="例：16号楼5层301室" v-model="wx_number">
				</div>
				
			</div>
		</div>
		<div class="tips">温馨提示：请保持电话畅通，方便维修师傅与您联系</div>
		<div class="details_btn" @click="getOrderInfo">
			<a href="javascript:void(0)">提交订单</a>
		</div>
		<input type="file" accept="image/*" @change="upload" ref="file" class="hide">
	</section>
</template>
<script>
	import { Header,Toast,Checklist  } from 'mint-ui';
	import Qs from 'qs'
	export default {
		data(){
			return {
				files: [], // 图片
				title:this.$route.query.title,
				wx_uid:"",// 用户ID
				wx_name:"", // 维修姓名
				wx_phone:"", // 维修手机号
				wx_local:"", // 维修地址
				wx_number:"", // 维修楼号
				wx_goods:"", // 维修物品
				wx_problem:[], // 维修故障问题
				wx_remarks:"", // 故障描述
				data:'', // 维修物品数据
				fault:"",	// 维修故障问题
				faultArctive:-1,
			}
		},
		methods:{
			backClick (){
				this.$router.go(-1);
			},
			add(){
				this.$refs.file.click();
			},
			// 默认获取物品
			initType () {
			  let vm = this;
		      let params = Qs.stringify({
		        option:vm.title,
		      })
		      vm.$http({
		        method: 'post',
		        url: '/lib/task_type.php',
		        data: params,
		        xhrFields: {
		          withCredentials: true
		        },
		      }).then(res =>{
		        console.log(res);
		        let url = 'http://127.0.0.1/lib/';
		        vm.data = res.data.data;
		      }, res => {
		      // 错误回调
		      })
			},
			// 物品事件
			getfault(val){
			  let vm = this;
			  vm.wx_goods  = val;
		      let params = Qs.stringify({
		        repair_name:val,
		      })
		      vm.$http({
		        method: 'post',
		        url: '/lib/task_type_fault.php',
		        data: params,
		        xhrFields: {
		          withCredentials: true
		        },
		      }).then(res =>{
		        vm.fault = res.data.data;
		      }, res => {
		      // 错误回调
		      })
			},
			upload(e){
		        const list = this.$refs.file.files;
		        if(this.files.length < 4){
		        	for (let i = 0; i < list.length; i++) {
	                    if (!this.isContain(list[i])) {
	                        const item = {
	                            name: list[i].name,
	                            size: list[i].size,
	                            file: list[i]
	                        }
	                        this.html5Reader(list[i], item);         
	                        this.files.push(item);
	                    }
	                }
		        }
                
		    },
		    // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
                this.files.forEach((item) => {
                    if(item.name === file.name && item.size === file.size) {
                        return true
                    }
                })
                return false
            },
            remove(index) {
                this.files.splice(index, 1);
            },
            isArctive(arr,value){
		        for(let i = 0; i < arr.length; i++){
		            if(value === arr[i]){
		                return true;
		            }
		        }
		        return false;
		    },
		    toMap(){
		    	this.$router.push({ path:'/task/details/map' })
		    },
		    // 提交订单
		    getOrderInfo(){
		    	let vm = this;
				if(vm.wx_goods == ''){
					let instance = Toast({
						message: '维修物品请选择',
						position: 'bottom',
						duration: 5000
					});
					setTimeout(() => {
						instance.close();
					}, 1400);
				}else if(vm.wx_problem == ''){
					let instance = Toast({
						message: '故障问题请选择',
						position: 'bottom',
						duration: 5000
					});
					setTimeout(() => {
						instance.close();
					}, 1400);
				}else if(vm.wx_remarks == ''){
					let instance = Toast({
						message: '故障详情描述请填写',
						position: 'bottom',
						duration: 5000
					});
					setTimeout(() => {
						instance.close();
					}, 1400);
				}else if(vm.wx_name == ''){
					let instance = Toast({
						message: '上门联系人请填写',
						position: 'bottom',
						duration: 5000
					});
					setTimeout(() => {
						instance.close();
					}, 1400);
				}else if(vm.wx_phone == ''){
					let instance = Toast({
						message: '上门联系电话请填写',
						position: 'bottom',
						duration: 5000
					});
					setTimeout(() => {
						instance.close();
					}, 1400);
				}else if(vm.wx_local == ''){
					let instance = Toast({
						message: '维修地址请选择',
						position: 'bottom',
						duration: 5000
					});
					setTimeout(() => {
						instance.close();
					}, 1400);
				}else if(vm.wx_number == ''){
					let instance = Toast({
						message: '门牌号请填写',
						position: 'bottom',
						duration: 5000
					});
					setTimeout(() => {
						instance.close();
					}, 1400);
				}else {
					let userInfo = JSON.parse(localStorage.getItem('userInfo'));
					let uid = userInfo.uid;
					let wx_problem = vm.wx_problem.join(',');

					let params = Qs.stringify({
						uid:uid,
						name:vm.wx_name,
						phone:vm.wx_phone,
						local:vm.wx_local,
						num:vm.wx_number,
						goods:vm.wx_goods,
						problem:wx_problem,
						remarks:vm.wx_remarks
					})
					vm.$http({
						method: 'post',
						url: '/lib/insert_order.php',
						data: params,
						xhrFields: {
							withCredentials: true
						},
					}).then(res =>{
						if(res.data.success == 1){
							let param = new FormData(); //创建form对象
							vm.files.forEach((item) => {
			                    param.append('file', item.file)
			                    param.append('uid', res.data.orderId)
			                    param.append('type', '0')
			                })
							vm.$http({
								method: 'post',
								url: '/lib/upload_img.php',
								data: param,
								xhrFields: {
									withCredentials: true
								},
							}).then(res =>{
								console.log(res);
							}, res => {
								// 错误回调
							})
						}
					}, res => {
						// 错误回调
					})
				}
		      
		      
		    }

		},
		mounted(){
			// 获取物品
			this.initType(); 
			// 获取用户ID
			
			
		},
		updated: function () {
			this.$nextTick(function () {
				if(sessionStorage.getItem('key_local')){
					// 获取地址
					var key_local = JSON.parse(sessionStorage.getItem('key_local'));
					this.wx_local = key_local.name;
				}
				
			})
		},
		compontents:{
			Header,
			Checklist,
			Toast
		}
	}
</script>
<style scoped>
	.task_details {
		width: 100%;
		height: 100%;
		background: #f6f6f6;

	}
	.task_details_goods {
		background: #fff;
		padding: .3rem;
	}
	.task_details_title h2 {
		font-size: 14px;
		color: #000;
		padding-bottom: .3rem;
	}
	.task_details_title h2  span {
		color: #999;
	}
	.task_details_goods_list ul li {
		width: 25%;
		text-align: center;
		float: left;
	}
	.task_details_fault {
		background: #fff;
		padding: .3rem;
		margin-top: .2rem;
	}
	.task_details_fault_box_bq label {
		display: inline-block;
		padding: .1rem .3rem;
		border:.01rem solid #999;
		border-radius: 1rem;
		margin-right: .1rem;
	}
	.task_details_info {
		background: #fff;
		padding: 0 .3rem;
		margin-top: .2rem;
	}
	.task_details_info_input {
		border-bottom: .01rem solid #ebebeb;
		padding: .2rem 0;
		font-size: 14px;
	}
	.task_details_info_input input {
		border:0;
		outline: none;
		float: right;
		text-align: right;
	}
	.tips {
		text-align: center;
		color: #999;
		font-size: 14px;
		padding: .2rem;
	}
	.details_btn a {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1rem;
		text-align: center;
		color: #fff;
		line-height: 1rem;
		background: #d43c33;
		display: block;
		font-size: 14px;
	}
	.task_details_fault_box_text {
		background: #f8f8f8;
		padding: .2rem;
		margin-top: .3rem;
	}
	.task_details_fault_box_top textarea {
		width: 100%;
		height: 2rem;
		padding: .2rem;
		border:0;
		outline: none;
		resize:none;
		background: #f8f8f8;
		border-bottom: .01rem solid #ebebeb;
	}
	.task_details_fault_box_upload {
		padding: .2rem 0;
	}
	.add_btn {
		width: 1.5rem;
		height: 1.5rem;
		border:.01rem dashed #ebebeb;
		position: relative;
		float: left;
		margin-left: .1rem;
	}
	.add_btn img{
		position: absolute;
	    margin: auto;
	    top: 0; 
	    left: 0; 
	    bottom: 0; 
	    right: 0;
	}
	.task_details_fault_box_upload ul {
		float: left;
	}
	.task_details_fault_box_upload ul li {
		width: 1.5rem;
		height: 1.5rem;
		float: left;
		margin-left: .1rem;
		position: relative;
		border:.01rem solid #ebebeb;
	}
	.task_details_fault_box_upload ul li img {
		width: 100%;
		height: 100%;
	}
	.task_details_fault_box_upload ul li i {
		position: relative;
		display: inline-block;
		width: .4rem;
		height: .4rem;
		position: absolute;
		right: 0;

	}
	.task_details_fault_box_upload ul li i img {
		width: 100%;
		height: 100%;
	
	}

	.hide {
		display: none;
	}
	.faultArctive {
		background: #d43c33;
		border-color: #d43c33 !important;
		color: #fff;
	}
</style>