/**
 * CLASSLIST SHIM
 * @see https://developer.mozilla.org/en-US/docs/Web/API/element.classList
 */
/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2012-11-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
/*global self, document, DOMException */
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.documentElement)) {
	(function (view) {
		"use strict";
		if (!('HTMLElement' in view) && !('Element' in view)) return;

		var
			  classListProp = "classList"
			, protoProp = "prototype"
			, elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
			, objCtr = Object
			, strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			}
			, arrIndexOf = Array[protoProp].indexOf || function (item) {
				var
					  i = 0
					, len = this.length
				;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			}
			// Vendors: please allow content code to instantiate DOMExceptions
			, DOMEx = function (type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			}
			, checkTokenAndGetIndex = function (classList, token) {
				if (token === "") {
					throw new DOMEx(
						  "SYNTAX_ERR"
						, "An invalid or illegal string was specified"
					);
				}
				if (/\s/.test(token)) {
					throw new DOMEx(
						  "INVALID_CHARACTER_ERR"
						, "String contains an invalid character"
					);
				}
				return arrIndexOf.call(classList, token);
			}
			, ClassList = function (elem) {
				var
					  trimmedClasses = strTrim.call(elem.className)
					, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
					, i = 0
					, len = classes.length
				;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.className = this.toString();
				};
			}
			, classListProto = ClassList[protoProp] = []
			, classListGetter = function () {
				return new ClassList(this);
			}
		;
		// Most DOMException implementations don't allow calling DOMException's toString()
		// on non-DOMExceptions. Error's toString() is sufficient here.
		DOMEx[protoProp] = Error[protoProp];
		classListProto.item = function (i) {
			return this[i] || null;
		};
		classListProto.contains = function (token) {
			token += "";
			return checkTokenAndGetIndex(this, token) !== -1;
		};
		classListProto.add = function () {
			var
				  tokens = arguments
				, i = 0
				, l = tokens.length
				, token
				, updated = false
			;
			do {
				token = tokens[i] + "";
				if (checkTokenAndGetIndex(this, token) === -1) {
					this.push(token);
					updated = true;
				}
			}
			while (++i < l);

			if (updated) {
				this._updateClassName();
			}
		};
		classListProto.remove = function () {
			var
				  tokens = arguments
				, i = 0
				, l = tokens.length
				, token
				, updated = false
			;
			do {
				token = tokens[i] + "";
				var index = checkTokenAndGetIndex(this, token);
				if (index !== -1) {
					this.splice(index, 1);
					updated = true;
				}
			}
			while (++i < l);

			if (updated) {
				this._updateClassName();
			}
		};
		classListProto.toggle = function (token, forse) {
			token += "";

			var
				  result = this.contains(token)
				, method = result ?
					forse !== true && "remove"
				:
					forse !== false && "add"
			;

			if (method) {
				this[method](token);
			}

			return !result;
		};
		classListProto.toString = function () {
			return this.join(" ");
		};

		if (objCtr.defineProperty) {
			var classListPropDesc = {
				  get: classListGetter
				, enumerable: true
				, configurable: true
			};
			try {
				objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
			} catch (ex) { // IE 8 doesn't support enumerable:true
				if (ex.number === -0x7FF5EC54) {
					classListPropDesc.enumerable = false;
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				}
			}
		} else if (objCtr[protoProp].__defineGetter__) {
			elemCtrProto.__defineGetter__(classListProp, classListGetter);
		}
	
	}(self));
}

/**
 * addEventListener SHIM
 * @see https://github.com/jwmcpeak/EventShim/blob/master/eventShim.js
 */
/* Copyright (c) 2012 Jeremy McPeak http://www.wdonline.com
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function() {

    function init() {

        // filter out unsupported browsers
        if (Element.prototype.addEventListener || !Object.defineProperty) {
            return {
                loadedForBrowser : false
            };
        }

        // create an MS event object and get prototype
        var proto = document.createEventObject().constructor.prototype;

        /**
     * Indicates whether an event propagates up from the target.
     * @returns Boolean
     */
        Object.defineProperty(proto, "bubbles", {
            get: function() {
                // not a complete list of DOM3 events; some of these IE8 doesn't support
                var bubbleEvents = ["select", "scroll", "click", "dblclick",
                    "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "wheel", "textinput",
                    "keydown", "keypress", "keyup"],
                    type = this.type;

                for (var i = 0, l = bubbleEvents.length; i < l; i++) {
                    if (type === bubbleEvents[i]) {
                        return true;
                    }
                }

                return false;
            }
        });


        /**
     * Indicates whether or not preventDefault() was called on the event.
     * @returns Boolean
     */
        Object.defineProperty(proto, "defaultPrevented", {
            get: function() {
                // if preventDefault() was never called, or returnValue not given a value
                // then returnValue is undefined
                var returnValue = this.returnValue,
                    undef;

                return !(returnValue === undef || returnValue);
            }
        });


        /**
     * Gets the secondary targets of mouseover and mouseout events (toElement and fromElement)
     * @returns EventTarget or {null}
     */
        Object.defineProperty(proto, "relatedTarget", {
            get: function() {
                var type = this.type;

                if (type === "mouseover" || type === "mouseout") {
                    return (type === "mouseover") ? this.fromElement : this.toElement;
                }

                return null;
            }
        });


        /**
     * Gets the target of the event (srcElement)
     * @returns EventTarget
     */
        Object.defineProperty(proto, "target", {
            get: function() { return this.srcElement; }
        });


        /**
     * Cancels the event if it is cancelable. (returnValue)
     * @returns {undefined}
     */
        proto.preventDefault = function() {
            this.returnValue = false;
        };

        /**
     * Prevents further propagation of the current event. (cancelBubble())
     * @returns {undefined}
     */
        proto.stopPropagation = function() {
            this.cancelBubble = true;
        };

        /***************************************
     *
     * Event Listener Setup
     *    Nothing complex here
     *
     ***************************************/

        /**
     * Determines if the provided object implements EventListener
     * @returns boolean
    */
        var implementsEventListener = function(obj) {
            return (typeof obj !== "function" && typeof obj["handleEvent"] === "function");
        };

        var customELKey = "__eventShim__";

        /**
     * Adds an event listener to the DOM object
     * @returns {undefined}
     */
        var addEventListenerFunc = function(type, handler, useCapture) {
            // useCapture isn't used; it's IE!

            var fn = handler;

            if (implementsEventListener(handler)) {

                if (typeof handler[customELKey] !== "function") {
                    handler[customELKey] = function(e) {
                        handler["handleEvent"](e);
                    };
                }

                fn = handler[customELKey];
            }

            this.attachEvent("on" + type, fn);
        };

        /**
     * Removes an event listener to the DOM object
     * @returns {undefined}
     */
        var removeEventListenerFunc = function(type, handler, useCapture) {
            // useCapture isn't used; it's IE!

            var fn = handler;

            if (implementsEventListener(handler)) {
                fn = handler[customELKey];
            }

            this.detachEvent("on" + type, fn);
        };

        // setup the DOM and window objects
        HTMLDocument.prototype.addEventListener = addEventListenerFunc;
        HTMLDocument.prototype.removeEventListener = removeEventListenerFunc;

        Element.prototype.addEventListener = addEventListenerFunc;
        Element.prototype.removeEventListener = removeEventListenerFunc;

        window.addEventListener = addEventListenerFunc;
        window.removeEventListener = removeEventListenerFunc;

        return {
            loadedForBrowser : true
        };
    }

    // check for AMD support
    if (typeof define === "function" && define["amd"]) {
        define(init);
    } else {
        return init();
    }
    
}());





/**
 * index of polyfill
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      if ( this === undefined || this === null ) {
        throw new TypeError( '"this" is null or not defined' );
      }

      var length = this.length >>> 0; // Hack to convert object.length to a UInt32

      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
      }

      if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }

      for (;fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
          return fromIndex;
        }
      }

      return -1;
    };
  }