<style type="text/css">
	.el-button+.el-button{
		margin-left: 0;
		margin-top: 5px;
	}
</style>
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					商家查询：
				</el-form-item>
				<el-form-item>
					<el-input v-model="keyWord" placeholder="输入关键字"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item class="clear-btn" >
					<img src="/static/img/delete.png"/> <span @click="clearKeyWords">清空查询条件</span>
				</el-form-item>
				<!--<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>-->
			</el-form>
		</el-col>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" v-on:click="addBuss">+新增商家</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="bsku" label="商家编码" width="160">
			</el-table-column>
			<el-table-column prop="companyname" label="商家名称" min-width="120">
			</el-table-column>
			<el-table-column prop="truename" label="联系人" width="100">
			</el-table-column>
			<el-table-column prop="mobile" label="联系方式" width="150">
			</el-table-column>
			<el-table-column prop="fulladdress" label="商家地址" min-width="180">
			</el-table-column>
			<el-table-column prop="create_time" label="入驻时间" width="170">
			</el-table-column>
			<el-table-column prop="cooperatestatus" label="合作状态" min-width="100" :formatter="formatState">
			</el-table-column>
			<el-table-column label="操作" width="80" class="add-padd">
				<template scope="scope">
					
					<el-button :type="scope.row.cooperatestatus == 1 ? 'danger':'success'" size="small" @click="handleDel(scope.$index, scope.row)">{{scope.row.cooperatestatus == 1 ? '停用':'启用'}}</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="primary" size="small" @click="bussDetailGo(scope.$index, scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove(1)" :disabled="this.sels.length===0">批量启用</el-button>
			<el-button type="danger" @click="batchRemove(2)" :disabled="this.sels.length===0">批量停用</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				keyWord:'',
				serverUrl:'https://ibe.lanzhisky.com'

			}
		},
		methods: {
			//新增商家
			addBuss:function(){
				this.$router.push('/addbuss');
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			//合作状态转换
			formatState:function(row, column){
				return row.cooperatestatus == 1 ? '合作' : row.cooperatestatus == 2 ? '停止合作' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//跳转商家详情
			bussDetailGo:function(index,row){
				sessionStorage.setItem('bussdet',JSON.stringify(row));
				this.$router.push('/bussdet');
			},
			//清空查询条件
			clearKeyWords:function(){
				console.log(123)
				this.keyWord = '';
				this.getUsers()
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
//				getUserListPage(para).then((res) => {
//					this.total = res.data.total;
//					this.users = res.data.users;
//					this.listLoading = false;
//					//NProgress.done();
//				});
				
				
				var _this = this;
				var params = new URLSearchParams();
				console.log(sessionStorage.user)
				params.append('token',JSON.parse(sessionStorage.user).token);
				params.append('keyWord',this.keyWord);
				
				this.$axios.post(this.serverUrl+"/sys/user/list", params)
			  	.then(function (res) {
				  	_this.logining = false;
				    if(res.data.msg == 'success'){
						_this.total = res.data.list.length;
						_this.users = res.data.list;
						_this.listLoading = false;
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
				    console.log(error);
			  	});
			},
			//删除
			handleDel: function (index, row) {
				var _this = this;
				var stype = row.cooperatestatus == 1 ? '停用' : '启用';
				this.$confirm('确认'+stype+'该商家吗?', '提示', {
					type: 'warning'
				}).then(() => {
					var params = new URLSearchParams();
					params.append('token',JSON.parse(sessionStorage.user).token);
					params.append('ids',row.id);
					var state = 0;
					if(row.cooperatestatus == 1){
						state = 2
					}else{
						state = 1
					}
					params.append('cooperatestatus',state);
					
					this.$axios.post(this.serverUrl+"/sys/user/updateStatus", params)
				  	.then(function (res) {
					  	_this.logining = false;
					    if(res.data.msg == 'success'){
							_this.$message({
					          message: '操作成功',
					          type: 'success'
					        });
					        _this.getUsers()
					    }else{
					    	_this.$message.error(res.data.msg);
					    }
				  	})
				  	.catch(function (error) {
					    console.log(error);
				  	});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function (val) {
				var _this = this;
				var state = val == 1 ? '启用' : '停用';
				
				var ids = this.sels.map(item => item.id).toString();
				
				this.$confirm('确认批量'+state+'选中商家吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					
					var params = new URLSearchParams();
					params.append('token',JSON.parse(sessionStorage.user).token);
					params.append('ids',ids);
					params.append('cooperatestatus',val);
					
					this.$axios.post(this.serverUrl+"/sys/user/updateStatus", params)
				  	.then(function (res) {
					  	_this.logining = false;
					    if(res.data.msg == 'success'){
							_this.$message({
					          message: '操作成功',
					          type: 'success'
					        });
					        _this.getUsers()
					    }else{
					    	_this.$message.error(res.data.msg);
					    }
				  	})
				  	.catch(function (error) {
					    console.log(error);
				  	});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
	.clear-btn{
		cursor: pointer;
	}
	.clear-btn img{
	    width: 16px;
    	transform: translateY(2px);
	}
</style>