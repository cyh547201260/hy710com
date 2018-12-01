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
	<el-form  label-width="80px" style="margin:20px;width:100%;min-width:600px;">
		<el-form :inline="true">
			<el-form-item>
				查询：
			</el-form-item>
			<el-form-item>
				<el-input v-model="keyWords" placeholder="输入手机或机构名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" v-on:click="getUsers">查询</el-button>
			</el-form-item>
		</el-form>		
		<el-tabs type="border-card" v-model='verifystatus'>
		  <el-tab-pane label="待审核" name="0">
		  	<el-table :data="users_0" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<el-table-column width="55">
				</el-table-column>
				<el-table-column prop="bsku" label="机构名称" min-width="160">
				</el-table-column>
				<el-table-column prop="companyname" label="客户电话" min-width="120">
				</el-table-column>
				<el-table-column prop="truename" label="申请时间" width="100">
				</el-table-column>
				<el-table-column prop="mobile" label="审核状态" width="150">
				</el-table-column>
				<el-table-column label="操作" width="180" class="add-padd">
					<template scope="scope">
						
						<el-button type="primary" @click="handleDel(scope.$index, scope.row)">通过审核</el-button>
						<el-button type="danger" @click="handleDel2(scope.$index, scope.row)">驳回审核</el-button>
						<el-button @click="bussDetailGo(scope.$index, scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		  </el-tab-pane>
		  <el-tab-pane label="未通过" name="2">
		  	<el-table :data="users_2" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<el-table-column width="55">
				</el-table-column>
				<el-table-column prop="bsku" label="机构名称" min-width="160">
				</el-table-column>
				<el-table-column prop="companyname" label="客户电话" min-width="120">
				</el-table-column>
				<el-table-column prop="truename" label="申请时间" width="100">
				</el-table-column>
				<el-table-column prop="mobile" label="审核状态" width="150">
				</el-table-column>
				<el-table-column label="操作" width="80" class="add-padd">
					<template scope="scope">
						
						<el-button :type="scope.row.cooperatestatus == 1 ? 'danger':'success'" size="small" @click="handleDel(scope.$index, scope.row)">{{scope.row.cooperatestatus == 1 ? '停用':'启用'}}</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="primary" size="small" @click="bussDetailGo(scope.$index, scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		  </el-tab-pane>
		  <el-tab-pane label="已通过" name="1">
		  	<el-table :data="users_1" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
				<el-table-column width="55">
				</el-table-column>
				<el-table-column prop="bsku" label="机构名称" min-width="160">
				</el-table-column>
				<el-table-column prop="companyname" label="客户电话" min-width="120">
				</el-table-column>
				<el-table-column prop="truename" label="申请时间" width="100">
				</el-table-column>
				<el-table-column prop="mobile" label="审核状态" width="150">
				</el-table-column>
				<el-table-column label="操作" width="80" class="add-padd">
					<template scope="scope">
						
						<el-button :type="scope.row.cooperatestatus == 1 ? 'danger':'success'" size="small" @click="handleDel(scope.$index, scope.row)">{{scope.row.cooperatestatus == 1 ? '停用':'启用'}}</el-button>
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="primary" size="small" @click="bussDetailGo(scope.$index, scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		  </el-tab-pane>
		</el-tabs>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				dataObj:{},
				serverUrl:'https://ibe.lanzhisky.com',
				verifystatus:'0',		// 0 待审核 1已通过 2未通过
				keyWords:'',
				listLoading: false,
				
				filters: {
					name: ''
				},
				users_0: [],
				users_2: [],
				users_1: [],
				total: 0,
				page: 1,
			}
		},
		methods: {
			//获取商家
			getUsers:function(val){
				var _this = this;
				var params = new URLSearchParams();
				params.append('token',JSON.parse(sessionStorage.user).token);
				params.append('keyWord',this.keyWords);
				params.append('verifystatus',this.verifystatus);
				
				this.$axios.post(this.serverUrl+"/sys/user/verifylist", params)
			  	.then(function (res) {
				  	_this.logining = false;
				    if(res.data.msg == 'success'){
						_this.total = res.data.list.length;
						if(_this.verifystatus == 0){
							_this.users_0 = res.data.list;
						}else if(_this.verifystatus == 1){
							_this.users_1 = res.data.list;
						}else{
							_this.users_2 = res.data.list;
						}
						
						_this.listLoading = false;
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
				    console.log(error);
			  	});
				
			},
			
			onSubmit() {
				console.log('submit!');
			},
			change:function(){
				console.log(123)
			},
			//选择城市
			chooseCity:function(){
				console.log(this.city)
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
		},
		watch:{
			verifystatus:function(){
				console.log(this.verifystatus)
			}
		},
		created:function(){
		},
		mounted:function(){
			this.getUsers()
		}
	}

</script>