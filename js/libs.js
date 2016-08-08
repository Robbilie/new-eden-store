
	"use strict";

	window.$ = (id, el) => { let r = (el || document).querySelectorAll(id); if(r.length > 1) return r; else return r[0]; };

	Object.defineProperty(Storage.prototype, 'load', {
		value: function (key) {
			return JSON.parse(this.getItem(key));
		},
		configurable: true,
		writable: true
	});

	Object.defineProperty(Storage.prototype, 'save', {
		value: function (key, value) {
			return this.setItem(key, JSON.stringify(value));
		},
		configurable: true,
		writable: true
	});

	Object.defineProperty(String.prototype, 'capitalizeFirstLetter', {
		value: function () {
			return this
				.charAt(0)
				.toUpperCase() + this.slice(1);
		},
		configurable: true,
		writable: true
	});

	if(!Object.entries)
	Object.defineProperty(Object.prototype, 'entries', {
		value: function (obj) {
			return Object.keys(obj).map(k => [k, obj[k]]);
		},
		configurable: true,
		writable: true
	});