function getRequest(param) { 
    var url = location.search; //获取url中"?"符后的字串 
    console.log(url);
    var theRequest = new Object(); 
    if (url.indexOf("?") != -1) { 
       var str = url.substr(1); 
       strs = str.split("&"); 
       for(var i = 0; i < strs.length; i ++) { 
          theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
       } 
    } 
    return theRequest; 
 }

 function getRequestParam(url) { 
    // var url = "team-introduce.html?t=1&name=22";
    var data;
    var params = [];
    if(url.indexOf("?") != -1){
        data= url.split("?")[1].split("&");
        if(data.length < 1){
           return false;
        }
        for(i=0,arr=[];i<data.length;i++){
            arr = data[i].split("=");
            params[arr[0]] = arr[1];
        }
    }else{
        return false;
    }
    return params;
 }
 
 function getZuNum(x){
	 var arr = [];
	 for (var i = 0; i < x; i++) {
	 	if(i == 0 || i == 1){
	 		arr.push(0);
	 	}else if(i%2 == 1){
	 		arr.push((i+1)/2,(i+1)/2);
	 	}
	 }
	 return arr;
 }
