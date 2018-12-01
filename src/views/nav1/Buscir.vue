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
	 .custom-tree-node {
	    flex: 1;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    font-size: 14px;
	    padding-right: 8px;
	  }
</style>
<template>
	<el-form  label-width="80px" style="margin:20px;width:60%;min-width:600px;">
		<!--<el-tree
		  :data="provinceList"
		  node-key="cityId"
		  :load="loadNode1"
		  lazy
		  :expand-on-click-node="false"
		  >
		  <span class="custom-tree-node" slot-scope="{ node, data }">
	        <span>{{ node.label }}</span>
	        <span>
	          <el-button
	            type="text"
	            size="mini"
	            @click="">
	            Append
	          </el-button>
	          <el-button
	            type="text"
	            size="mini"
	            @click="">
	            Delete
	          </el-button>
	        </span>
	      </span>
		</el-tree>-->
		 <el-tree
		      :data="data5"
		      show-checkbox
		      node-key="id"
		      default-expand-all
		      :expand-on-click-node="false">
		      <span class="custom-tree-node" slot-scope="{ node, data }">
		        <span>{{ node.label }}</span>
		        <span>
		          <el-button
		            type="text"
		            size="mini"
		            @click="() => append(data)">
		            Append
		          </el-button>
		          <el-button
		            type="text"
		            size="mini"
		            @click="() => remove(node, data)">
		            Delete
		          </el-button>
		        </span>
		      </span>
		    </el-tree>
		
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				dataObj:{},
				serverUrl:'https://ibe.lanzhisky.com',
				cityList:[],
				provinceList:[],
			 	props1: [{
		          label: 'name',
		          children: 'zones',
		          isLeaf: 'leaf'
		        },{
		          label: 'name',
		          children: 'zones',
		          isLeaf: 'leaf'
		        }],
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
						
						var obj = [];
						var dataobj = res.data.list;
						for(var i  = 0; i < dataobj.length; i++){
							var inobj = {};
							inobj.label = dataobj[i].cityName;
							inobj.id = dataobj[i].cityId;
							inobj.children = 'zones';
							inobj.isLeaf = 'leaf'
							obj.push(inobj)
						}
							
						if(val){
							_this.cityList = obj
							
							
						}else{
							_this.provinceList = obj
							
						}
						console.log(_this.provinceList)
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
			},
			loadNode1(node, resolve) {
				var _this = this;
		        if (node.level === 0) {
		        	
		          return resolve([{ name: 'region' }]);
		        }
		        if (node.level > 1) return resolve([]);
				
					var cpid = node.data.id;
					this.getProvince(cpid);
					
			        setTimeout(() => {
			        	resolve(_this.cityList);
			        }, 500);
	      	},
		},
		watch:{
			
		},
		created:function(){
			this.dataObj = JSON.parse(sessionStorage.bussdet);
			console.log(this.dataObj)
		},
		mounted:function(){
			this.getProvince()
		}
	}

</script>