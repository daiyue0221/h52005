// 首页广告
function indexAdTimer(index_ad){
	this.index_ad 	  = index_ad;
	this.index_ad_img = index_ad.getElementsByTagName("img")[0];
	this.imgs = ["../images/shooting_01.png","../images/shooting_02.png","../images/shooting_03.png"];
	this.timer 		  = null;
	this.init = function () {
		this.setTimer();
		this.bind();
	}
	this.bind = function () {
		var obj = this;
		this.index_ad.onmouseover = function () {
			clearInterval(obj.timer);
			obj.timer = null;
		}
		this.index_ad.onmouseout = function () {
			obj.setTimer();
		}
	}
	this.setTimer = function () {
		var obj = this;
		this.timer = setInterval(function () {
			var f = obj.imgs.shift();
			obj.imgs.push(f);
			obj.index_ad_img.src = obj.imgs[0];
		},3000)	
	}
}


// var index_ad_img = ["../images/shooting_01.png","../images/shooting_02.png","../images/shooting_03.png"];

// 首页轮播图
function lb(parent) {
	this.parent = parent;
	this.car_img = parent.getElementsByClassName("c_img")[0];
	this.imgs = parent.getElementsByClassName("c_img")[0].children;
	this.lis  = parent.getElementsByTagName("li");
	this.j    = 0;
	this.timer= null;
}
lb.prototype.init = function () {
	this.bind();
	this.setTimer();
}
lb.prototype.bind = function () {	
	var obj = this;
	for (var i = 0; i < this.lis.length; i++) {
		this.lis[i].index = i;
		this.lis[i].onclick = function () {
			obj.animate(null,this); 
		}
	}	
	this.parent.onmouseover = function () {
		obj.setTimer();
	}
	this.parent.onmouseout = function () {
		obj.setTimer();
	}
}
lb.prototype.animate = function (x,obj) {
	this.clear();
	if(x){
		this.j += x;
		if (this.j == 3) {
			this.j=0;
		}else if(this.j == -1){
			this.j=2;	
		}
	}else{
		this.j = obj.index;
	}
	this.car_img.style.marginLeft =  this.j * -100 +"%";
	this.lis[this.j].className = "active";
}
lb.prototype.clear = function (x,obj) {
	for (var i = 0; i < this.lis.length; i++) {
		this.lis[i].className = "";
	}
}
lb.prototype.setTimer = function () {
	var obj = this;
	if(this.timer){
		clearInterval(this.timer);
		this.timer = null;
	}else{
		this.timer = setInterval(function () {
			obj.animate(1,null);
		},2000)
	}
}	

//头部固定
function index_scroll(nav) {
	this.nav = nav;
	this.init = function () {
		this.bind();
	}
	this.bind = function () {
		var obj = this;
		window.addEventListener('scroll',function(e){
			  if(window.pageYOffset > 1){
				this.nav.style.position = 'fixed';
				this.nav.style.top = '0px';
				this.nav.style.zIndex = 80;
			  }else{
				this.nav.style.position = 'static';  
			  }
			  if( parseInt(window.pageYOffset)>500){
				 index_ad.style.display = "block";
				 index_operate.style.display = "block";
			  }else{
				 index_ad.style.display = "none";
				 index_operate.style.display = "none"; 
			  }
		})
	}
}

//首页操作栏绑定事件
function operate_ul() {
	this.lis = index_operate.children;
	this.customized = document.getElementsByClassName("customized")[0];
	this.init = function () {
		this.bind();
	}
	this.bind = function () {
		var obj = this;
		for (var i = 0; i < this.lis.length; i++) {
			this.lis[i].onclick = function () {
				if(this.className == "li_customized"){
					customized.style.display = "block";
				}
			}
		}
	}
}

//模态框所有事件
function customized_event() {
	this.close    = customized.getElementsByClassName("mtk_close")[0];
	this.budget_option = select_budget.children;
	this.sub_next = customized.querySelectorAll(".sub_next");
	this.plan_wrap_div = customized.querySelectorAll(".plan_wrap>div");
	this.pback    = customized.querySelectorAll(".plan_wrap .pback01");
	this.scene    = customized.querySelectorAll(".plan_wrap .two .scene");
	this.phone_inp  = customized.querySelector(".plan_wrap .three .phone_div input");
	this.reg_tip    = customized.querySelectorAll(".plan_wrap .three .reg_tip");
	this.select_arr = {};
	this.init = function () {
		// console.log(this.phone_inp);
		//赋值默认值
		this.select_arr.budget = this.budget_option[0].value;
		this.bind();
	}
	this.bind = function () {
		var obj = this;
		var bb = this.input_bb();
 		this.close.onclick = function () {
			customized.style.display = "none";
		}
		select_budget.onchange = function () {
			obj.select_arr.budget = obj.budget_option[this.selectedIndex].value;
		}
		//下一步
		for (let i = 0; i < this.sub_next.length; i++) {
			this.sub_next[i].onclick = function () {
				if(i==0){
					obj.plan_wrap_div[i].style.display = "none";
					obj.plan_wrap_div[i+1].style.display = "block";
				}else if(i==1 ){
					if(obj.select_arr.scene){
						obj.plan_wrap_div[i].style.display = "none";
						obj.plan_wrap_div[i+1].style.display = "block";
					}else{
						alert("请选择地区");
					}
					
				}else if(i==2){
					if(obj.phone_inp.value && obj.reg_tip[0].style.display == "block"){
						obj.reg_tip[0].style.display = "block";
						alert("提交成功");
						console.log(obj.select_arr);
						customized.style.display = "none";
					}else{
						obj.reg_tip[0].style.display = "none";
						obj.reg_tip[1].style.display = "block";
						alert("手机格式有误");	
						console.log(obj.select_arr);
					}
					
				}
			}
		}
		//返回选择
		for (let i = 0; i < this.pback.length; i++) {
			this.pback[i].onclick = function () {
				// if(i==0){
					obj.plan_wrap_div[i].style.display = "block";
					obj.plan_wrap_div[i+1].style.display = "none";
				// }
			}
		}
		for (let i = 0; i < this.scene.length; i++) {
			this.scene[i].onclick = function () {
				obj.clear(obj.scene);
				this.className += " active";
				obj.select_arr.scene = this.innerHTML;
			}
		}
		//防抖节流
		this.phone_inp.oninput = function(){
			bb();
		}
	},
	this.clear=function(obj){
		for (var i = 0; i < obj.length; i++) {
			obj[i].className = "scene";
		}
	},
	//正则判断手机号码
	this.phone_reg = function(val){
		 var reg =/^1[3-9]\d{9}$/;
		 return reg.test(val);
	}
	
	//防抖节流
	this.input_bb = function(){
		var timer;
		var obj = this;
		return function(){
			if(timer){clearTimeout(timer)};
			timer = setTimeout(()=>{
				if(obj.phone_reg(obj.phone_inp.value)){
					obj.reg_tip[0].style.display = "block";
					obj.reg_tip[1].style.display = "none";
					obj.select_arr.phone = obj.phone_inp.value;
				}else{
					obj.reg_tip[0].style.display = "none";
					obj.reg_tip[1].style.display = "block";
				}
			},1000)
		}
	}
}

