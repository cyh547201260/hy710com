<style type="text/css">
	.map-box{
		width: 400px;
		height: 200px;
		background: pink;
	}
	.zhizhaoImgBox{
		width: 170px;
		height: 200px;
	}
	.zhizhaoImgBox img{
		width: 100%;
		height: 100%;
	}
	.img-box{
		width: 400px;
		height: 500px;
	}
</style>
<template>
	<el-form ref="form"  label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="商家名称" :rules="[{ required: true, message: ''}]">
			{{dataObj.companyname}}
		</el-form-item>
		<el-form-item label="联系人" :rules="[{ required: true, message: ''}]">
			{{dataObj.truename}}
		</el-form-item>
		<el-form-item label="联系方式" :rules="[{ required: true, message: ''}]">
			{{dataObj.mobile}}
		</el-form-item>
		<el-form-item label="合作状态" :rules="[{ required: true, message: ''}]">
			{{dataObj.cooperatestatus}}
		</el-form-item>
		<el-form-item label="店铺地址" :rules="[{ required: true, message: ''}]">
			{{dataObj.fulladdress}}
		</el-form-item>
		<el-form-item label="客服电话" :rules="[{ required: true, message: ''}]">
			{{dataObj.customermoble}}
		</el-form-item>
		<el-form-item label="营业执照" :rules="[{ required: true, message: ''}]">
			<div class="img-box">
				<img :src="serverUrl+'/'+dataObj.businesslicense"/>
			</div>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				dataObj:{},
				serverUrl:'https://ibe.lanzhisky.com'
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			//获取省
			getProvince:function(val = ''){
				var _this = this;
				this.$axios.get(this.serverUrl+"/app/citylist?parentid="+val)
			  	.then(function (res) {
				    if(res.data.msg == 'success'){
						if(val){
							_this.cityList = res.data.list
						}else{
							_this.provinceList = res.data.list
							
						}
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
				    console.log(error);
			  	});
			},
			//选择省，获取市
			getCity:function(){
				this.city = "";
				this.getProvince(this.province)
			},
			change:function(){
				console.log(123)
			},
			//选择城市
			chooseCity:function(){
				console.log(this.city)
			},
			//上传成功
			fileUpSuccess:function(response, file, fileList){
				this.businesslicense = response.path
			}
		},
		watch:{
			
		},
		created:function(){
			this.dataObj = JSON.parse(sessionStorage.bussdet);
			console.log(this.dataObj)
		},
		mounted:function(){
		}
	}

</script>