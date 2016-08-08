	
	"use strict";

	class xEl {

		constructor (el, data) {
			this.element 	= el.constructor.name == "String" ? document.createElement(el) : el;
			this.data 		= data || {};

			xEl.assignProperties(this.element, this.data);
		}

		getElement () {
			return this.element;
		}

		set (a1, a2) {
			if(a1.constructor.name == "String")
				xEl.assignProperties(this.element, { [a1]: a2 });
			else
				xEl.assignProperties(this.element, a1);
		}

		hide () { 
			this.element.style.setProperty("display", "none");
			return this; 
		}
		
		destroy () { 
			this.element.parentNode.removeChild(this.element); 
		}
		
		show () { 
			this.element.style.setProperty("display", "");
			return this;
		}
		
		fadeIn () { 
			this.element.style.setProperty("opacity", "1");
			return this;
		}
		
		fadeOut () { 
			this.element.style.setProperty("opacity", "0");
			return this;
		}
		
		before (el) { 
			this.element.parentNode.insertBefore(el, this.element);
			return this;
		}
		
		append (el) { 
			this.element.appendChild(el.constructor.name == "xEl" ? el.getElement() : el);
			return this;
		}
		
		appendChildren (childs) {
			childs.forEach(i => i ? this.append(i) : null); 
			return this;
		}
		
		beforeChildren (childs) { 
			childs.forEach(i => i ? this.element.parentNode.insertBefore(i, this.element) : null);
			return this;
		}
		
		clr () { 
			this.element.innerHTML = "";
			return this;
		}
		
		on (on, cb) { 
			this.element.addEventListener(on, cb); return this; 
		}
		
		$ (id) { 
			return $(id, this.element); 
		}

		static assignProperties (el, dat) {
			Object.entries(dat).forEach(([k, v]) => k != "dataset" && k != "style" ? el[k] = v : null);
			if(dat.style)
				Object.entries(dat.style).forEach(([k, v]) => el.style.setProperty(k, v));
			if(dat.dataset)
				Object.entries(dat.dataset).forEach(([k, v]) => el.dataset[k] = v);
		}

		static genHTMLnative (html) {
			var element 		= html[0] && html[0].constructor.name == "String" ? document.createElement(html[0]) : html[0];
			var properties 		= html[1] && html[1].constructor.name == "Object" ? html[1] : {};
			var children 		= html[1] && html[1].constructor.name == "Object" ? html[2] : html[1];
				children 		= children ? children : [];

			xEl.assignProperties(element, properties);

			children.map(e => e.constructor.name != "Array" ? e : xEl.genHTMLnative(e)).forEach(e => element.appendChild(e));

			return element;
		}

		static genHTML (html) {
			var properties 		= html[1] && html[1].constructor.name == "Object" ? html[1] : {};
			var element 		= new xEl(html[0], properties);

			var children 		= html[1] && html[1].constructor.name == "Object" ? html[2] : html[1];
				children 		= children ? children : [];

			children.map(e => e.constructor.name != "Array" ? e : xEl.genHTML(e)).forEach(e => element.append(e));

			return element;
		}

	}