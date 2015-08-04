/*
	The naming convention followed here is CD ~= coupon dunia + variable names
*/

(function() {
	// Hack added to accomodate the window resize when viewport changes from mobile to standard browser.
	window.onresize = function() {
		var windowSize = Utils.getViewPortSize();
		if (windowSize.w > 768) {
			document.getElementsByClassName('tabs')[0].style.display = '';
		}
	}

	// Private stuff
	function mapConfig(src, prop) {		
		for (var property in prop) {
			if (prop.hasOwnProperty(property)) {
				src[property] = prop[property];
			}
		}
		return src;
	}

	function createTabs() {		
		var sliderRoot = document.getElementsByClassName('cdSlider')[0];

		// Create a header element to display it in low resolution
		// The text 'Menu' can also be kept configurable
		var minTabMenu = getDOMObjects('h4', 'tab-menu', '');
		var minTabText = getDOMObjects('span', '', 'Menu');
		minTabMenu.appendChild(minTabText);

		Utils.attachEventHandler.add(minTabMenu, 'click', function() {
			showHideTabMenu();
		});

		// Create tab root
		var tabHeadContainer = getDOMObjects('ul', 'tabs', '');

		// Create tab content
		var contentContainer = getDOMObjects('div', 'tab-content', '');

		// Create tab headers
		var tabs = this.options.tabs;
		var count = 0;
		for (var tab in tabs) {
			if (tabs.hasOwnProperty(tab)) {
				// Skeleton
				// Make the first tab as current by default
				var tabList = count === 0 ? getDOMObjects('li', 'tab-head current', '', 'tabHead_' + count) : getDOMObjects('li', 'tab-head', '', 'tabHead_' + count);
				var tabListText = getDOMObjects('a', '', tabs[tab].heading);				

				Utils.attachEventHandler.add(tabList, 'click', function(element) {
					switchTabs(element);
				});			

				tabList.appendChild(tabListText);
				tabHeadContainer.appendChild(tabList);

				// Content
				var tabPanel = getDOMObjects('div', 'tab-panel', '', 'tabPanel_' + count);
				if (count === 0) {
					//tabPanel.style.display = 'block';
					tabPanel.addClass('active');
				}
				var tabHeading = getDOMObjects('h3', '', tabs[tab].heading);
				var tabContent = getDOMObjects('p', '', tabs[tab].content);

				tabPanel.appendChild(tabHeading);
				tabPanel.appendChild(tabContent);
				contentContainer.appendChild(tabPanel);
			}
			count++;
		}

		sliderRoot.appendChild(minTabMenu);
		sliderRoot.appendChild(tabHeadContainer);
		sliderRoot.appendChild(contentContainer);		
	}

	function showHideTabMenu() {
		var menu = document.getElementsByClassName('tabs')[0];

		if (menu.style.display === '' || menu.style.display === 'none') {
			menu.style.display = 'block';
		}
		else {
			menu.style.display = 'none';
		}
	}

	function switchTabs(element) {
		var targetElement = element.target.parentElement || element.target.parentNode;
		var targetElementId = targetElement.id.split('_')[1];
		var sourceElement = document.getElementsByClassName('active')[0];
		var targetContentPanel = document.getElementById('tabPanel_' + targetElementId);
		var sourceTabHead = document.getElementsByClassName('current')[0];
		var targetTabHead = document.getElementById('tabHead_' + targetElementId);

		sourceElement.removeClass('active');
		//sourceElement.style.display = 'none';

		sourceTabHead.removeClass('current');		
		targetTabHead.addClass('current');
		
		targetContentPanel.addClass('active');
		//targetContentPanel.style.display = 'block';
		
		var windowSize = Utils.getViewPortSize();
		if (windowSize.w < 768) {
			document.getElementsByClassName('tabs')[0].style.display = 'none';
		}
	}

	function getDOMObjects(elementType, className, content, elemId) {
		var domElement = document.createElement(elementType);

		className.length && domElement.setAttribute('class', className);

		elemId && domElement.setAttribute('id', elemId);

		if (content.length > 0) {
			domElement.innerHTML = content;
		}

		return domElement;
	}

	// Constructor	
	this.CDSlider = function() {
		var config = {			
			tabCount: 0,
			tabs: {}
		};

		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = mapConfig(config, arguments[0]);
		}
	};

	// Public stuff
	CDSlider.prototype.init = function() {
		// Construct Tabs
		createTabs.call(this);
	};
})();

// Get the ball rolling
var slider = new CDSlider({	
	tabCount: 3,
	tabs: {
		tab1: {
			heading: 'Tab1',
			content: 'Some random text for tab 1'
		},
		tab2: {
			heading: 'Tab2',
			content: 'Some random text for tab 2'
		},
		tab3: {
			heading: 'Tab3',
			content: 'Some random text for tab 3'
		}
	}
});

slider.init();