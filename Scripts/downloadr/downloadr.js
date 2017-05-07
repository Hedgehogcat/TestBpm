(function($) {
  $.fn.downloadr = function() {
  	return this.each(function() {
  	
  	function returnBrowserTest(){
				
					var dlBrowser = $.browser.browser();
					
					var dlString = '';
					
					switch(dlBrowser){
					
						case "Safari":

						    dlString = '右键点击下面的图标,从菜单中选择<strong>文件链接另存为</strong>或者<strong>下载文件链接</strong>！';
						
						break;
						
						case "Firefox":
						
						dlString = '右键点击下面的图标,从菜单中选择<strong>链接另存为</strong> ！'
						
						break;
						
						case "Msie":

						    dlString = '右键点击下面的图标,从菜单中选择<strong>目标另存为</strong>！';
						
						break;
						
						default:

						    dlString = '右键点击下面的图标,从菜单中选择<strong>目标另存为.</strong>！';
					}
					
					
					return dlString;
				}	
				
				var element = this;
			  
			  	$(element).addClass("download_link");
			  	
			  	var theTitle = $(element).attr('title');
			  				  	
				var theLink = $(element).attr('href');
	
			  	$(element).bind('click',function(e){
			  	
			  		e.preventDefault();

				  	var html = "";
				  	
				  	html += "<h2>文件名称：'" + theTitle + "'</h2>";
				  	html += "<p>下载'" + theTitle + "',只需" + returnBrowserTest() + "</p>";
				  	html += "<p style='text-align:center;'><a href='" + theLink + "'><img src='/Scripts/downloadr/download.png' alt='右键(链接另存为)下载保存!' id='download_file'/></a></p>";
				  	html += "<p>点击<strong><a href='" + theLink + "'>这里</a></strong>在浏览器中打开!</p>";
				  	
				  	jQuery.facebox(html);
			  		
			  	});
			  	});

  }
})(jQuery);