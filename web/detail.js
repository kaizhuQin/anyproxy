define("./detail",['$', 'gallery/underscore/1.6.0/underscore.js'],function(require,exports,module){
	var _ = require("gallery/underscore/1.6.0/underscore.js"),
		$ = require("$");

	var tpl = ""+
		'	<section class="req">'+
		'		<h4 class="subTitle">requestBasicInfo</h4>'+
		'		<div class="detail">'+
		'			<ul class="uk-list">'+
		'			    <li><strong>method : </strong><%= method %> </li>'+
		'			    <li><strong>path : </strong><br/><%= path %> <span></span></li>'+
		'			    <li><strong>url : <a href="<%= url %>" target="_blank">点击访问</a></strong><br /><%= url %> <span></span></li>'+

		'			    <li><strong>196测试url : <a href="<%= url %>" target="_blank">点击访问</a></strong><br /><%= url %> <span></span></li>'+
		'			    <li><strong>预发url : <a href="<%= url %>" target="_blank">点击访问</a></strong><br /><%= url %> <span></span></li>'+
		'			    <li><strong>线上url : <a href="<%= url %>" target="_blank">点击访问</a></strong><br /><%= url %> <span></span></li>'+


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
		var $baseTpl = $(_.template(tpl, data));

	    if(data.statusCode){ //if finished
	    	$.ajax({
	    		url     : "/body?id=" + data._id,
	    		headers : {
	    			anyproxy_web_req : true
	    		},
	    		type    : "GET",
	    		success : function(data){
		    	    $(".J_responseBody", $baseTpl).html(data);
		    	    cb($baseTpl);
		    	}
	    	});
	    }else{
	    	cb($baseTpl);
	    }
	}

	exports.render = render;
});