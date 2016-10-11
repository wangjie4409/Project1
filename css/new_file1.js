//<![CDATA[
$(function(){
	(function(){
		var curr = 0;
		$("#jsNav1 .trigger").each(function(i){
			$(this).click(function(){
				curr = i;
				$("#js1 img").eq(i).fadeIn("slow").siblings("img").hide();
				$(this).siblings(".trigger").removeClass("imgSelected").end().addClass("imgSelected");
				return false;
			});
		});
		
		var pg = function(flag){
			if (flag) {
				if (curr == 0) {
					todo = 5;
				} else {
					todo = (curr - 1) % 6;
				}
			} else {
				todo = (curr + 1) % 6;
			}
			$("#jsNav1 .trigger").eq(todo).click();
		};
		
		//ǰ
		$("#prev").click(function(){
			pg(true);
			return false;
		});
		
		//
		$("#next").click(function(){
			pg(false);
			return false;
		});
		
		//Զ
		var timer = setInterval(function(){
			todo = (curr + 1) % 6;
			$("#jsNav1 .trigger").eq(todo).click();
		},1000);
		
		$("#js1,#prev,#next").hover(function(){
				clearInterval(timer);
			},
			function(){
				timer = setInterval(function(){
					todo = (curr + 1) % 6;
					$("#jsNav1 .trigger").eq(todo).click();
				},1000);			
			}
		);
	})();
});
//]]>

// 酷站代码整理 http://www.5icool.org/

