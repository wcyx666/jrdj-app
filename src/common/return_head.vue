<template>
	<section class="return_head">
		<i></i>
		<h2 v-text="title"></h2>
	</section>
</template>
<script>
	export default {
		name:"return_head",
		props: {
			title:String
		},
		data(){
			return {
				title:"匠人登录"
			}
		}
	}
</script>
<style scoped>
	.return_head {
		width: 100%;
		height: 1rem;
		background: #d43c33;
		text-align: center;
		line-height: 1rem;
		font-size: 16px;
		color: #fff;
	}
</style>