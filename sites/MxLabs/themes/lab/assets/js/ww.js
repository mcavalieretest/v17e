/*! 
 * Name: ibm.com v17e JS file
 * Version $Id: ww.js 3367 2014-04-04 17:56:28Z mcavaliere $
 * Owner: Corporate Webmaster (NUS_N_NIWWW)
 * Copyright (c) 2013 IBM Corporation
 */

// URI: www.ibm.com/common/v17e/js/ww.js
// Description: Official JS file for v17e project
//

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-mq-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;
window.Modernizr = function(a, b, c) {
    function D(a) {
        j.cssText = a
    }

    function E(a, b) {
        return D(n.join(a + ";") + (b || ""))
    }

    function F(a, b) {
        return typeof a === b
    }

    function G(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function H(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!G(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function I(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : F(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function J(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + p.join(d + " ") + d).split(" ");
        return F(b, "string") || F(b, "undefined") ? H(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), I(e, b, c))
    }

    function K() {
        e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
            return u.list && (u.list = !! b.createElement("datalist") && !! a.HTMLDataListElement), u
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !! e;
            return t
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var d = "2.6.2",
        e = {}, f = !0,
        g = b.documentElement,
        h = "modernizr",
        i = b.createElement(h),
        j = i.style,
        k = b.createElement("input"),
        l = ":)",
        m = {}.toString,
        n = " -webkit- -moz- -o- -ms- ".split(" "),
        o = "Webkit Moz O ms",
        p = o.split(" "),
        q = o.toLowerCase().split(" "),
        r = {
            svg: "http://www.w3.org/2000/svg"
        }, s = {}, t = {}, u = {}, v = [],
        w = v.slice,
        x, y = function(a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"),
                m = b.body,
                n = m || b.createElement("body");
            if (parseInt(d, 10))
                while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !! i
        }, z = function(b) {
            var c = a.matchMedia || a.msMatchMedia;
            if (c) return c(b).matches;
            var d;
            return y("@media " + b + " { #" + h + " { position: absolute; } }", function(b) {
                d = (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle)["position"] == "absolute"
            }), d
        }, A = function() {
            function d(d, e) {
                e = e || b.createElement(a[d] || "div"), d = "on" + d;
                var f = d in e;
                return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = F(e[d], "function"), F(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f
            }
            var a = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return d
        }(),
        B = {}.hasOwnProperty,
        C;
    !F(B, "undefined") && !F(B.call, "undefined") ? C = function(a, b) {
        return B.call(a, b)
    } : C = function(a, b) {
        return b in a && F(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = w.call(arguments, 1),
            e = function() {
                if (this instanceof e) {
                    var a = function() {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(w.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return c.apply(b, d.concat(w.call(arguments)))
            };
        return e
    }), s.flexbox = function() {
        return J("flexWrap")
    }, s.flexboxlegacy = function() {
        return J("boxDirection")
    }, s.canvas = function() {
        var a = b.createElement("canvas");
        return !!a.getContext && !! a.getContext("2d")
    }, s.canvastext = function() {
        return !!e.canvas && !! F(b.createElement("canvas").getContext("2d").fillText, "function")
    }, s.webgl = function() {
        return !!a.WebGLRenderingContext
    }, s.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = a.offsetTop === 9
        }), c
    }, s.geolocation = function() {
        return "geolocation" in navigator
    }, s.postmessage = function() {
        return !!a.postMessage
    }, s.websqldatabase = function() {
        return !!a.openDatabase
    }, s.indexedDB = function() {
        return !!J("indexedDB", a)
    }, s.hashchange = function() {
        return A("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }, s.history = function() {
        return !!a.history && !! history.pushState
    }, s.draganddrop = function() {
        var a = b.createElement("div");
        return "draggable" in a || "ondragstart" in a && "ondrop" in a
    }, s.websockets = function() {
        return "WebSocket" in a || "MozWebSocket" in a
    }, s.rgba = function() {
        return D("background-color:rgba(150,255,150,.5)"), G(j.backgroundColor, "rgba")
    }, s.hsla = function() {
        return D("background-color:hsla(120,40%,100%,.5)"), G(j.backgroundColor, "rgba") || G(j.backgroundColor, "hsla")
    }, s.multiplebgs = function() {
        return D("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background)
    }, s.backgroundsize = function() {
        return J("backgroundSize")
    }, s.borderimage = function() {
        return J("borderImage")
    }, s.borderradius = function() {
        return J("borderRadius")
    }, s.boxshadow = function() {
        return J("boxShadow")
    }, s.textshadow = function() {
        return b.createElement("div").style.textShadow === ""
    }, s.opacity = function() {
        return E("opacity:.55"), /^0.55$/.test(j.opacity)
    }, s.cssanimations = function() {
        return J("animationName")
    }, s.csscolumns = function() {
        return J("columnCount")
    }, s.cssgradients = function() {
        var a = "background-image:",
            b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            c = "linear-gradient(left top,#9f9, white);";
        return D((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), G(j.backgroundImage, "gradient")
    }, s.cssreflections = function() {
        return J("boxReflect")
    }, s.csstransforms = function() {
        return !!J("transform")
    }, s.csstransforms3d = function() {
        var a = !! J("perspective");
        return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
            a = b.offsetLeft === 9 && b.offsetHeight === 3
        }), a
    }, s.csstransitions = function() {
        return J("transition")
    }, s.fontface = function() {
        var a;
        return y('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
            var e = b.getElementById("smodernizr"),
                f = e.sheet || e.styleSheet,
                g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0
        }), a
    }, s.generatedcontent = function() {
        var a;
        return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
            a = b.offsetHeight >= 3
        }), a
    }, s.video = function() {
        var a = b.createElement("video"),
            c = !1;
        try {
            if (c = !! a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
        } catch (d) {}
        return c
    }, s.audio = function() {
        var a = b.createElement("audio"),
            c = !1;
        try {
            if (c = !! a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "")
        } catch (d) {}
        return c
    }, s.localstorage = function() {
        try {
            return localStorage.setItem(h, h), localStorage.removeItem(h), !0
        } catch (a) {
            return !1
        }
    }, s.sessionstorage = function() {
        try {
            return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0
        } catch (a) {
            return !1
        }
    }, s.webworkers = function() {
        return !!a.Worker
    }, s.applicationcache = function() {
        return !!a.applicationCache
    }, s.svg = function() {
        return !!b.createElementNS && !! b.createElementNS(r.svg, "svg").createSVGRect
    }, s.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
    }, s.smil = function() {
        return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate")))
    }, s.svgclippaths = function() {
        return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath")))
    };
    for (var L in s) C(s, L) && (x = L.toLowerCase(), e[x] = s[L](), v.push((e[x] ? "" : "no-") + x));
    return e.input || K(), e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a) C(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, D(""), i = k = null, e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.mq = z, e.hasEvent = A, e.testProp = function(a) {
        return H([a])
    }, e.testAllProps = J, e.testStyles = y, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e
}(this, this.document),
function(a, b, c) {
    function d(a) {
        return "[object Function]" == o.call(a)
    }

    function e(a) {
        return "string" == typeof a
    }

    function f() {}

    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function() {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function() {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }
        var j = j || B.errorTimeout,
            l = b.createElement(a),
            o = 0,
            r = 0,
            u = {
                t: d,
                s: c,
                e: f,
                a: i,
                x: j
            };
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
        var a = B;
        return a.loader = {
            load: j,
            i: 0
        }, a
    }
    var l = b.documentElement,
        m = a.setTimeout,
        n = b.getElementsByTagName("script")[0],
        o = {}.toString,
        p = [],
        q = 0,
        r = "MozAppearance" in l.style,
        s = r && !! b.createRange().compareNode,
        t = s ? l : n.parentNode,
        l = a.opera && "[object Opera]" == o.call(a.opera),
        l = !! b.attachEvent && !l,
        u = r ? "object" : l ? "script" : "img",
        v = l ? "script" : u,
        w = Array.isArray || function(a) {
            return "[object Array]" == o.call(a)
        }, x = [],
        y = {}, z = {
            timeout: function(a, b) {
                return b.length && (a.timeout = b[0]), a
            }
        }, A, B;
    B = function(a) {
        function b(a) {
            var a = a.split("!"),
                b = x.length,
                c = a.pop(),
                d = a.length,
                c = {
                    url: c,
                    origUrl: c,
                    prefixes: a
                }, e, f, g;
            for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++) c = x[f](c);
            return c
        }

        function g(a, e, f, g, h) {
            var i = b(a),
                j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (j = function() {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    }), g(a, j, b, 0, h);
                    else if (Object(a) === a)
                        for (n in m = function() {
                            var b = 0,
                                c;
                            for (c in a) a.hasOwnProperty(c) && b++;
                            return b
                        }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        } : j[n] = function(a) {
                            return function() {
                                var b = [].slice.call(arguments);
                                a && a.apply(this, b), l()
                            }
                        }(k[n])), g(a[n], j, b, n, h))
                } else !c && l()
            }
            var h = !! a.test,
                i = a.load || a.both,
                j = a.callback || f,
                k = j,
                l = a.complete || f,
                m, n;
            c(h ? a.yep : a.nope, !! i), i && c(i)
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0);
        else if (w(a))
            for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
        else Object(a) === a && h(a, l)
    }, B.addPrefix = function(a, b) {
        z[a] = b
    }, B.addFilter = function(a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k = b.createElement("script"),
            l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d) k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function() {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var e = b.createElement("link"),
            j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
};

// Load ibm.com Dojo
(function() {
    document.write('<script type="text/javascript" src="' +
        '//1.www.s81c.com/common/js/dojo/www.js' +
        //'/lab_v17e_clean/assets/js/www.js'+
        '"></' + 'script>');
})('loadDojo');

// v17e prototyping functions
// ibmcom.mobTabs() = convert leadspace tabs into system dropdown on mobile <= 568 viewport

jQuery.noConflict();

var CHICKENFEED = {};

/**
 * mlpushmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;
(function(window, $, IBM) {
    var iOSCheck = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    'use strict';

    // taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
    function hasParent(e, id) {
        if (!e) return false;
        var el = e.target || e.srcElement || e || false;
        while (el && el.id != id) {
            el = el.parentNode || false;
        }
        return (el !== false);
    }

    // returns the depth of the element "e" relative to element with id=id ()
    // for this calculation only parents with classname = waypoint (m-level) are considered
    function getLevelDepth(e, id, waypoint, cnt) {

        cnt = cnt || 0;
        if (e.id.indexOf(id) >= 0) return cnt;
        if (jQuery(e).hasClass(waypoint)) {
            ++cnt;
        }
        return e.parentNode && getLevelDepth(e.parentNode, id, waypoint, cnt);
    }

    // http://coveroverflow.com/a/11381730/989439
    function mobilecheck() {
        var check = false;
        (function(a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    // returns the closest element to 'e' that has class "classname"
    function closest(e, classname) {
        if (jQuery(e).hasClass(classname)) {
            return e;
        }
        return e.parentNode && closest(e.parentNode, classname);
    }

    function mlPushMenu(el, container, trigger, options) {
        this.el = el; // The element containing all menus on the page. 
        this.container = container; // The element containing only this particular menu. 
        // Separating this.el and this.container allows us to have 
        //   two menus overlapping each other that look like one, but 
        //   behave a little differently. 

        this.trigger = trigger;
        this.options = $.extend(this.defaults, options);
        // support 3d transforms
        this.support = Modernizr.csstransforms3d;
        // need to catch IE9 - while it doesn't support CSS transform 3d, id does support CSS for possible fallback - see adaptive.scss - selectors with .no-csstransforms3d
        this.isIE9 = jQuery.support.cssFloat;
        if ((this.support) || (this.isIE9)) {
            this._init();
        }


    }

    mlPushMenu.prototype = {
        defaults: {
            // overlap: there will be a gap between open levels
            // cover: the open levels will be on top of any previous open level
            type: 'cover', // overlap || cover
            // space between each overlaped level
            levelSpacing: 40,
            // classname for the element (if any) that when clicked closes the current level
            backClass: 'm-back',

            // Added by Mike Cavaliere. Set to true, and the container height will animate 
            //  to the height of the selected level.
            animateContainerHeight: false
        },
        _init: function() {
            // if menu is open or not
            this.open = false;
            // level depth
            this.level = 0;
            // the moving wrapper
            this.wrapper = document.getElementById('m-shift');
            // the m-level elements
            this.levels = Array.prototype.slice.call(this.el.querySelectorAll('div.m-level'));
            // (Added by Mike Cavaliere) Keep track of the current element by pushing them onto an array.
            // Start with the first level by default.
            this.levelElementStack = [this.levels[0]];
            // save the depth of each of these m-level elements
            var self = this;
            this.levels.forEach(function(el, i) {
                el.setAttribute('data-level', getLevelDepth(el, self.el.id, 'm-level'));
            });
            // the menu items
            this.menuItems = Array.prototype.slice.call(this.el.querySelectorAll('li'));
            // if type == "cover" these will serve as hooks to move back to the previous level
            this.levelBack = Array.prototype.slice.call(this.el.querySelectorAll('.' + this.options.backClass));
            // event type (if mobile use touch events)
            this.eventtype = mobilecheck() ? 'touchstart' : 'click';
            // add the class m-overlap or m-cover to the main element depending on options.type
            jQuery(this.el).addClass('m-' + this.options.type);
            // initialize / bind the necessary events
            this._initEvents();
        },

        _initEvents: function() {
            var self = this;

            // open (or close) the menu
            $(this.trigger).on(this.eventtype, function(ev) {
                ev.stopPropagation();
                ev.preventDefault();

                if (self.open) {
                    self._resetMenu();
                } else {
                    self._openLevel();

                }
            });

            $(window).on("resize", function() {
                self._setHeight();
            });

        },

        _getActualMenuHeight: function() {
            var copy = $("#m-menu").clone(),
                height;

            copy.css({
                position: "absolute",
                top: "-10000px"
            });

            copy.appendTo($(document.body));

            height = copy.height();

            copy.remove();

            return height;
        },

        _setHeight: function(open) {
            if (!iOSCheck) {
                return;
            }

            var height,
                mNavHeightCheck = this._getActualMenuHeight(),
                viewportHeight = jQuery(window).height();

            if (open === true) {
                if (mNavHeightCheck > viewportHeight) {
                    height = mNavHeightCheck;
                } else {
                    height = '100%';
                }
            } else if (open === false) {
                height = 'auto';
            }

            $('#m-wrap').css("height", height);
        },

        // Opens a single menu 'level'
        _openLevel: function(subLevel) {
            var self = this;
            $(this.wrapper).addClass('m-shift');
            if (self.operationInProgress) {
                return;
            }

            self.operationInProgress = true;

            var self = this;

            // the menu should close if clicking somewhere on the body
            var bodyClickFn = function(el) {
                self._resetMenu();
                el.removeEventListener(self.eventtype, bodyClickFn);
            };

            // the menu should close if clicking somewhere on the body (excluding clicks on the menu)
            document.addEventListener(self.eventtype, function(ev) {
                if (self.open && !hasParent(ev.target, self.el.id)) {
                    // Avoid 300ms touch delay on mobile browsers
                    ev.preventDefault()
                    ev.stopPropagation();

                    bodyClickFn(this);
                }
            });

            // check height of menu contents.  need to do this to prevent the choppy scrolling on iPad / iPhone. this is enabled to force a taller view on iPhone landscape mode.
            var self = this;

            $('html').addClass('m-menu-open');

            this._setHeight(true);

            // increment level depth
            ++this.level;

            // move the main wrapper
            var levelFactor = (this.level - 1) * this.options.levelSpacing,
                translateVal = this.el.offsetWidth;

            if (subLevel) {
                // reset transform for sublevel
                this._setTransform('', subLevel);
                // need to reset the translate value for the level menus that have the same level depth and are not open
                for (var i = 0, len = this.levels.length; i < len; ++i) {
                    var levelEl = this.levels[i];

                }
            }
            // add class m-enable to main wrapper if opening the first time
            if (this.level === 1) {
                this._disableDrag();

                if (Modernizr.csstransforms3d) {
                    $("#m-menu").show();

                    setTimeout(function() {
                        $(self.wrapper).addClass('m-enable');

                        self.open = true;
                        self.operationInProgress = false;

                        if (self.options.onOpen) {
                            self.options.onOpen();
                        }
                    }, 50)

                } else {
                    /* relative positioning version*/
                    $("#m-menu").show();
                    $(self.wrapper).animate({
                        left: "-250px"
                    }, function() {
                        self.open = true;
                        self.operationInProgress = false;

                        if (self.options.onOpen) {
                            self.options.onOpen();
                        }
                    });



                }
            }
            // add class m-level-open to the opening level element
            // var levelElement = jQuery(subLevel || this.levels[0]);
            // levelElement.addClass( 'm-level-open' );

            // this.levelElementStack.push(levelElement[0]);

            // this._updateContainerHeight();
        },
        // close the menu
        _resetMenu: function() {
            var self = this;

            if (self.operationInProgress) {
                return;
            }

            self.operationInProgress = true;

            // Override close animation. Used when auto-closing on window resize in IE9.
            var animate = (arguments.length > 0 ? arguments[0] : true);

            // reset left mobile menu height.  need to do this to prevent the choppy scrolling on iPad / iPhone.
            this._setHeight(false);

            this.level = 0;

            var closeFunc = function() {
                $('html').removeClass('m-menu-open');
                $("#m-menu").hide();

                self.operationInProgress = false;
                $('#m-shift').removeClass('m-shift');
            };

            // Good browsers
            if (Modernizr.csstransforms3d) {
                $(this.wrapper).one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd mozTransitionEnd", function() {
                    setTimeout(closeFunc, 200);
                });
                $(this.wrapper).removeClass('m-enable');
            } else {

                if (animate) {
                    // IE9 fallback animation
                    $(this.wrapper).animate({
                        left: "0px"
                    }, closeFunc);
                } else {
                    // IE9, hide without animation when auto-closing menu, to avoid choppiness. 
                    $(this.wrapper).css("left", "0px");
                    closeFunc();
                }
            }

            this.open = false;

            if (this.options.onClose) {
                this.options.onClose();
            }
        },

        // translate the el
        _setTransform: function(val, el) {
            el = el || this.wrapper;
            el.style.WebkitTransform = val;
            el.style.MozTransform = val;
            el.style.transform = val;
        },

        _getCurrentLevelElement: function() {
            return this.levelElementStack[this.levelElementStack.length - 1];
        },
        _emptyFunc: function(ev) {
            ev.preventDefault();
        },
        _enableDrag: function() {
            // $('body').unbind('touchmove', this._emptyFunc);    	
        },
        _disableDrag: function() {
            // $('body').bind('touchmove', this._emptyFunc);    	
        }
    }

    // add to global namespace
    window.mlPushMenu = mlPushMenu;

})(window, jQuery, CHICKENFEED);




(function($, IBM) {
    /**
   * Creates namespaces to be used for scoping variables and classes so that they are not global.
   * Specifying the last node of a namespace implicitly creates all other nodes.
   * Taken from ExtJS and tailored. Usage:
   * <pre><code>
IBM.namespace('Company', 'Company.data');
IBM.namespace('Company.data'); // equivalent and preferable to above syntax
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
     </code></pre>
   * @param {String} namespace1
   * @param {String} namespace2
   * @param {String} etc
   * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
   * @method namespace
   */
    IBM.namespace = function() {
        var scope = arguments[0],
            ln = arguments.length,
            i, value, split, x, xln, parts, object;

        // debugger

        for (i = 1; i < ln; i++) {
            value = arguments[i];
            parts = value.split(".");
            object = scope[parts[0]] = Object(scope[parts[0]]);
            for (x = 1, xln = parts.length; x < xln; x++) {
                object = object[parts[x]] = Object(object[parts[x]]);
            }
        }
        return object;
    };


    // Shortcut
    IBM.ns = IBM.namespace;

    IBM.ns(
        IBM,
        "Common",
        "Common.Widget",
        "Common.Util",
        "Common.Vendor",
        "W3",
        "W3.Widget",
        "W3.Util",
        "WWW",
        "WWW.Widget",
        "WWW.Util",
        "Common.Widget.Accordion",
        "Common.Widget.MobileMenu",
        "CurrentPage"
    );

    // Placeholder for browser detection; to be replaced when we start using the browser plugin.
    $.browser = {
        firefox: (function() {
            return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;;
        })()
    };

    IBM.Common.Widget.Accordion = function(opts) {
        this.init(opts);
    };

    IBM.Common.Widget.Accordion.prototype = {
        init: function(opts) {
            var defaults = {},
                self = this;

            this.options = $.extend({}, defaults, opts);
            this.container = $(this.options.container);

            function toggleList(list) {
                var target = list,
                    heading = target.prev("h2");

                // If we're closing this list, close my children too. 
                if (target.hasClass("active")) {
                    target = target.find("ul").andSelf();
                    target.removeClass("active");
                    heading.removeClass("active");
                } else {
                    target.addClass("active");
                    heading.addClass("active");
                }
            }

            this.container.on("click", "h2", function(e) {
                var target = $(this).next("ul");

                toggleList(target);
            });

            /*
      this.container.on("click", "a", function(e) {
        e.preventDefault();

        // Some other events on top of this are making this respond slowly;
        // calling stopPropagation() partially resolves this. 
        e.stopPropagation(); 

        var target = $(this).next("ul");

        toggleList(target);
      });
      */
        },

        reset: function() {
            this.container
                .find("h2,ul").removeClass("active");
        }


    };

    IBM.Common.Widget.MobileMenu = (function() {

        function whenMastheadLinksAvailable(callback) {
            var mLinksCheckFunction = function() {
                if (jQuery('#ibm-menu-links').children('li').eq(1).length) {
                    clearInterval(IBM.CurrentPage.checkMLinksExist);

                    callback();
                }
            };

            // Loop till masthead links are available.  When available, prepend them to #m-shift
            IBM.CurrentPage.checkMLinksExist = setInterval(mLinksCheckFunction, 200); // check every 200ms             
        }

        function insertPushMenuWrapperHtml() {
            if (jQuery('#ibm-top').length > 0) {
                jQuery('#ibm-top').wrap('<div id="m-wrap"><div id="m-shift" class=""><div class="m-content"></div></div></div>');
            }
        }

        function insertHamburgerHtml() {
            // Hamburger icon, for toggling mobile nav.
            jQuery('#ibm-universal-nav').append('<p id="m-open-link"><a href="#" id="m-navigation">Mobile navigation</a></p>');
        }

        function insertMobileMenuHtml() {
            // Inject the mobile menu html
            var mastLinks = jQuery('#ibm-menu-links').html();

            jQuery('#m-shift').prepend(
                '<div id="m-menu" class="m-menu">' + '<div id="m-search-module">' + '<form id="m-search-form" action="http://www.ibm.com/Search/" method="get">' + '<input id="m-q" value="" maxlength="100" name="q" type="text" placeholder="search ibm.com" />' + '<input type="submit" id="m-search" class="ibm-btn-search" value="Submit"/>' + '</form>' + '</div>'

                + '<div id="m-menu-scroll">' + '<div id="m-main-menu">' + '<h2>IBM.com</h2>' + '<ul>' + mastLinks + '</ul>' + '</div>' + '</div>' + '</div>'
            );
        }

        function initPushMenu(config) {
            // Push menu for showing/hiding container
            IBM.CurrentPage.mobileMenuMain = new mlPushMenu(
                document.getElementById('m-menu'),
                document.getElementById('m-main-menu'),
                document.getElementById('m-navigation'), {
                    onOpen: function() {
                        if (IBM.CurrentPage.accordion) {
                            IBM.Common.Widget.MobileMenu.expandDefaultMenu();
                        }
                    },
                    onClose: function() {
                        if (IBM.CurrentPage.accordion) {
                            IBM.CurrentPage.accordion.reset();
                        }
                    }
                }
            );

            // Close the menu automatically when the viewport gets too wide. 
            $(window).resize(function() {
                if (config.closeOnMaxWidth && $(window).width() > config.maxViewportWidth) {
                    IBM.CurrentPage.mobileMenuMain._resetMenu(false);
                }

                // Reposition the hamburger when resizing the page. 
                // TODO - handle with CSS when megamenu.js has been ported
                //  to jQuery. Currently impossible since the dojo version 
                //  repositions the #ibm-masthead when scrolling.
                setHamburgerPosition();
            });

            $(window).scroll(function() {
                setHamburgerPosition();
            });

            // Search placeholder text polyfill for IE9.
            if (!Modernizr.input.placeholder) {
                $('#m-q').focus(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                        input.removeClass('placeholder');
                    }
                }).blur(function() {
                    var input = $(this);
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.addClass('placeholder');
                        input.val(input.attr('placeholder'));
                    }
                }).blur();

                $('#m-q').parents('form').submit(function() {
                    $(this).find('[placeholder]').each(function() {
                        var input = $(this);
                        if (input.val() == input.attr('placeholder')) {
                            input.val('');
                        }
                    });
                });
            }

            // Set the initial position
            setHamburgerPosition();
        }

        function insertLocalMenuHtml() {
            // Duplicate & inject the local nav html
            var tabContent = $(
                '<div id="m-local-menu">' + '<h2>' + $("h1").html() + '</h2>' + '<ul>' + $('#ibm-primary-tabs .ibm-tabs').html() + '</ul>' + '</div>'
            );

            tabContent.find("ul").removeClass("ibm-tabs");
            tabContent.appendTo("#m-menu-scroll");
        }

        function initAccordion() {
            // Create the accordion
            IBM.CurrentPage.accordion = new IBM.Common.Widget.Accordion({
                container: "#m-menu-scroll"
            });
        }

        function expandDefaultMenu() {
            setTimeout(function() {
                var targets;

                if ($("#m-local-menu").length) {
                    targets = $("#m-local-menu").children("h2,ul");
                } else {
                    targets = $("#m-main-menu").children("h2,ul");
                }

                targets.addClass("active");
            }, 250);
        }

        function setHamburgerPosition() {
            var hamb = $("#m-open-link"),
                offset = Math.abs($(window).width() - hamb.offsetParent().width()) - $(window).scrollLeft();

            hamb.css("right", offset + "px");
        }

        function init(options) {
            //default config values
            var defaults = {
                closeOnMaxWidth: true,
                maxViewportWidth: 800
            };

            if (typeof(options) === "undefined") {
                var options = {};
            }

            this.config = $.extend({}, defaults, options);

            // Allow site owners to disable the menu via html.
            if ($("html").hasClass("m-menu-disabled")) {
                return;
            }

            insertPushMenuWrapperHtml();

            whenMastheadLinksAvailable(function() {
                insertMobileMenuHtml();
                insertHamburgerHtml();
                initPushMenu(IBM.Common.Widget.MobileMenu.config);

                if ($('#ibm-primary-tabs').length) {
                    insertLocalMenuHtml();
                }

                initAccordion();
            });
        }

        return {
            whenMastheadLinksAvailable: whenMastheadLinksAvailable,
            insertPushMenuWrapperHtml: insertPushMenuWrapperHtml,
            insertHamburgerHtml: insertHamburgerHtml,
            insertMobileMenuHtml: insertMobileMenuHtml,
            initPushMenu: initPushMenu,
            insertLocalMenuHtml: insertLocalMenuHtml,
            initAccordion: initAccordion,
            expandDefaultMenu: expandDefaultMenu,
            init: init
        };
    })();

})(jQuery, CHICKENFEED);


jQuery(function() {

    var ibmcom = {

        mobTabs: function() {

            // Check if primary tabs exists
            if (jQuery('#ibm-primary-tabs').length)

                jQuery("#ibm-primary-tabs").addClass("ibm-no-mobile").after('<form class="ibm-menu-list ibm-mobile" action="http://www.ibm.com/links" id="ibm-mobile-tabs"><div><select></select></div></form>');

            // Loop through each link under primary tabs and convert it to a dropdown list
            jQuery('#ibm-primary-tabs li').each(function() {

                var selectedLink = jQuery(this).hasClass('ibm-active');

                if (selectedLink) {
                    selectedLink = 'selected="selected"'
                } else {
                    selectedLink = '';
                }
                var isSubPage = this.parentNode.parentNode.tagName.toLowerCase() === 'li';
                jQuery('#ibm-mobile-tabs select').append('<option ' +

                    selectedLink +

                    ' value="' + jQuery(this).find("a").eq(0).attr('href') + '">' +
                    (isSubPage ? '&emsp;&#x21b3; ' : '') + jQuery(this).find("a").eq(0).text() +
                    '</option>');

                // check for change on dropdown list and submit value to window.location
                jQuery('#ibm-mobile-tabs select').change(

                    function() {
                        window.location = jQuery(this).val();
                    });

            });

        },

        init: function() {

            // init primary tabs to dropdown list function
            ibmcom.mobTabs();

        }

    };

    ibmcom.init();

    (function($, IBM) {
        IBM.Common.Widget.MobileMenu.init({
            closeOnMaxWidth: false
        });
    })(jQuery, CHICKENFEED);

});


// Blog leadspace clicking entire image container
jQuery(function() {

    jQuery('#ibm-leadspace-body .ibm-columns').live('click', function(e) {

        jQuery(location).attr('href', jQuery(this).find("a").attr('href'));

    });

});