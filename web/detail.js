define("./detail",['$', 'gallery/underscore/1.6.0/underscore.js', './domainConfig'],function(require,exports,module){
	var _ = require("gallery/underscore/1.6.0/underscore.js"),
		$ = require("$");
	var domainFilterConfig = require('./domainConfig');

	var tpl = ""+
		'	<section class="req">'+
		'		<h4 class="subTitle">requestBasicInfo</h4>'+
		'		<div class="detail">'+
		'			<ul class="uk-list">'+
		'			    <li><strong>method : </strong><%= method %> </li>'+
		'			    <li class="detailInfo"><strong>path : </strong><br/><%= path %> <span></span></li>'+
		'			    <li><strong>url : <a href="<%= url %>" target="_blank">点击访问</a></strong><br /><%= url %> <span></span></li>'+
		'			</ul>'+
		'		</div>'+
		'	</section>'+

		'	<section class="req">'+
		'		<h4 class="subTitle">requestTool</h4>'+
		'		<div class="detail">'+
		'			<ul class="uk-list">'+
		'	<% _.each(mySiteDomainLink, function(v,k) { %> <li><strong><%= k %> : <a href="<%= v %>" target="_blank">点击访问</a></strong> <br/> <%= v %></li><% }); %>'+

		'			</ul>'+
		'		</div>'+
		'	</section>'+

		'	<section class="req">'+
		'		<h4 class="subTitle">requestDetail</h4>'+
		'		<div class="detail">'+
		'			<ul class="uk-list">'+
		'			    <li><%= method %> <span title="<%= path %>"><%= path %></span> HTTP/1.1</li>'+
		'			    <% _.each(reqHeader, function(v,k) { %> <li><strong><%= k %></strong> : <%= v %></li><% }); %>'+
		'			</ul>'+
		'		</div>'+
		'	</section>'+
		''+
		'	<section class="req">'+
		'		<h4 class="subTitle">get params</h4>'+
		'		<div class="detail">'+
		'			<ul class="uk-list">'+
		'			    <% _.each(getParams, function(v,k) { %> <li><strong><%= k %></strong> : <%= v %></li><% }); %>'+
		'			</ul>'+
		'		</div>'+
		'	</section>'+
		''+
		'	<section class="req">'+
		'		<h4 class="subTitle">post params</h4>'+
		'		<div class="detail">'+
		'			<ul class="uk-list">'+
		'			    <% _.each(postParams, function(v,k) { %> <li><strong><%= k %></strong> : <%= v %></li><% }); %>'+
		'			</ul>'+
		'		</div>'+
		'	</section>'+
		''+
		''+
		'	<section class="reqBody">'+
		'		<h4 class="subTitle">request body</h4>'+
		'		<div class="detail">'+
		'			<p><%= reqBody %></p>'+
		'		</div>'+
		'	</section>'+
		''+
		'	<% if(statusCode) { %>'+
		'		<section class="resHeader">'+
		'			<h4 class="subTitle">response header</h4>'+
		'			<div class="detail">'+
		'				<ul class="uk-list">'+
		'				    <li>HTTP/1.1 <span class="http_status http_status_<%= statusCode %>"><%= statusCode %></span></li>'+
		'				    <% _.each(resHeader, function(v,k) { %> <li><strong><%= k %></strong> : <%= v %></li><% }); %>'+
		'				</ul>'+
		'			</div>'+
		'		</section>'+
		''+
		'		<section class="resBody">'+
		'			<h4 class="subTitle">response body</h4>'+
		'			<div class="detail">'+
		'				<pre class="J_responseBody resBodyContent"></pre>'+
		'			</div>'+
		'		</section>'+
		'	<% } %>';

	function render(data,cb){

		/**********************config domain***************************/

		var mySiteDomain = {};
		var mySiteDomainLink = {};
		
		var domainConfig = domainFilterConfig.getDomainConfig();

        for(var damianName in domainConfig)
        {
        	for (var env in domainConfig[damianName]) 
        	{
    			if(domainConfig[damianName][env] == data.host)
    			{
    				mySiteDomain=domainConfig[damianName];
    			};
    		};	
        }

        if(mySiteDomain)
        {
        	for(var env in mySiteDomain){
        		mySiteDomainLink[env] = data.protocol+"://"+mySiteDomain[env]+data.path;
        	}
        }

        data['mySiteDomainLink'] = mySiteDomainLink;
		// console.log(data);
		/**********************config domain***************************/

		/**********************get params***************************/
		var getParams = {};
		var urlPathArr = data['path'].split("?");
		if(urlPathArr[1])
		{
			getParams = GetRequest("?"+urlPathArr[1]);
		}
		data['getParams'] = getParams;
		/**********************get params***************************/

		/**********************post params***************************/
		var postParams = {};
		if(data['reqBody'])
		{
			postParams = GetRequest("?"+data['reqBody']);
		}
		data['postParams'] = postParams;
		/**********************post params***************************/

		var $baseTpl = $(_.template(tpl, data));

		var dataType = 'html';

		var ContentType = data['resHeader']['Content-Type'];
		if(ContentType && ContentType.indexOf("json")>0)
		{
			dataType = 'json';
		}

		var isImgUrl = false;
		try{
			isImgUrl = isImg(data["url"]);
		}catch (e){}

	    if(data.statusCode){ //if finished
	    	if(isImgUrl){
				$(".J_responseBody", $baseTpl).html("<img src='"+data['url']+"'></img>");
				cb($baseTpl);
			}else {
				$.ajax({
					url     : "/body?id=" + data._id + '&dataType=' + dataType,
					headers : {
						anyproxy_web_req : true
					},
					type    : "GET",
					success : function(bodyData){
						if(dataType=='json')
						{
						    try{
                                var dataF = eval("(" + bodyData + ")");
                                var jsonDataFormat = JSON.stringify(dataF, null, 2);
                                jsonDataFormat = syntaxHighlight(jsonDataFormat);
                                $(".J_responseBody", $baseTpl).html(jsonDataFormat);
                                cb($baseTpl);
                            }catch (e){
                                $(".J_responseBody", $baseTpl).html(bodyData);
                                cb($baseTpl);
                            }
						} else {
							$(".J_responseBody", $baseTpl).html(bodyData);
							cb($baseTpl);
						}
					}
				});
			}
	    }else{
	    	cb($baseTpl);
	    }
	}

	function GetRequest(url) {
		//var url = location.search; //获取url中"?"符后的字串
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

	function syntaxHighlight(json) {
		if (typeof json != 'string') {
			json = JSON.stringify(json, undefined, 2);
		}
		json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
	}

	//判断是否为图片资源
	function isImg(file) {
		var isImg = false;
		var ImageFileExtend = ".gif,.png,.jpg,.ico,.bmp";
		//判断后缀
		var fileExtend = file.substring(file.lastIndexOf('.')).toLowerCase();
		if (ImageFileExtend.indexOf(fileExtend) > -1) {
			isImg = true;
		}
		return isImg;
	}

	exports.render = render;
});