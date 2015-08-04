***** Responsive Liquid Tabs *****

What you need - 
The plugin is a ready to use component that could be easily integrated in your application.
If you wish to extend it or modify it all you need is a JavaScript editor or a simple plain text editor. Installed SASS and you are good to go.

What could have been done -
- jQuery would have made the job easy for animation and slide transition, DOM actions, etc.
- If done with jQuery the carousel implementation would also have been simple.

The demo is more of tabs rather than liquid slider.

How to use -
In any application use the below sample code to implement the tabbed slider:

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