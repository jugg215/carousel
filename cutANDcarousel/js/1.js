;(function($){
		var Carousel=function(poster){
			var _self=this;
			this.poster=poster;
			this.posterItemMain=poster.find("ul.poster-list");
			this.nextBtn=poster.find("div.poster-next-btn");
			this.prevBtn=poster.find("div.poster-prev-btn");
			this.posterFirstItem=this.posterItemMain.find("li").first();
			this.posterLastItem=this.posterItemMain.find("li").last();
			this.posterItems=poster.find("li.poster-item");
			this.rotateFlag=true;
			this.setting={
				"width":1000,
			"height":270,
			"posterWidth":640,
			"posterHeight":270,
			"scale":0.9,
			"autoPlay":true,
			"delay":2000,
			"speed":500,
			"verticalAlign":"middle"
			};
			
			$.extend(this.setting,this.getSetting());
			this.setSettingValue();
			this.setPosterPos();
			this.nextBtn.click(function(){
				if(_self.rotateFlag){
					_self.rotateFlag=false;
				_self.carouseRotate("left");
				};
			});
			this.prevBtn.click(function(){
				if(_self.rotateFlag){
					_self.rotateFlag=false;
				_self.carouseRotate("right");
				};
			});
			
			if(this.setting.autoPlay){
				this.autoPlay();
				this.poster.hover(function(){
					window.clearInterval(_self.timer);
				},
				                  function(){
				                  	_self.autoPlay();
				                  });
			};
		};
		Carousel.prototype={
			autoPlay:function(){
				var _self=this;
				this.timer=window.setInterval(function(){
					_self.nextBtn.click();
				},this.setting.delay);
			},
			
			carouseRotate:function(dir){
				var _this=this;
				console.log(_this);
				
				if(dir==='left'){
					this.posterItems.each(function(){
						var self=$(this),
						    prev=self.prev().get(0)?self.prev():_this.posterLastItem,
						    width=prev.width(),
						    height=prev.height(),
						    zIndex=prev.css("zIndex"),
						    opacity=prev.css('opacity'),
						    left=prev.css('left'),
						    top=prev.css('top');
						  
						    self.animate({
						    	width:width,
						    	height:height,
						    	zIndex:zIndex,
						    	opacity:opacity,
						    	left:left,
						    	top:top
						    },_this.setting.speed,function(){
						    	_this.rotateFlag=true;
						    });
					});
				}else if(dir==='right'){
					this.posterItems.each(function(){
						var self=$(this),
						    next=self.next().get(0)?self.next():_this.posterFirstItem,
						    width=next.width(),
						    height=next.height(),
						    zIndex=next.css("zIndex"),
						    opacity=next.css('opacity'),
						    left=next.css('left'),
						    top=next.css('top');
						    
						    self.animate({
						    	width:width,
						    	height:height,
						    	zIndex:zIndex,
						    	opacity:opacity,
						    	left:left,
						    	top:top
						    },_this.setting.speed,function(){
						    	_this.rotateFlag=true;
						    });
					});
					
				}
			},
			
			setPosterPos:function(){
				var _self=this;
				console.log(_self);
				var sliceItems=this.posterItems.slice(1),
				sliceSize=sliceItems.size()/2,
				rightSlice=sliceItems.slice(0,sliceSize),
				level=Math.floor(this.posterItems.size()/2),
				leftSlice=sliceItems.slice(sliceSize);
				
				
				
				
				var rw=this.setting.posterWidth,
				    rh=this.setting.posterHeight,
				    gap=(this.setting.width-this.setting.posterWidth)/2/level;
				    
				    
				var firstLeft=(this.setting.width-this.setting.posterWidth)/2;
				var fixOffsetLeft=firstLeft+rw;
				    
				rightSlice.each(function(i){
					level--;
				
					rw=rw*_self.setting.scale;
					rh=rh*_self.setting.scale
					
					var j=i;
					
					$(this).css({
						zIndex:level,
						width:rw,
						height:rh,
						opacity:1/(++j),
						left:fixOffsetLeft+(++i)*gap-rw,
						top:_self.setVertucalAlign(rh)
					});
				});
				var lw=rightSlice.last().width(),
				    lh=rightSlice.last().height(),
				    oloop=Math.floor(this.posterItems.size()/2);
				leftSlice.each(function(i){
					
					$(this).css({
						zIndex:level,
						width:lw,
						height:lh,
						opacity:1/oloop,
						left:i*gap,
						top:_self.setVertucalAlign(lh)
					});
					lw=lw/_self.setting.scale;
					lh=lh/_self.setting.scale;
					oloop--;
				});
			},
			
			setVertucalAlign:function(height){
				var verticalType=this.setting.verticalAlign,
				top=0;
				if(verticalType==='middle'){
					top=(this.setting.height-height)/2;
				}else if(verticalType==='top'){
					top=0;
				}else if(verticalType==='bottom'){
					top=this.setting.height-height;
				}else{top=(this.setting.height-height)/2;}
				return top;
			},
			
			setSettingValue:function(){
				this.poster.css({
					width:this.setting.width,
					height:this.setting.height
				});
				this.posterItemMain.css({
					width:this.setting.width,
					height:this.setting.height
				});
				var w=(this.setting.width-this.setting.posterWidth)/2;
				
				this.nextBtn.css({
					width:w,
					height:this.setting.height,
					zIndex:Math.ceil(this.posterItems.size()/2)
				});
				this.prevBtn.css({
					width:w,
					height:this.setting.height,
					zIndex:Math.ceil(this.posterItems.size()/2)
				});
				this.posterFirstItem.css({
					width:this.setting.posterWidth,
					height:this.setting.posterHeight,
					left:w,
					zIndex:Math.floor(this.posterItems.size()/2)
				});
			},
			
			
			
			
			getSetting:function(){
				var setting=this.poster.attr("data-setting");
				if(setting&&setting!="")
				{
					return $.parseJSON(setting);
				}
				else{
				return {};
				};
			}
		};
		Carousel.init=function(posters){
			var _this_=this;
			posters.each(function(){
				new _this_($(this));
			});
		};
		window["Carousel"]=Carousel;
	})(jQuery);