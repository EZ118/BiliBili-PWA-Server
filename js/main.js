function GetAjax(url, func) {
	if (window.XMLHttpRequest) {xhttp = new XMLHttpRequest();}
	else {xhttp = new ActiveXObject("Microsoft.XMLHTTP");}
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			func(this.responseText);
		} else if (this.readyState == 4 && (this.status == 403 || this.status == 404 || this.status == 400)) {
			func("");
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send(); 
}

function Add2Page(result){
	var tjlist = eval("("+result+")");
	var WebList = "";
	for(var i = 0; i <= 5; i++){
		 WebList += `<div class='dynamic_singlebox'>
					 <a onclick='window.open("https://player.bilibili.com/player.html?bvid=` + tjlist.data.item[i].bvid + `&page=1&danmaku=0", "Player", "height=500,width=800,top=50,left=250")' target='_blank'>
						 <img src='` + tjlist.data.item[i].pic.replace("http:", "https:") + `@412w_232h_1c.webp'><br>
						 <div class="dynamic_singlebox_vt">` + tjlist.data.item[i].title + `</div>
					 </a>
					 <a onclick='window.open("https://space.bilibili.com/` + tjlist.data.item[i].owner.mid + `", "Player", "height=500,width=800,top=50,left=250")' target='_blank'><div class="dynamic_singlebox_un">🔘&nbsp;` + tjlist.data.item[i].owner.name + `</div></a>
				 </div>
			 `;
	}
	document.getElementsByTagName("body")[0].innerHTML += WebList;
	document.getElementById("dynamic_loader").style.display = "none";
}

window.onload = function(){
	document.referrer="https://www.bilibili.com/";
	for(let i = 1; i <= 5; i ++) {
		GetAjax("./api/recommend/", Add2Page);
	}
}