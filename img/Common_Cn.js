// JavaScript Document
//综合了所有在页面中需要用到的脚本------(中文站)
//可能一些代码只应用到一部分页面，为此要做一些判断
//凡是用到的脚本，几乎都基于jQuery库
//by william
$(function(){ 
	//中文 - 头部 - 菜单
	if($("#topMenu").length > 0 ){
		
		$('.mainMenuItem').hover(function(){
			if($(this).find('.subMenuBox').is(":not(:animated)")){
				$(this).siblings().find('.subMenuBox').hide();
				$(this).addClass("mainOn").find('.subMenuBox').show();
			}
		},function(){
			if($(this).find('.subMenuBox').is(":not(:animated)")){
				$(this).find('.subMenuBox').stop(true,true).hide();
			}
		});
		
		
		////////////////////////////
//		
//		$('.mainMenuItem').mouseenter(function(){
//			$(this).addClass("mainOn").find('.subMenuBox').stop(true,true).show();
//		});
//		
//		$('.subMenuBox').mouseleave(function(){
//			
//			$(this).removeClass("mainOn").find('.subMenuBox').stop(true,true).hide();
//		});
		////////////////////////////
		//子菜单
		$("#topMenu .subMenuItem").hover(function(){
			$(this).addClass("subOn");
		},
		function(){
			$(this).removeClass("subOn");
		})
		
		
	}
	
	var hideMenu = function(obj){
			$(obj).hide();
	}
	var showMenu = function(){
			$(obj).show();
	}

	//中文 - 首页 - 倒计时
	if($(".countDown").length > 0 ){
		$(".countDownNum").countdown({
			date: "October 15, 2015 23:59:59",
			htmlTemplate: "<span class='txt'>距离大会开幕还有</span><span class='d'> %{d} </span><span>天</span>",
			offset: 8,
			onChange: function( event, timer ){
			},
			onComplete: function( event ){
			
				$(this).html("0");
			},
			onPause: function( event, timer ){
	
				$(this).html("Pause");
			},
			onResume: function( event ){
			
				$(this).html("Resumed");
			},
			leadingZero: true
		});
	}
	
	
	//中文 - 首页 - 滚动信息

	if($(".indexNotice").length > 0 ){
		$('.noticeCon').kxbdMarquee({isEqual:false,direction:'up'});
		$(".indexNotice .noticeCon").get(0).onselectstart=function(){return false}

		//document.body.onCopy = function(){return false}
	//方式一	
//		//禁止复制
//		var mousedownKey = 0
//		$(document).mousedown(function(){mousedownKey = 1})
//		$(document).mouseup(function(){mousedownKey = 0})
//		$(document).mousemove(function(){if(mousedownKey){alert("禁止复制！");mousedownKey = 0;}})
//		
//		//禁止右键
//		$(document).bind("contextmenu",function(e){alert("禁用右键！");});  
//
//		//禁止Ctrl
//		$(document).bind('keydown',function(e){
//			if(e.which ==17){
//				alert("不当的拷贝将损害您的系统！" );
//			}
//		}); 
		
	//方式二	
		
//		function sb_LClick(event) {
//			alert('禁止你的左键复制！') 
//		}
//		function sb_RClick(event) {
//			if (event.button==2) {
//				alert('禁止右键点击~！') 
//			}
//		}
//		function CtrlKeyDown(event){
//			if (event.ctrlKey) {
//				alert('不当的拷贝将损害您的系统！') 
//			}
//		}
//		document.onkeydown=CtrlKeyDown;
//		document.onselectstart=sb_LClick;
//		document.onmousedown=sb_RClick;
	}
		
	
});
