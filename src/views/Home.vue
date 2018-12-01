<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
			<el-col :span="2" class="userinfo header-btn">
				首页
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened v-show="!collapsed">
					 <template v-for="(item,index) in menuSideList" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title" @click="menuStepFun_1"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="(child,inindex) in item.children" :index="child.path+inindex+''" :key="inindex" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
					<!--<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>-->
					
					
				</el-menu>
				<!--导航菜单-折叠后-->
				<!--<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>-->
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<!--<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>-->
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
	
	import Matterlist from './matter/Matterlist.vue'
	import Mattertotallist from './matter/Mattertotallist.vue'
	import Leadermatterlist from './matter/leadermatterlist.vue'
	import Depmatterlist from './matter/Depmatterlist.vue'
	
	
	export default {
		data() {
			return {
				sysName:'海晏县政府“710”政务督办系统',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
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
				serverUrl:'http://localhost:8081',
				token: JSON.parse(sessionStorage.user).token,
				menuSideList:[],
				menuSideList_leader:[],
			}
		},
		methods: {
			menuStepFun_1:function(){
				console.log(123)
			},
			onSubmit() {
				console.log('submit!');
			},
			handleopen(a) {
				console.log(a)
				this.$router.push(this.menuSideList[a]['path']);
			},
			handleclose(a) {
				this.$router.push(this.menuSideList[a]['path']);
			},
			handleselect: function (a, b) {
				console.log(b)
				this.$router.push("/matterlist");
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			//获取领导人员列表
			getLeaderList:function(){
				var _this = this;
				this.$axios.get(this.serverUrl+"/getLeaderList?token="+this.token)
			  	.then(function (res) {
				    if(res.data.code == 1){
				    	var arr = []
				    	
				    	var dataObj = res.data.data;
				    		
			    		var obj = {
				    		path: '/',
					        component: 'Home',
					        name: '书记、副书记',
					        iconCls: '',//图标样式class
					        children: []
				    	}
			    		
			    		var inarr = []
			    		for(var j = 0; j < dataObj.length; j++){
			    			var inobj = {};
			    			inobj.path = '/leadermatterlist';
			    			inobj.component = Matterlist;
			    			inobj.name= dataObj[j].user_name;
			    			inobj.userid= dataObj[j].user_id;
			    			inarr.push(inobj);
			    			obj.children = inarr;
			    			console.log(inarr)
			    		}
			    		_this.menuSideList.push(obj)
				    	_this.getUndelMatList()
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
				    console.log(error);
			  	});
			},
			
			//获取待办事项列表
			getUndelMatList:function(){
				var _this = this;
//				this.$axios.get(this.serverUrl+"/getLeaderList?token="+this.token)
//			  	.then(function (res) {
//				    if(res.data.code == 1){
//				    	var arr = []
//				    	
//				    	var dataObj = res.data.data;
//				    		
//			    		var obj = {
//				    		path: '/',
//					        component: 'Home',
//					        name: '书记、副书记',
//					        iconCls: '',//图标样式class
//					        children: []
//				    	}
//			    		
//			    		for(var j = 0; j < dataObj.length; j++){
//			    			var inobj = {};
//			    			inobj.path = '/matterlist';
//			    			inobj.component = Matterlist;
//			    			inobj.name= dataObj[j].user_name;
//			    			inobj.userid= dataObj[j].user_id;
//			    			var inarr = []
//			    			inarr.push(inobj);
//			    			obj.children = inarr;
//			    			console.log(inarr)
//			    		}
//			    		_this.menuSideList.push(obj)
				    	var obj_bot ={
				    		path: '/Matterlist',
					        component: 'Home',
					        name: '待办事项（0）',
					        iconCls: '',//图标样式class
					        children: []
				    	}
				    	_this.menuSideList.push(obj_bot)	
				    	_this.getMenuList()
//				    }else{
//				    	_this.$message.error(res.data.msg);
//				    }
//			  	})
//			  	.catch(function (error) {
//				    console.log(error);
//			  	});
			},
			getMenuList:function(){
				var _this = this;
				this.$axios.get(this.serverUrl+"/getDepartList?token="+this.token+'&father_id='+this.father_id)
			  	.then(function (res) {
				    if(res.data.code == 1){
				    	var arr = []
				    	
				    	var dataObj = res.data.data;
				    	for(var i = 0; i < dataObj.length; i++){
				    		
				    		var obj = {
					    		path: '/depmatterlist',
						        component: 'Home',
						        name: '',
						        iconCls: '',//图标样式class
						        children: []
					    	}
				    		
				    		obj.name = dataObj[i].dep_name;
				    		for(var j = 0; j < dataObj[i].children.length; j++){
				    			var inobj = {};
				    			inobj.path = '/matterlist';
				    			inobj.component = Matterlist;
				    			inobj.name= dataObj[i].children[j].dep_name;
				    			var inarr = []
				    			inarr.push(inobj);
				    			obj.children = inarr;
				    			console.log(inarr)
				    		}
				    		_this.menuSideList.push(obj)
				    	}
				    	
				    	var obj_bot ={
				    		path: '/Personlist',
					        component: 'Home',
					        name: '督察人员库',
					        iconCls: '',//图标样式class
					        children: []
				    	}
				    	_this.menuSideList.push(obj_bot)
				    	console.log(_this.menuSideList)
				    }else{
				    	_this.$message.error(res.data.msg);
				    }
			  	})
			  	.catch(function (error) {
				    console.log(error);
			  	});
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
			this.getLeaderList()

		}
		
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 80px;
			line-height: 80px;
			background: #0772b0;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				width:330px;
				height:60px;
				font-size: 30px;
				padding-left:20px;
				padding-right:20px;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:50%;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 80px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
			.header-btn{
				font-size: 20px;
			}
		}
	}
</style>