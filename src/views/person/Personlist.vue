<style type="text/css">
	 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-dialog__header{
  	text-align: left;
  }
  .el-form-item__content{
  	text-align: left;
  }
  .add-user .el-form-item{
  	margin-bottom: 5px;
  }
  .el-tree-class{
  	margin-top: 60px;
  }
</style>
<template>

<el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-tree class='el-tree-class' :data="firstDepList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
    	<el-row>
		  <el-button type="primary"  @click="dialogFormVisible = true">新增部门</el-button>
		  <el-button type="primary"  @click="depResetState = true">编辑部门</el-button>
		  <el-button type="primary" @click="addPersonState = true">新增人员</el-button>
		</el-row>
		<el-dialog title="新增部门" :visible.sync="dialogFormVisible">
		  <el-form>
		    <el-form-item label="部门名称" :label-width="formLabelWidth">
		      <el-input v-model="addDepName" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="父级部门" :label-width="formLabelWidth">
		      <el-select v-model="addDepFatherid" placeholder="请选择父级部门">
		        <el-option v-for='item in firstDepList' :label="item.dep_name" :value="item.dep_id"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addDepSub">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="编辑部门" :visible.sync="depResetState">
		   <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
		    <el-tree class='' :data="firstDepList" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick">
		    	<span class="custom-tree-node" slot-scope="{ node, data }">
		        <span>{{ node.label }}</span>
		        <span>
		          <el-button type="text" size="mini" @click="resetDepFun(data)">修改</el-button>
		          <el-button type="text" size="mini" @click="delDepFun(data)">删除</el-button>
		        </span>
		      </span>
		    </el-tree>
		  </el-aside>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="depResetState = false">取 消</el-button>
		    <el-button type="primary" @click="addDepSub">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="修改部门名称" class="add-user" :visible.sync="resetDepNameState">
		  <el-form>
		    <el-form-item label="部门名称"  :rules="[{ required: true, message: '部门名称不能为空'}]" :label-width="formLabelWidth">
		      <el-input v-model="resetDepName" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetDepNameState = false">取 消</el-button>
		    <el-button type="primary" @click="resetDepSub">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="新增人员" class="add-user" :visible.sync="addPersonState">
		  <el-form>
		    <el-form-item label="账号"  :rules="[{ required: true, message: '账号不能为空'}]" :label-width="formLabelWidth">
		      <el-input v-model="user_account" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空'}]" :label-width="formLabelWidth">
		      <el-input v-model="user_name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="性别" :rules="[{ required: true, message: '性别不能为空'}]" :label-width="formLabelWidth">
		      	<el-radio v-model="user_sex" label="1">男</el-radio>
  				<el-radio v-model="user_sex" label="2">女</el-radio>
		    </el-form-item>
	     	<el-form-item label="岗位" :label-width="formLabelWidth">
		      	<el-input v-model="user_post" autocomplete="off"></el-input>
		    </el-form-item>
	     	<el-form-item label="民族" :label-width="formLabelWidth">
		      	<el-input v-model="user_nation" autocomplete="off"></el-input>
		    </el-form-item>
	     	<el-form-item label="出生年月" :label-width="formLabelWidth">
		      	<el-input v-model="user_birth" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="联系电话一" :label-width="formLabelWidth">
		      	<el-input v-model="user_phone1" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="联系电话二" :label-width="formLabelWidth">
		      	<el-input v-model="user_phone2" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="家庭住址" :label-width="formLabelWidth">
		      	<el-input v-model="user_address" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="电子邮件" :label-width="formLabelWidth">
		      	<el-input v-model="user_email" autocomplete="off"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="所属部门" :rules="[{ required: true, message: '部门不能为空'}]"  :label-width="formLabelWidth">
		      <el-select v-model="chooseFDep" @change='addUserChooseDepF' placeholder="请选择一级部门">
		        <el-option v-for='item in firstDepList' :label="item.dep_name" :value="item.dep_id"></el-option>
		      </el-select>
		      <el-select v-if="chooseSecondDepList.length > 0" v-model="dep_id" placeholder="请选择二级部门">
		        <el-option v-for='item in chooseSecondDepList' :label="item.dep_name" :value="item.dep_id"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="职位权限"  :rules="[{ required: true, message: '权限不能为空'}]" :label-width="formLabelWidth">
		      <el-select v-model="user_auth"  placeholder="请选择权限">
		        <el-option v-for='(item,key) in authObj' :label="item" :value="key"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="addPersonState = false">取 消</el-button>
		    <el-button type="primary" @click="addUserSub">确 定</el-button>
		  </div>
		</el-dialog>
    </el-header>
    
    <el-main>
      <el-table :data="personData">
        <el-table-column prop="dep_id"  :formatter="depNameFormat" label="单位" width="140">
        </el-table-column>
        <el-table-column prop="user_name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="user_post" label="职务">
        </el-table-column>
        <el-table-column prop="user_sex" :formatter="sexFormat" label="性别">
        </el-table-column>
        <el-table-column prop="user_nation" label="民族">
        </el-table-column>
        <el-table-column prop="user_birth" label="出生年月">
        </el-table-column>
        <el-table-column prop="user_phone1" label="电话号码">
        </el-table-column>
        <el-table-column prop="user_logintime" width="140" label="最近登录时间">
        </el-table-column>
        <el-table-column prop="login_times" label="登录次数">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
	
  	import md5 from 'js-md5';
	export default {
		data() {
			const item = {
		        date: '2016-05-02',
		        name: '王小虎',
		        address: '上海市普陀区金沙江路 1518 弄'
		      };
		      return {
		      	serverUrl:'http://localhost:8081',
		      	token: JSON.parse(sessionStorage.user).token,
		        tableData: Array(20).fill(item),
		        dialogTableVisible:true,
		        dep_name:'',		//部门名称
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        
		        dialogTableVisible: false,
		        dialogFormVisible: false,
        		formLabelWidth: '120px',
        		firstDepList:[],
        		fullData:{},
        		chooseFDep:'',
        		chooseSecondDepList:[],		//添加人选择的二级部门
        		chooseSDep:'',
        		father_id:0,
        		addDepName:'',
        		addDepFatherid:'',
        		defaultProps: {
		          children: 'children',
		          label: 'dep_name'
		        },
		        addPersonState:false,
		        depResetState:false,
		        resetDepNameState:false,
		        //人员信息
		        user_name:'',
		        user_account:'',
		        user_password:'',
		        dep_id:'',
		        user_post:'',
		        user_sex:'1',
		        user_nation:'',
		        user_birth:'',
		        user_phone1:'',
		        user_phone2:'',
		        user_address:'',
		        user_auth:'',
		        authObj:{
//		        	'1000':'超级管理员',
		        	'100':'分支机构管理员',
		        	'10':'督查人',
		        	'15':'书记、副书记',
		        	'1':'承办人'
		        },
		        user_auth:'',
		        user_email:'',
		        personData:'',
		        simpDepList:'',
		        resetDepName:'',
		      }
		},
		methods: {
			depNameFormat:function(row, column){
//				if()
				return this.simpDepList[row.dep_id].dep_name
			},
			sexFormat:function(row, column){
//				if()
				return['','男','女'][row.user_sex]
			},
			onSubmit() {
				console.log('submit!');
			},
			 handleNodeClick(data) {
		        this.getUserList(data.dep_id)
	      	},
	      	//加人选择部门dep_id
	      	addUserChooseDepF:function(){
	      		this.dep_id = '';
	      		this.chooseSecondDepList = this.fullData[this.chooseFDep]['children'];
	      		if(this.chooseSecondDepList.length == 0){
	      			this.dep_id = this.fullData[this.chooseFDep]['dep_id'];
	      		}else{
	      			this.dep_id="";
	      		}
	      	},
	      	//新增人员
			addUserSub:function(){
				var _this = this;
				var params = new URLSearchParams();
					
				params.append('token',this.token);
				params.append('user_name',this.user_name);
				params.append('user_account',this.user_account);
				params.append('user_password',md5('123456'));
				params.append('dep_id',this.dep_id);
				params.append('user_post',this.user_post);
				params.append('user_sex',this.user_sex);
				params.append('user_nation',this.user_nation);
				params.append('user_birth',this.user_birth);
				params.append('user_phone1',this.user_phone1);
				params.append('user_phone2',this.user_phone2);
				params.append('user_address',this.user_address);
				params.append('user_email',this.user_email);
				params.append('user_auth',this.user_auth);
				params.append('user_auth',this.user_auth);
				
				this.logining = true;
				this.$axios.post(this.serverUrl+"/addUser", params).then(function (res) {
				  	_this.logining = false;
				    if(res.data.code == 1){
				    	_this.$message({
				          message: '新增成功',
				          type: 'success'
				        });
						_this.addDepName='';	
				    	_this.getDepList();
				    	_this.addPersonState = false
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
				
			},
			//修改部门名称
			resetDepFun:function(data){
				
//				this.resetDepName = 
				this.resetDepNameState = true;
			},
			//修改部门提交
			resetDepSub:function(){
				
			},
			//删除部门
			delDepFun:function(data){
				var _this = this;
				this.$confirm('此操作会删除此部门及部门下所有成员，确认删除吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	
		        	var params = new URLSearchParams();
					
					params.append('token',this.token);
					params.append('dep_id',data.dep_id);
					
					this.logining = true;
					this.$axios.post(this.serverUrl+"/deleteDepart", params).then(function (res) {
					  	_this.logining = false;
					    if(res.data.code == 1){
					    	_this.$message({
					          message: '操作成功',
					          type: 'success'
					        });
							_this.addDepName='';	
					    	_this.getDepList();
					    }else{
					    	_this.$message.error(res.data.msg);
					    }
				  	})
				  	.catch(function (error) {
				    	console.log(error);
				  	});
		        	
		        	
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(() => {
		        });
			},
			//新增部门
			addDepSub:function(){
				var _this = this;
				var params = new URLSearchParams();
					
				params.append('token',this.token);
				params.append('dep_name',this.addDepName);
				params.append('father_id',this.addDepFatherid);
				
				this.logining = true;
				this.$axios.post(this.serverUrl+"/addDepart", params).then(function (res) {
				  	_this.logining = false;
				    if(res.data.code == 1){
				    	_this.$message({
				          message: '新增成功',
				          type: 'success'
				        });
						_this.addDepName='';	
						_this.addDepFatherid = '';
				    	_this.getDepList();
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
				
				this.dialogFormVisible = false
			},
			//获取人员列表
			getUserList:function(depId = ''){
				var _this = this;
				this.$axios.get(this.serverUrl+"/getUserList?token="+this.token+'&dep_id='+depId)
			  	.then(function (res) {
				    if(res.data.code == 1){
						_this.personData = res.data.data
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
				    console.log(error);
			  	});
			},
			
			//获取部门列表
			getDepList:function(depId = ''){
				var _this = this;
				this.$axios.get(this.serverUrl+"/getDepartList?token="+this.token+'&father_id='+this.father_id)
			  	.then(function (res) {
				    if(res.data.code == 1){
						_this.firstDepList = res.data.data
						_this.fullData = res.data.fullData
						_this.simpDepList = res.data.simpData
						console.log(_this.firstDepList)
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
				    _this.getUserList()
			  	})
			  	.catch(function (error) {
				    console.log(error);
			  	});
			},
		},
		watch:{
			
		},
		created:function(){
//			this.dataObj = JSON.parse(sessionStorage.bussdet);
//			console.log(this.dataObj)
		},
		mounted:function(){
//			this.getProvince()
			this.getDepList()
		}
	}

</script>