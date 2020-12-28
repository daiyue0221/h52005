//按钮 li标签的淡入淡出轮播
function lb(parent) {
			this.parent = parent;
			this.imgs = parent.getElementsByClassName("c_img")[0];
			this.lis  = parent.getElementsByTagName("li");
			this.btns = parent.getElementsByTagName("button");
			this.j    = 0;
			this.timer= null;
		}
		lb.prototype.init = function () {
			this.bind();
			this.setTimer();
		}
		lb.prototype.bind = function () {	
			var obj = this;
			for (var i = 0; i < this.btns.length; i++) {
				this.btns[i].onclick = function () {
					if(this.innerHTML == "→"){
						obj.animate(1,this);
					}else{
						obj.animate(-1,this);
					}
					 
				}
			}
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
			this.imgs[this.j].className = "active";
			this.lis[this.j].className = "active";
		}
		lb.prototype.clear = function (x,obj) {
			for (var i = 0; i < this.lis.length; i++) {
				this.lis[i].className = "";
				this.imgs[i].className = "";
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