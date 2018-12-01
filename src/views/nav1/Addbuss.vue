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
</style>
<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="商家名称" prop="name" :rules="[{ required: true, message: '商家名称不能为空'}]">
			<el-input v-model="form.companyname"></el-input>
		</el-form-item>
		<el-form-item label="联系人" :rules="[{ required: true, message: '联系人不能为空'}]">
			<el-input v-model="form.truename"></el-input>
		</el-form-item>
		
		<el-form-item label="联系方式" :rules="[{ required: true, message: '商家名称不能为空'}]">
			<el-input v-model="form.mobile"></el-input>
		</el-form-item>
		<el-form-item label="合作状态" :rules="[{ required: true, message: '合作状态不能为空'}]">
			<el-select v-model="form.cooperatestatus" @change="change" placeholder="请选择活动区域">
				<el-option label="启用" selected value="1"></el-option>
				<el-option label="停用" value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="店铺地址" :rules="[{ required: true, message: '店铺地址不能为空'}]">
			<el-select v-model="province" placeholder="请选择省" @change="getCity">
				<el-option :label="item.cityName" v-for="item in provinceList" :value="item.cityId"></el-option>
			</el-select>
			<el-select v-model="city" placeholder="请选择市" @change='chooseCity'>
				<el-option :label="item.cityName" v-for="item in cityList" :value='item.cityId'></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="">
			<el-input v-model="form.truename"></el-input>
		</el-form-item>
		<el-form-item label="">
			<div class="map-box" id="mapBox">
			
			</div>
		</el-form-item>
		<el-form-item label="详细地址">
			<el-input v-model="form.fulladdress"></el-input>
		</el-form-item>
		<el-form-item label="商圈选择" :rules="[{ required: true, message: '商圈不能为空'}]">
			<el-select v-model="tradeareaid" >
				<el-option :label="item.cityName" v-for="item in provinceList" :value="item.cityId"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="客服电话" :rules="[{ required: true, message: '客服电话不能为空'},{ type: 'number', message: '客服电话为纯数字'}]">
			<el-input v-model="form.customermoble"></el-input>
		</el-form-item>
		<el-form-item label="营业执照" :rules="[{ required: true, message: '营业执照不能为空'}]">
			<el-upload
			  class="upload-demo"
			  drag
			  :action="serverUrl+'/app/upload'"
			  :show-file-list="false"
			  :multiple='false' name="file" :on-success="fileUpSuccess" :auto-upload="true" limit="1">
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<div class="zhizhaoImgBox" v-if="businesslicense">
				<img :src="serverUrl+'/'+businesslicense"/>
			</div>
		</el-form-item>
		
		<el-form-item>
			<el-button type="primary">保存</el-button>
			<el-button @click.native.prevent>关闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
//					name: '',
//					region: '',
//					date1: '',
//					date2: '',
//					delivery: false,
//					type: [],
//					resource: '',
//					desc: ''
					companyname:'',
					truename:'',
					mobile:'',
					cooperatestatus:'1',
					companyaddress:'',
					fulladdress:'',
					tradeareaid:'',
					businesslicense:'',
					customermoble:'',
					id:'',
					province:'',	//省
					city:'',		//市
				},
				tradeareaid:'',
				province:'',
				city:'',
				serverUrl:'https://ibe.lanzhisky.com',
				provinceList:[],
				cityList:[],
				businesslicense:''
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
				this.init()
			},
			//上传成功
			fileUpSuccess:function(response, file, fileList){
				this.businesslicense = response.path
			},
			//初始化地图
			init:function(){
				var mapinit = function(){
					console.log(12123)
										 //设置地图中心点
					  var myLatlng = new qq.maps.LatLng(39.916527,116.397128);
					  //定义工厂模式函数
					  var myOptions = {
					    zoom: 8,               //设置地图缩放级别
					    center: myLatlng,      //设置中心点样式
					    mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
					  }
					  //获取dom元素添加地图信息
					  var map = new qq.maps.Map(document.getElementById("container"), myOptions);
				}
				
				
		  	 	//创建script标签
				  var script = document.createElement("script");
				  //设置标签的type属性
				  script.type = "text/javascript";
				  //设置标签的链接地址
				  script.src = "https://map.qq.com/api/js?v=2.exp&key=LN7BZ-VFMA4-X37UR-X7LQ2-H5L2K-PABWV&callback=mapinit";
				  //添加标签到dom
				  document.body.appendChild(script);
			}
		},
		watch:{
			
		},
		mounted:function(){
			this.getProvince()
			this.init()
		}
	}

</script>