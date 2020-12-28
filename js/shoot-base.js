//伸展
		var span = main.querySelectorAll("#main .first_ul i");
		var lis = main.querySelectorAll("#main .first_ul>li");
		var li_child = main.querySelectorAll("#main .ul_child");
		var li_img = main.querySelectorAll("#main .first_ul>li>img");
	
		for (let i = 0; i < lis.length; i++) {
			lis[i].onclick = function () {
					if(this.className == "open"){
						for (var j = 0; j < lis.length; j++) {
							span[j].innerHTML = "+";
							li_child[j].style.display = "none";	
							lis[j].className = "closed";
							li_img[j].className = "";
						}
						span[i].innerHTML = "+";
						li_child[i].style.display = "none";
						this.className = "closed";
						li_img[i].className = "active";
						
					}else{
						for (var j = 0; j < lis.length; j++) {
							span[j].innerHTML = "+";
							li_child[j].style.display = "none";	
							lis[j].className = "closed";
							li_img[j].className = "";
						}
						span[i].innerHTML = "-";
						li_child[i].style.display = "block";
						this.className = "open";
						li_img[i].className = "active";
					}
			}
		}


//轮播
function sb_carousel(parent) {
	this.parent = parent;
	this.car_img = parent.querySelector(".tab_carousel .carousel");
	// this.imgs = parent.getElementsByClassName("c_img")[0].children;
	this.btn  = parent.querySelectorAll(".tab_carousel>span");
	this.j    = 0;
	this.timer= null;
	
	this.init = function () {
		// console.log(this.btn);
		this.bind();
		this.setTimer();
	}
	this.bind = function () {	
		var obj = this;
		for (let i = 0; i < this.btn.length; i++) {
			this.btn[i].onclick = function () {
				if(this.className == "left"){
					obj.animate(-1,this); 
				}else{
					obj.animate(1,this); 
				}
				
			}
		}	
		this.parent.onmouseover = function () {
			obj.setTimer();
		}
		this.parent.onmouseout = function () {
			obj.setTimer();
		}
	}
	this.animate = function (x,obj) {
		// this.clear();
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
	}
	// this.clear = function (x,obj) {
	// 	for (var i = 0; i < this.lis.length; i++) {
	// 		this.lis[i].className = "";
	// 	}
	// }
	this.setTimer = function () {
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
}
