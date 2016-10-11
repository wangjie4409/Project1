(function($){

	$.fn.jScroll = function(options){
		var opt = $.extend({},$.fn.jScroll.defaults, options);
		
		return this.each(function(){
			//参数初始化
			//if(!opt) var opt={};
			var timerID;
			var _this = $(this);
			var _list = _this.find("ul:first");
			var _item = _list.find("li:first");
			//内置参数
			opt.itemH = _item.outerHeight(true); 				///单元高度，也是行高
			opt.itemW = _item.outerWidth(true);					///单元宽度
			opt.lineItemNum =  Math.floor(_list.width()/opt.itemW);	///每行单元个数
			opt.lineNum =  Math.ceil(_list.height()/opt.itemH);		///总得行数

			
			switch(opt.dir) {
			case 'up':
				opt.actCss  = "marginTop";
				opt.actStep = - opt.step * opt.itemH;
				opt.actNum  = opt.step * opt.lineItemNum;
				opt.actMove = {marginTop:opt.actStep};
				break;
			case 'left':
				opt.actCss  = "marginLeft";
				opt.actStep = - opt.step * opt.itemW;
				opt.actNum  = opt.step;
				opt.actMove = {marginLeft:opt.actStep};
				_list.css({"white-space":"nowrap",width:10000});
			
				break;
			}
			
			//滚动函数
			var scrollAct=function(){
				//清除冗余延迟
				if(_list.is(":animated"))
				{
					_list.end(true,true);
					_list.css(opt.actCss,0);
				}
				
				_list.animate(opt.actMove,opt.speed,backFn);			
			}
			
			//回调函数
			var backFn = function(){
				_list.find("li:lt("+opt.actNum+")").appendTo(_list);
				_list.css(opt.actCss,0);
			}
			
			//自动播放
			var autoPlay = function(){
				if(opt.timer)timerID = window.setInterval(scrollAct,opt.timer);
			};
			
			//自动停止
			var autoStop = function(){
				if(opt.timer)window.clearInterval(timerID);
			};
			
			//鼠标事件绑定
			_list.hover(autoStop,autoPlay);//.mouseout();
			
			autoPlay();//加这句自动播放
	
		});
	};
	$.fn.jScroll.defaults = {
		dir: 'up',			//滚动方向，'left','right','up','down'
		step:1,				//滚动步伐，一次滚动几步（默认为1）
		speed:500,			//滚动速度，数值越大，速度越慢（毫秒）
		timer:5000,			//滚动间隔，多长时间滚动一次（毫秒）
		
		isEqual:true,		//所有滚动的元素长宽是否相等,true,false
		loop: 0,			//循环滚动次数，0时无限
		eventA:'mousedown',	//鼠标事件，加速
		eventB:'mouseup'	//鼠标事件，原速
	};
	
	$.fn.jScroll.setDefaults = function(settings) {
		$.extend( $.fn.jScroll.defaults, settings );
	};
	
})(jQuery);