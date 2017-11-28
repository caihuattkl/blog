(function Fanye() {
	var $obj = {
		animateTime: 500,
		navSelect: $("#js-layoutRight"),
		$groups: $('.section-group'),
		sections: $('.section-group').find('.area-01,.area-02,.area-03,.area-04,.area-05'),
		pageCurrent: 0, //存储当前是那一页
		sectionCount: $('.section-group').find('.area-01,.area-02,.area-03,.area-04,.area-05').length,
		flag: false,
		/*滚轮事件入口,也可以是上一页，写一页的入口*/
		_wheelEvent: function(delta) {
			if(this.flag) return;

			//开始翻页
			if(delta > 0) {
				this.pageCurrent--;
			} else {
				this.pageCurrent++;
			}

			//翻页到结尾时
			if(this.pageCurrent >= this.sectionCount) {
				this.pageCurrent = this.sectionCount-1;
			};

			//起始页
			if(this.pageCurrent <= 0) {
				this.pageCurrent = 0;
			}

			//如果当前在翻页就停止
			this.flag = true;


			$obj.sections.css({
				'transform': 'translateY(-' + $obj.pageCurrent * 100 + '%)',
				'transition': 'all ' + this.animateTime + 'ms'
			});

			setTimeout(function() {
				$obj.flag = false;
			}, this.animateTime);

			//鼠标滚轮滑动时,右侧菜单样式切换
			this.navSelect.find('li>a').removeClass('current');
			this.navSelect.find('li:nth-child(' + (this.pageCurrent + 1) + ')').find('a').addClass('current');
		},
		_menuTabClickSwith: function(current) {
			if(this.flag) return;
			this.flag = true;
			this.pageCurrent=current;
			$obj.sections.css({
				'transform': 'translateY(-' + current * 100 + '%)',
				'transition': 'all ' + this.animateTime + 'ms'
			});

			setTimeout(function() {
				$obj.flag = false;
			}, this.animateTime);
		},
		_menuTabClick: function() {
			var li = null,
				navIndex = null;
			this.navSelect.find('ul li').click(function() {
				li = $(this);
				li.parent().find('.em').removeClass('current');
				li.find('.em').addClass('current');
				navIndex = li.index();
				//下-1 上1
				$obj._menuTabClickSwith(navIndex)

			})
		},
		_init: function() {
			this._menuTabClick();
			this._addEvent();
			return this;
		},
		_addEvent: function() {
			$(document).bind('mousewheel', function(event, delta) {
				$obj._wheelEvent(delta);
			});

		}
	}
	return $obj;

})()._init();