// JavaScript Document
//综合了所有在页面中需要用到的脚本
//可能一些代码只应用到一部分页面，为此要做一些判断
//凡是用到的脚本，几乎都基于jQuery库
//by william
(function($) {
	///////////////////////////////////////////插件扩展--开始////////////////////////////////////////////
	//////DOM函数
	$.fn.extend({
		////游走浮动元素
		wanderBlock:function(opt,callback){
			//参数初始化
			if(!opt) var opt={};
		
			var _this=this;
			var timerID;
			var xin = true, yin = true;
			var x = opt.x?parseInt(opt.x,10):50;
			var y = opt.y?parseInt(opt.y,10):60;
			var step = opt.step?parseInt(opt.step,10):1;//每次移动的步伐
			var delay = opt.delay?parseInt(opt.delay,10):5;//移动的间隔时间
			
			//showAct:对象在屏幕上移动
			var showAct = function() 
			{
				var L=T=0;
				var R= $(window).width()-_this.width();
				var B = $(window).height();-_this.height();
				//var R= document.body.clientWidth-_this.width();
				//var B = document.body.clientHeight-_this.height();
				_this.css("left",x + "px");
				_this.css("top",y + "px");
				x = x + step*(xin?1:-1);
				if (x < L) { xin = true; x = L;}
				if (x > R){ xin = false; x = R;}
				y = y + step*(yin?1:-1);
				if (y < T) { yin = true; y = T; }
				if (y > B) { yin = false; y = B; }
			}
			//showAct:对象在屏幕上隐藏
			var hideAct = function(){
				autoStop()
				_this.hide();	
				
			}
			//autoPlay:自动播放
			var autoPlay = function(){
				if(delay)timerID = window.setInterval(showAct,delay);
			};
			//autoStop:自动停止
			var autoStop = function(){
				if(delay)window.clearInterval(timerID);
			};
			//鼠标事件绑定
			_this.hover(autoStop,autoPlay).mouseout();
			_this.find(".closeAD").bind("click", function(){
				autoStop();
				_this.hide();  
			});

		},
		
		
		
		
		////回到顶部
		returnTop: function() {
			if (this[0]) {
				var b = this.click(function() {
					$("html, body").animate({scrollTop: 0},120)
				}),
				c = null;
				$(window).bind("scroll",function(){
					var d = $(document).scrollTop(),
						e = $(window).height();
					0 < d ? b.css("bottom", "50px") : b.css("bottom", "-50px");//$(window).height()+
					//IE6
					if (!window.XMLHttpRequest) {
						b.hide();
						(d > 0) ? (b.is(':visible')?'':b.show()): b.hide();
						b.css("top", d + e - 260);
					}
				})	
			}
		}
	})
	//////jQuery函数	
	jQuery.extend({
	
	})
})(jQuery);








$(function(){ 
	//全站 - 语言切换
	if($("#topLang").length > 0){
		_show = $("#topLang .langShow");
		_wrap = $("#topLang .langWrap");
		
//		_show.click(function(){
//		   	if(_wrap.is(":not(:animated)")){
//				if(_wrap.is(":visible")){
//					_wrap.stop(true,true).slideUp("fast",function(){
//						_show.find(".langTxt").removeClass("langTxtOn");
//					});
//				}else{
//					_wrap.stop(true,true).slideDown("fast",function(){
//						_show.find(".langTxt").addClass("langTxtOn");
//					});
//				};
//			};
//		});
		$("#topLang").hover(function(){
		   	if(_wrap.is(":not(:animated)")){

				_wrap.stop(true,true).slideDown("fast",function(){
					_show.find(".langTxt").addClass("langTxtOn");
				});
				
			};
		},function(){
			if(_wrap.is(":not(:animated)")){
				_wrap.stop(true,true).slideUp("fast",function(){
					_show.find(".langTxt").removeClass("langTxtOn");
				});
			};
		});
		
		$("li",_wrap).click(function(){
			hrefStr = $(this).find("a").prop("href");
			//window.location.href = hrefStr; 
			_wrap.slideUp("fast",function(){
				_show.find(".langTxt").removeClass("langTxtOn");
			});
			//return false;
		});
	}
/*	$("#topMenu .mainItem").each(function(index){
			$(this).mouseover(function(){
				$(this).addClass("mainItemOn").siblings().removeClass("mainItemOn");
				
				Pos_left = $(this).position().left + ($(this).width())/2 - ($("#topMenu .menuSub div").eq(index).width())/2;
				Pos_left = Pos_left > 0 ? Pos_left:0;
				$("#topMenu .menuSub div").eq(index).css("left",Pos_left).show().siblings().hide();
				$.cookie("topMenu",index);
			})							
		})*/
//	$("#menu_tab  .menu_item").eq($.cookie("menu")).trigger("mouseover");

	//中文 - 首页 - 中间 - 图片切换
    if ($("#indexBan").length > 0) {
        $("#indexBan .banBox").cycle({pause:1,timeout:2000,speed:1000,next:".banCtrNext",prev:".banCtrPrev",pager:".banPager"});
		
		$("#indexBan").hover(function(){
			$("#indexBan .banCtrPrev,#indexBan .banCtrNext").stop(true,false).show();
		},function(){
			$("#indexBan .banCtrPrev,#indexBan .banCtrNext").stop(true,false).hide();
		})
		
		$("#indexBan .banCtrPrev,#indexBan .banCtrNext").hover(function(){
			_this = $(this);
			_this.addClass("banCtrLevel2");
		},function(){
			_this.removeClass("banCtrLevel2");
		});
		
    }
	
	//中文 - 首页 - 新闻菜单
	if($(".indexNews").length > 0 ){
		$(".indexNews .newsTitItem").hover(function(){
			_this = $(this);
			var _index = $(".indexNews .newsTitItem").index(_this);
			_this.siblings().removeClass("newsTitItemOn");
			_this.addClass("newsTitItemOn");
			$(".indexNews .list").removeClass("listOn").eq(_index).addClass("listOn");
		
		},function(){
		
		});
	}
	
	
	
	//中文 - 首页 - 图片轮播
	if($(".photoShow").length > 0 ){
		$('.photoShow .gallery').cycle({
			fx: 'fade',
			next:   '.photoShow .next', 
			prev:   '.photoShow .prev' 
		});
	}
	
	
	//中文 - 首页 - 订阅
	if($("#SubscribeForm").length > 0)
	{
		$("#SubscribeEmail").data("value_bak",$("#SubscribeEmail").val()).focus(function(){
			if($(this).val() == $(this).data("value_bak")) $(this).val("");					

		}).blur(function(){
			if($(this).val() == "") $(this).val($(this).data("value_bak"));
		});
		
		$("#SubscribeForm").submit(function(){
			$this = this;
			var E = $("#SubscribeEmail").val();
			var L = $("#SubscribeLang").val();
			$.ajax({
				type: "POST",
				url: "/ajaxSubscribe.asp?E="+E+"&L="+L,
				cache: false,
				success: function(data){
					alert(data);
				},
				error:function(){
					if(L=="cn"){
						alert("未能提交成功，请与我们联系！");
					}
					else{
						alert("Sumbit failed,please contact us !");
					}
				}
			});
			return false;
		});
	}

	//中文 - 首页 - 浮动通知  - 已经取消
/*	if($(".temporaryNotice").length > 0 ){
		
		$(".temporaryNotice").slideDown("slow");
		var tempTimer = setTimeout(function(){
			if($(".temporaryNotice").is(":visible"))
			{
				if($(".temporaryNotice").is(":animated"))
			    {
					
				}
				else
				{
					$(".temporaryNotice .noticeSwitch").click();
				}
			}			
		},20000);
		
		$(".temporaryNotice .noticeSwitch").click(function(){
			$(".temporaryNotice").slideUp("slow",function(){
				$(".temporaryNotice .noticeSwitch").hide();
				$(".temporaryNotice .noticeWrap").hide();
			});
			
		});

	}*/
	
	


	//中文 - 首页 - 页面漂浮小浮标 - 已取消
/*	if($("#floatAD").length > 0 ){
		
		$("#floatAD").wanderBlock();
		
	}*/

	//中文 - 首页 - 返回顶部
	if($("#returnTop").length > 0 ){
		
		$("#returnTop").returnTop();

	}
	//中文 - 首页 - 浮动 - 微信 - 弃用滚动
	if($("#floats_exhibitor").length > 0 ){
/*		$("#floats_exhibitor").scrollFollow({
	    	speed:500
		});*/
		function resizeForFloats(){	
			if(($(window).width() - $("#container .pagePart").width()) / 2 < $("#floats_exhibitor").outerWidth() + 5){
				$("#floats_exhibitor").css("left","").css("right",0);
			}else{
			$("#floats_exhibitor").css("right",($(window).width() - $("#container .pagePart").width()) / 2 - $("#floats_exhibitor").outerWidth() - 5);
			}
		};
		resizeForFloats();

		$(window).bind("resize",resizeForFloats);	
	}




	//中文 - 宣传中心 - 现场图片：图片模块切换
	$("#PublicityPhotoBox .TitleList .TitleItem").each(function(index){
	 	$(this).hover(function(){
			$(this).addClass("TitleItemOn").siblings().removeClass("TitleItemOn");
		},function(){
			$(this).removeClass("TitleItemOn");
		}).click(function(){
			if ($(this).hasClass("TitleItemSel"))
			{	
				return false;
			}
			else
			{
				$(this).addClass("TitleItemSel").siblings().removeClass("TitleItemSel");
				$("#PublicityPhotoBox .photoBlock").eq(index).show().siblings(".photoBlock").hide();
			}
		})
	})
	
	
	//中文 - 宣传中心 - photolist.asp列表背景
	$("#picContent .picBlock").hover(function(){
	
		$(this).addClass("picBlockOn").siblings().removeClass("picBlockOn");
	},function(){
		$(this).removeClass("picBlockOn");
	
	});
});


