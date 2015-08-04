Utils = (function() {
	return {
		attachEventHandler: {
			add: function(obj,type,fn) {
				if (obj.attachEvent) {
					obj.attachEvent('on' + type, fn);
				} 
				else{
					obj.addEventListener(type, fn, false);
				}
			},
			remove: function(obj, type, fn) {
				if (obj.detachEvent) {
					obj.detachEvent('on' + type, fn);
				} else{
					obj.removeEventListener(type, fn, false);
				}
			}
		},

		getViewPortSize: function(w) {
			// Use the specified window or the current window if no argument
		    w = w || window;

		    // This works for all browsers except IE8 and before
		    if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };

		    // For IE (or any browser) in Standards mode
		    var d = w.document;
		    if (document.compatMode == "CSS1Compat")
		        return { w: d.documentElement.clientWidth,
		           h: d.documentElement.clientHeight };

		    // For browsers in Quirks mode
		    return { w: d.body.clientWidth, h: d.body.clientHeight };
		}
	}
})();

// Incase HTMLElement is not available
HTMLElement = typeof(HTMLElement) != 'undefiend' ? HTMLElement : Element;

/*
	Adding new methods for adding and removing CSS classes
*/
HTMLElement.prototype.addClass = function(string) {
  if (!(string instanceof Array)) {
    string = string.split(' ');
  }
  for(var i = 0, len = string.length; i < len; ++i) {
    if (string[i] && !new RegExp('(\\s+|^)' + string[i] + '(\\s+|$)').test(this.className)) {
      this.className = this.className.trim() + ' ' + string[i];
    }
  }
}

HTMLElement.prototype.removeClass = function(remove) {
	var newClassName = "";
	var i;
	var classes = this.className.split(" ");
	
	for (i = 0; i < classes.length; i++) {
		if(classes[i] !== remove) {
    		newClassName += classes[i] + " ";
		}
	}
	this.className = newClassName;
}