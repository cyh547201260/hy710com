
<template>
	<section>
		<el-container style=" height: 800px;border: 1px solid #eee">
		  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
		    <el-menu
		      default-active="1"
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose">
		      <el-menu-item index="" style='background: #eee;height: 60px;'>
		        <span slot="title" class="menu-title-name">县委办公室</span>
		      </el-menu-item>
		      <el-menu-item @click="matterStateTypeBtn('')" index="1">
		        <span slot="title">全部事项 ({{lenObj['all']}})</span>
		      </el-menu-item>
		      <el-menu-item @click="matterStateTypeBtn(1)" index="2">
		        <span slot="title">进行中列表 ({{lenObj['1']}})</span>
		      </el-menu-item>
		      <el-menu-item @click="matterStateTypeBtn(2)" index="3">
		        <span slot="title">已完成列表 ({{lenObj['2']}})</span>
		      </el-menu-item>
		      <el-menu-item @click="matterStateTypeBtn(3)" index="4">
		        <span slot="title">超期列表 ({{lenObj['3']}})</span>
		      </el-menu-item>
		      <el-menu-item @click="matterStateTypeBtn(4)" index="5">
		        <span slot="title">拟交办列表 ({{lenObj['4']}})</span>
		      </el-menu-item>
		      <el-menu-item  @click="matterStateTypeBtn(5)" index="6">
		        <span slot="title">历次督办事项台账</span>
		      </el-menu-item>
		    </el-menu>
		  </el-col>
		  </el-aside>
		  
		  <el-container>
		    <el-header style="text-align: left; font-size: 12px">
		    	<el-button @click='openNewForm'>新建</el-button>
		    	<el-button @click="dealMatter" v-if='chooseMatterState == 4'>交办</el-button>
		    	<!--<el-button  v-if='chooseMatterState == 4'>办结销号</el-button>-->
		    	<el-button  v-if='chooseMatterState == 4'>编辑</el-button>
		    	<el-button  v-if='chooseMatterState == 4' @click="deleteMatters">删除</el-button>
		    	<!--<el-button>更多</el-button>-->
		    </el-header>
		    
		    <el-main>
		    	<div class="matter-list-title">
		    		2018年县委办公室承办事项工作台帐
		    	</div>
		      <el-table  @selection-change="handleSelectionChange"  :data="tableData">
		      	<el-table-column
			      type="selection" 
			      width="55">
			    </el-table-column>
		        <el-table-column prop="matter_depid" label="序号" width="80" sortable>
		        </el-table-column>
		        <el-table-column prop="matter_title" label="文件标题及文号" sortable width="160">
		        </el-table-column>
		        <el-table-column prop="matter_from" label="任务事项来源" sortable width="160">
		        </el-table-column>
		        <el-table-column prop="matter_task" label="工作任务" sortable min-width="120">
		        </el-table-column>
		        <el-table-column prop="user_name" label="责任领导" sortable width="120">
		        </el-table-column>
		        <el-table-column prop="matter_deltime" label="交办时间" sortable width="120">
		        </el-table-column>
		        <el-table-column prop="complete_timelimit" label="完成时限" sortable width="120">
		        </el-table-column>
		        <el-table-column prop="respon_depuer" label="责任人" sortable width="120">
		        </el-table-column>
		        <el-table-column prop="deal_result" label="办理结果" sortable width="120">
		        </el-table-column>
		        <el-table-column prop="matter_state" label="" sortable width="120">
			        <template slot="header" slot-scope="slot">
				        <p class="class_p">警示灯</p>
				        <p class="class_p"><span class="state_point state_point_3"></span>已超期</p>
				        <p class="class_p"><span class="state_point state_point_1"></span>进行中</p>
			         	<p class="class_p"><span class="state_point state_point_2"></span>已完成</p>
			      	</template>
		        	<template slot-scope="scope">
		        		<span :class="'state_point state_point_'+scope.row.matter_state"></span>
		        	</template>
		        </el-table-column>
		        <el-table-column prop="" label="操作" width="120">
		        	<template slot-scope="scope">
				        <p class="matter_check">[查看]</p>
			      	</template>
		        </el-table-column>
		      </el-table>
		    </el-main>
		     <el-footer>
		     	<el-col :span="24" class="toolbar">
					<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;"></el-pagination>
				</el-col>
		     </el-footer>
		  </el-container>
		</el-container>
		
		
		<el-dialog title="提交" :visible.sync="newFormState" width="80%" top="7vh">
		  <el-form :model="matterData" size="mini">
		    <el-form-item label="序号" label-width="150px" :rules="[{required: true, message: ''}]">
		      <el-input v-model="matterData.matter_depid" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="是否涉密" label-width="150px" :rules="[{required: true, message: ''}]">
		      <el-select v-model="matterData.matter_issecret" placeholder="请选择">
		      	<el-option label="请选择" value=""></el-option>
		        <el-option label="非涉密" value="1"></el-option>
		        <el-option label="涉密" value="2"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="文件标题及文号" label-width="150px">
		      <el-input v-model="matterData.matter_title" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="任务事项来源" label-width="150px" :rules="[{required: true, message: ''}]">
		      <el-input v-model="matterData.matter_from" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="工作任务" label-width="150px" :rules="[{required: true, message: ''}]">
		      <el-input v-model="matterData.matter_task" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="交办时间" label-width="150px" :rules="[{required: true, message: ''}]">
		      	<el-date-picker v-model="matterData.matter_deltime" type="date" placeholder="选择日期"></el-date-picker>
		    </el-form-item>
		    <el-form-item label="完成时间" label-width="150px" :rules="[{required: true, message: ''}]">
		    	<el-select v-model="matterData.matter_deldep" placeholder="请选择">
			      	<el-option label="自定义日期" value=""></el-option>
			        <el-option label="一般事项(7天之内办结)" value="1"></el-option>
			        <el-option label="复杂事项(一个月内有结果)" value="2"></el-option>
		      	</el-select>
		      	<el-date-picker v-model="matterData.complete_timelimit" type="date" :readonly="compDataReadonly" placeholder="选择日期"></el-date-picker>
		    </el-form-item>
		    <el-form-item label="责任领导" label-width="150px" :rules="[{required: true, message: ''}]">
		      <el-input @focus="responDepidFocus(1)" v-model="respon_depid_user[0].user_name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="责任人" label-width="150px" :rules="[{required: true, message: ''}]">
		      <el-input v-model="matterData.respon_depuer" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="办理结果" label-width="150px" >
		      	<el-input
				  type="textarea"
				  :rows="5"
				  placeholder="请输入办理结果"
				  v-model="matterData.deal_result">
				</el-input>
		    </el-form-item>
		  </el-form>
		  <div class="report-class-box">
		  	<el-form  size="mini">
			  	<el-form-item>
				  	<div class="report-box-titie">
				  		<el-radio v-model="radioVal" label="1">阶段汇报</el-radio>
				  	</div>
			  	</el-form-item>
			  	<el-form-item label="周期" label-width="70px">
			    	<el-select v-model="reportType" placeholder="请选择">
				      	<el-option label="自定义" value=""></el-option>
				        <el-option label="月" value="1"></el-option>
				        <el-option label="季" value="2"></el-option>
				        <el-option label="年" value="3"></el-option>
			      	</el-select>
			      	<el-button v-if="reportType == ''" @click='addReportItem'>增加阶段</el-button>
			    </el-form-item>
			    <el-form-item>
			    	<el-table :data="reportTimeData" :empty-text="''">
				        <el-table-column prop="stage_name" label="阶段" width="200">
			        	 	<template slot-scope="scope">
					        	<el-input v-model="scope.row.stage_name" placeholder="请输入内容"></el-input>
					      	</template>
				        </el-table-column>
				        <el-table-column prop="stage_require" label="阶段要求" min-width="120">
				        	<template slot-scope="scope">
					        	<el-input v-model="scope.row.stage_require" placeholder="请输入内容"></el-input>
					      	</template>
				        </el-table-column>
				        <el-table-column prop="end_time" label="截止时间" width='200'>
				        	<template slot-scope="scope">
				        	 	<el-date-picker
			        	 			size="small"
							      	v-model="scope.row.end_time"
							      	type="date"
							      	placeholder="选择日期">
							    </el-date-picker>
				        	</template>
				        </el-table-column>
				        <el-table-column prop="address" label="操作" width="100">
				        	<template slot-scope="scope">
				        		<el-button @click="deleteReportItem(scope)">删除</el-button>
				        	</template>
				        </el-table-column>
			      	</el-table>
		      	</el-form-item>
      		</el-form>
		  </div>
		  
		  
		  <div class="report-class-box">
		  	<el-form size="mini">
			  	<el-form-item label="文件" label-width="70px" >
				  <el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  multiple
					  :show-file-list="true"
					  :limit="3"
					  :on-exceed="handleExceed"
					  >
					  <el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
			  	</el-form-item>
			</el-form>
		  </div>
		  
		  	<el-form size="mini">
			  	<el-form-item label="督办人" label-width="150px" :rules="[{required: true, message: ''}]">
			      <el-input @focus="responDepidFocus(2)" v-model="sup_user_user[0].user_name" autocomplete="off"></el-input>
			    </el-form-item>
			  	<el-form-item label="评价人" label-width="150px">
			      <el-input v-model="matterData.eval_user" autocomplete="off"></el-input>
			    </el-form-item>
			</el-form>
			
			
			<el-dialog
		      width="800px"
		      class='inner-popup-small'
		      title="选择责任领导"
		      :visible.sync="innerVisible"
		      append-to-body>
		      <div class="choose-person-box">
		      	<div class="person-left">
		      		<!--<el-input v-model="matterData.sup_user" placeholder="输入查询" autocomplete="off">
		      			<i slot="prefix" @click="inputPersonSearch" class="el-input__icon el-icon-search"></i>
		      		</el-input>-->
		      		<div class="dep-list-box">
		      			<el-tree :data="depData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		      		</div>
		      		<div class="person-list-box">
		      			<div class="person-head-block"></div>
		      			<div class="person-box">
		      				<p v-for="item in depPersonData" v-text="item.user_name" @click="depPersonChoose(item)"></p>
		      			</div>
		      		</div>
		      	</div>
		      	<div class="mind-box">
		      		<div class="btn-box" style="margin-top: 200px;">
		      			<div class="btn-box-item" style="margin-bottom: 5px;">
		      				<i class="el-icon-arrow-right"></i>
		      			</div>
		      			<div class="btn-box-item">
		      				<i class="el-icon-arrow-left"></i>
		      			</div>
		      		</div>
		      	</div>
		      	<div class="person-right">
		      		<div class="person-choose-head">
		      			<span>已选</span>
		      			<span class="clear-person-btn" @click="clearChoosePer">清空</span>
		      		</div>
		      		<div class="person-choosed">
		      			<p v-for='item in respon_depid_user' v-text="item.user_name"></p>
		      		</div>
		      	</div>
		      </div>
		      <div slot="footer" class="dialog-footer">
			    <el-button @click="innerVisible = true;">取 消</el-button>
			    <el-button type="primary" @click="chooseDepPersonSub">确 定</el-button>
			  </div>
		    </el-dialog>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="newFormState = false">取 消</el-button>
		    <el-button type="primary" @click="confirmSubMatter">确 定</el-button>
		  </div>
		</el-dialog>

	</section>
</template>

<script>
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
		      	tableData: [],
		      	total:10,
		      	newFormState:false,
		      	matterData:{
		      		matter_id:'',	//事项id
		      		matter_depid:'1',	//事项序号
		      		matter_issecret:'',	//是否涉密
		      		matter_title:'',	//文件标题及文号
		      		matter_from:'',		//任务事项来源
		      		matter_task:'',		//工作任务
		      		matter_deltime:'',	//交办时间
		      		matter_deldep:'',	//完成时间类型
		      		complete_timelimit:'',	//完成时间
		      		respon_depid:'',		//责任领导
		      		respon_depuer:'',		//责任人
		      		deal_result:'',			//办理结果
		      		
		      		matter_file:'',			//文件
		      		sup_user:'',			//督办人
		      		eval_user:'',			//评价人
		      		
		      		
		      	},
		      	compDataReadonly:false,
		      	radioVal:1,
		      	reportType:'',
		      	reportTimeData:[],
		      	innerVisible:false,
		      	depData:[],
		      	defaultProps: {
		          children: 'children',
		          label: 'dep_name',
		          depid:'dep_id'
		       },
		       depPersonData:[],
		       respon_depid_user:[{user_name:''}],
		       sup_user_user:[{user_name:''}],
		       cuurentChooseType:1,
		       chooseMatterState:'',
		       chooseDepId:'',
		       mutiChooseMatters:[],
		       lenObj:{
		       	'all':0,
		       	'1':0,
		       	'2':0,
		       	'3':0,
		       	'4':0,
		       }
		      }
		},
		methods: {
			 handleRemove(file, fileList) {
		        console.log(file, fileList);
		      },
		      handlePreview(file) {
		        console.log(file);
		      },
		      handleExceed(files, fileList) {
		        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		      },
		      beforeRemove(file, fileList) {
		        return this.$confirm(`确定移除 ${ file.name }？`);
		      },
			openNewForm:function(){
				this.newFormState = true;
			},
			handleOpen:function(){
				
			},
			handleClose:function(){
				
			},
			handleCurrentChange:function(){
				
			},
			//确定提交事项
			confirmSubMatter:function(){
				console.log(this.matterData.complete_timelimit)
				
				var _this = this;
				var params = new URLSearchParams();
				
				var timelimitDateObj = new Date(Date.parse(new Date(this.matterData.complete_timelimit)));
				var deltimeDateObj = new Date(Date.parse(new Date(this.matterData.matter_deltime)));
				
				this.matterData.complete_timelimit = timelimitDateObj.getFullYear()+'-'+(timelimitDateObj.getMonth()+1)+'-'+timelimitDateObj.getDate();
				this.matterData.matter_deltime = deltimeDateObj.getFullYear()+'-'+(deltimeDateObj.getMonth()+1)+'-'+deltimeDateObj.getDate();
				
				params.append('token',this.token);
				params.append('matter_id',this.matterData.matter_id);
				params.append('matter_depid',this.matterData.matter_depid);
				params.append('matter_issecret',this.matterData.matter_issecret);
				params.append('matter_title',this.matterData.matter_title);
				params.append('matter_from',this.matterData.matter_from);
				params.append('matter_task',this.matterData.matter_task);
				params.append('matter_deltime',this.matterData.matter_deltime);
				params.append('matter_deldep',this.matterData.matter_deldep);
				params.append('complete_timelimit',this.matterData.complete_timelimit);
				params.append('respon_depid',this.matterData.respon_depid);
				params.append('respon_depuer',this.matterData.respon_depuer);
				params.append('deal_result',this.matterData.deal_result);
				params.append('matter_file',this.matterData.matter_file);
				params.append('sup_user',this.matterData.sup_user);
				params.append('eval_user',this.matterData.eval_user);
				params.append('reportType',this.reportType);
				params.append('reportTimeData', JSON.stringify(this.reportTimeData));
				
				this.logining = true;
				this.$axios.post(this.serverUrl+"/addMatter", params).then(function (res) {
				  	_this.logining = false;
				    if(res.data.code == 1){
				    	_this.$message({
				          message: '新增成功',
				          type: 'success'
				        });
				        _this.getMatterList()
				    	_this.newFormState = false
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
				
			
				
				
			},
			//删除汇报项
			deleteReportItem:function(data){
				var delIndex = data.$index;
				this.reportTimeData.splice(delIndex,1);
			},
			//增加汇报项
			addReportItem:function(){
				var dateObj = new Date();
				var year = dateObj.getFullYear();
				var month = dateObj.getMonth()+1;
				var obj={
		      		stage_name:'',
		      		stage_require: '',
		      		end_time:year+'-'+month+'-25'
	      		}
				this.reportTimeData.push(obj);
			},
			//汇报周期类型改变
			reportTypeChange:function(){
				this.reportTimeData = [];
				var monthObj = ['','一','二','三','四','五','六','七','八','九','十','十一','十二']
				if(this.reportType == ''){
					this.reportTimeData = [];
				}else if(this.reportType == 1){
					var dateObj = new Date();
					var year = dateObj.getFullYear();
					for(var i = 1; i <= 12; i++){
						var obj={
				      		stage_name:monthObj[i]+'月',
				      		stage_require: '',
				      		end_time:year+'-'+i+'-25'
			      		}
						this.reportTimeData.push(obj);
					}
				}else if(this.reportType == 2){
					var dateObj = new Date();
					var year = dateObj.getFullYear();
					for(var i = 1; i <= 4; i++){
						var obj={
				      		stage_name:monthObj[i]+'季度',
				      		stage_require: '',
				      		end_time:year+'-'+(i*3)+'-25'
			      		}
						this.reportTimeData.push(obj);
					}
				}else if(this.reportType == 3){
					var dateObj = new Date();
					var year = dateObj.getFullYear();
					var obj={
			      		stage_name:year+'年',
			      		stage_require: '',
			      		end_time:year+'-12-25'
		      		}
						this.reportTimeData.push(obj);
				}
			},
			//完成时间类型变更
			timelimtChange:function(){
				if(this.matterData.matter_deldep == ''){
					this.$set(this.matterData,'complete_timelimit','')
				}else if(this.matterData.matter_deldep == '1'){
					var dateObj = Date.parse(new Date());
					var addTime = 60*60*24*7*1000;
					var addResult = dateObj+addTime;
					var resultObj = new Date(addResult);
					var year = resultObj.getFullYear();
					var month = resultObj.getMonth()+1;
					var day = resultObj.getDate();
					
					this.$set(this.matterData,'complete_timelimit',year+'-'+month+'-'+day);
				}else if(this.matterData.matter_deldep == '2'){
					var dateObj = Date.parse(new Date());
					var addTime = 60*60*24*30*1000;
					var addResult = dateObj+addTime;
					var resultObj = new Date(addResult);
					var year = resultObj.getFullYear();
					var month = resultObj.getMonth()+1;
					var day = resultObj.getDate();
					
					this.$set(this.matterData,'complete_timelimit',year+'-'+month+'-'+day);
				}
			},
			//获取部门列表
			getDepList:function(){
				var _this = this;
				this.$axios.get(this.serverUrl+"/getDepartList?token="+this.token).then(function (res) {
				  	_this.logining = false;
				    if(res.data.code == 1){
				    	var obj = res.data.fullData;
				    	for(var i in obj){
				    		_this.depData.push(obj[i])	
				    	}
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
				
			},
			//部门树点击
			handleNodeClick:function(data,cnode,nodeObj){
				var level = cnode.level;
				if(level > 1){
					var depId = data.dep_id;
					this.getPersonListByDep(depId);
				}
				
				
			},
			//根据部门Id获取人员列表
			getPersonListByDep:function(dpid){
				var _this = this;
				this.$axios.get(this.serverUrl+"/getUserList?token="+this.token+"&dep_id="+dpid).then(function (res) {
				  	_this.logining = false;
				    if(res.data.code == 1){
				    	_this.depPersonData = res.data.data;
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
			},
			//选择人
			depPersonChoose:function(person){
				
				console.log(this.respon_depid_user)
				
				if(this.cuurentChooseType == 1){
					this.$set(this.respon_depid_user,0,person)
					this.$set(this.matterData,'respon_depid',person.user_id)
				}else{
					this.$set(this.sup_user_user,0,person)
					this.$set(this.matterData,'sup_user',person.user_id)
				}
				console.log(this.matterData)
			},
			//搜索人
			inputPersonSearch:function(){
				console.log(123)
			},
			//清楚选择的人
			clearChoosePer:function(){
				if(this.cuurentChooseType == 1){
					this.respon_depid_user = [{user_name:''}];
					this.matterData.respon_depid = '';
				}else{
					this.sup_user_user = [{user_name:''}];
					this.matterData.sup_user = '';
				}
				console.log(234)
			},
			//责任人输入框聚焦
			responDepidFocus:function(type){
				this.innerVisible = true;
				this.cuurentChooseType = type;
			},
			//取消选择人
			
			//确定选择人
			chooseDepPersonSub:function(){
				this.innerVisible = false;
			},
			//点击事项分类
			matterStateTypeBtn:function(type){
				this.chooseMatterState = type;
				this.getMatterList();
			},
			//获取事项列表
			getMatterList:function(dpid = ''){
				var _this = this;
				var dep_id = this.chooseDepId ? this.chooseDepId : '';
				var matter_state = this.chooseMatterState ? this.chooseMatterState : '';
				this.$axios.get(this.serverUrl+"/getMatterList?token="+this.token+"&dep_id="+dep_id+'&matter_state='+matter_state).then(function (res) {
				  	_this.logining = false;
				    if(res.data.code == 1){
				    	_this.tableData = res.data.list;
				    	if(!matter_state){
				    		var reLenObj = res.data.lenResult
				    		_this.lenObj['all'] = 0;
				    		for(var i = 1; i < 5; i++){
				    			if(i < 4){
				    				var relen = Number(_this.lenObj['all']);
				    				relen = relen + reLenObj[i];
				    				_this.lenObj['all'] = relen;
				    			}
				    			
				    			_this.lenObj[i] = reLenObj[i];
				    		}
				    	}
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
			    	console.log(error);
			  	});
			},
			//多选事项
			handleSelectionChange:function(val){
				this.mutiChooseMatters = val;
			},
			//交办事项
			dealMatter:function(){
				var _this = this;
				
				this.$confirm('确定交办此事项？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
	        	 	var matterIds = '';
					for(var i = 0; i < this.mutiChooseMatters.length; i++){
						if(i == this.mutiChooseMatters.length - 1){
							matterIds += this.mutiChooseMatters[i].matter_id
						}else{
							matterIds += this.mutiChooseMatters[i].matter_id+','
						}
					}
					this.$axios.get(this.serverUrl+"/dealMatter?token="+this.token+"&matterIds="+matterIds).then(function (res) {
					  	_this.logining = false;
					    if(res.data.code == 1){
					    	 _this.$message({
					            type: 'success',
					            message: '交办成功!'
					          });
					          _this.getMatterList();
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
			//删除事项
			deleteMatters:function(){
				var _this = this;
				
				this.$confirm('确定删除此事项？', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
	        	 	var matterIds = '';
					for(var i = 0; i < this.mutiChooseMatters.length; i++){
						if(i == this.mutiChooseMatters.length - 1){
							matterIds += this.mutiChooseMatters[i].matter_id
						}else{
							matterIds += this.mutiChooseMatters[i].matter_id+','
						}
					}
					
					
					this.$axios.get(this.serverUrl+"/deleteMatter?token="+this.token+"&matterIds="+matterIds).then(function (res) {
					  	_this.logining = false;
					    if(res.data.code == 1){
					    	 _this.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
					          _this.getMatterList();
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
		},
		watch:{
			reportType:function(){
				this.reportTypeChange()
			},
			'matterData.matter_deldep':function(){
				this.timelimtChange()
			},
			respon_depid:function(){
				console.log(this.matterData.respon_depid)
			},
			'matterData.complete_timelimit':function(){
				console.log(this.matterData.complete_timelimit)
			},
			chooseMatterState:function(){
				console.log(this.chooseMatterState)
			}
		},
		created:function(){
//			this.dataObj = JSON.parse(sessionStorage.bussdet);
//			console.log(this.dataObj)
		},
		mounted:function(){
//			this.getProvince()
			this.getDepList();
			this.getMatterList();
			console.log(this.reportTimeData)
		}
	
	}

</script>

<style>
	.report-box-titie{
		border-bottom: 1px solid #efefef;
		padding: 10px;
		margin-top: 20px;
	}
	
	.report-class-box{
		padding: 0 30px;
	}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .menu-title-name{
  	font-size: 18px;
  	font-weight: bold;
  }
  .el-dialog {
    position: relative;
    margin: 0 auto;
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    height: 90vh !important;
    width: 70%;
  }
  .el-dialog__body{
  	height: 70vh !important;
    overflow-y: scroll !important;
    padding: 15px;
  }
  .el-dialog__header{
  	border-bottom: 1px solid #D9D9D9;
  }
  .el-dialog__footer{
  	border-top: 1px solid #D9D9D9;
  }
  .cell .el-date-editor.el-input, .el-date-editor.el-input__inner{
  	width: 100%;
  }
  .inner-popup-small .el-dialog{
  	height: inherit !important;
  }
  .inner-popup-small .el-dialog__body{
  	height: initial !important;
  	overflow: hidden !important;
  }
  .choose-person-box{
  	display: flex;
  	display: -webkit-flex;
  }
  .person-left{
	flex: 1;
	-webkit-flex: 1;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
  }
  .person-right{
	flex: 1;
	-webkit-flex: 1;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
  }
  .dep-list-box{
  	height: 220px;
  	border: 1px solid #ddd;
  	margin-top: 3px;
  	overflow-y: scroll;
  }
  .person-list-box{
  	height: 180px;
  	border: 1px solid #ddd;
  	margin-top: 3px;
  }
  .person-head-block{
  	background: #ccc;
  	height: 30px;
  	border-bottom: 1px solid #ddd;
  }
  .person-box,.person-choosed{
  	padding: 5 10px;
  }
  .person-box{
  	overflow-y: scroll;
  	height: 150px;
  }
  .person-choosed{
  	overflow-y: scroll;
  	overflow-x: hidden;
  	margin-top: 10px;
  	height: 400px;
  }
  .inner-popup-small .el-input--prefix .el-input__inner{
  	padding-left: 10px !important;
  	padding-right: 30px !important;
  }
  .person-box p,.person-choosed p{
  	margin: 0;
  	line-height: 1.5;
  	cursor: pointer;
  }
  .person-choosed{
  	border: 1px solid #ddd;
  	border-radius: 5px;
  }
  .person-box p:active,.person-choosed p:active{
  	background: #0082E6;
  	color: white;
  }
  .mind-box{
  	padding: 0 20px;
  }
  .btn-box-item{
  	cursor: pointer;
  	padding: 5px 10px;
  	border-radius: 3px;
  	text-align: center;
  	line-height: 30px;
  }
  .btn-box-item:hover{
  	background-color: #0082E6;
  	color: white;
  }
  .clear-person-btn{
  	float: right;
  	cursor: pointer;
  	color: #0082E6;
  }
  .matter-list-title{
  	text-align: center;
  	font-size: 28px;
  	padding-bottom: 10px;
  }
  .state_point{
  	display: inline-block;
  	width: 15px;
  	height: 15px;
  	border-radius: 50%;
  	background-color: #eee;
  	margin: 0 auto;
  	margin-right: 10px;
  }
  p.class_p{
  	margin: 0;
  }
  p.matter_check{
  	padding-left: 10px;
  	color: #0082E6;
  	cursor: pointer;
  }
  .state_point_3{
  	 background: -webkit-linear-gradient(rgb(251,100,100), rgb(233,10,10)); /* Safari 5.1 - 6.0 */
	  background: -o-linear-gradient(rgb(251,100,100), rgb(233,10,10)); /* Opera 11.1 - 12.0 */
	  background: -moz-linear-gradient(rgb(251,100,100), rgb(233,10,10)); /* Firefox 3.6 - 15 */
	  background: linear-gradient(rgb(251,100,100), rgb(233,10,10)); /* 标准的语法 */
  }
    .state_point_1{
  	 background: -webkit-linear-gradient(#7777FF, #0000DD); /* Safari 5.1 - 6.0 */
	  background: -o-linear-gradient(#7777FF, #0000DD); /* Opera 11.1 - 12.0 */
	  background: -moz-linear-gradient(#7777FF, #0000DD); /* Firefox 3.6 - 15 */
	  background: linear-gradient(#7777FF, #0000DD); /* 标准的语法 */
  }
    .state_point_2{
  	 background: -webkit-linear-gradient(#44FF69,#00AA22); /* Safari 5.1 - 6.0 */
	  background: -o-linear-gradient(#44FF69,#00AA22); /* Opera 11.1 - 12.0 */
	  background: -moz-linear-gradient(#44FF69,#00AA22); /* Firefox 3.6 - 15 */
	  background: linear-gradient(#44FF69,#00AA22); /* 标准的语法 */
  }
  
  
</style>