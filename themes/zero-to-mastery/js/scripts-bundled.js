/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
! function() {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.Context.refreshAll();
        for (var e in i) i[e].enabled = !0;
        return this
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var o = e[i],
                n = o.newScroll > o.oldScroll,
                r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s];
                if (null !== a.triggerPoint) {
                    var l = o.oldScroll < a.triggerPoint,
                        h = o.newScroll >= a.triggerPoint,
                        p = l && h,
                        u = !l && !h;
                    (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
                }
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function(t) {
        return o[t.waypointContextKey]
    }, window.onload = function() {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function(e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }
    var o = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
        t[o] = e[o]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var i = [],
                o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();
(function($) {
    $.fn.toggleAttrVal = function(attr, val1, val2) {
        var test = $(this).attr(attr);
        if (test === val1) {
            $(this).attr(attr, val2);
            return this;
        }
        if (test === val2) {
            $(this).attr(attr, val1);
            return this;
        }
        // default to val1 if neither
        $(this).attr(attr, val1);
        return this;
    };
    $.fn.toggleText = function(t1, t2) {
        if (this.text() == t1) this.text(t2);
        else this.text(t1);
        return this;
    };
})(jQuery);
(function($) {
    var navigation_wrap = $("#main-navigation-wrap");
    var navigation_list = $(".navigation__list--main");
    var navigation_toggle_main = $(".navigation__toggle-main");
    var navigation_icon = $(".navigation__icon--menu");
    var navigation_sub = $(".navigation__nav--sub");
    navigation_sub.before('<button class="navigation__toggle--sub" type="button" aria-label ="Toggle Menu" aria-controls="Sub Menu" aria-expanded="false" title="Toggle Menu"><span class = "sr-only sr-target">Open </span>Menu</button>');
    var navigation_toggle_sub = $(".navigation__toggle--sub");
    navigation_toggle_sub.append('<i class="navigation__icon navigation__icon--sub fa fa-bars" aria-hidden="true"></i>');
    var navigation_icon_sub = $(".navigation__icon--sub");
    var navigation_list_sub = $(".navigation__list--sub");
    events();

    function events() {
        toggleMainNav();
        toggleSubNav();
        fixedNav();
        navigationScroll();
    }

    function toggleMainNav() {
        navigation_toggle_main.click(function() {
            navigation_list.appendTo(navigation_wrap);
            toggleNav(navigation_toggle_main, navigation_list, navigation_icon);
        });
    }

    function toggleSubNav() {
        navigation_toggle_sub.click(function() {
            navigation_list.appendTo(navigation_wrap);
            toggleNav(navigation_toggle_sub, navigation_list_sub, navigation_icon_sub);
        });
    }

    function toggleNav(toggle, list, icon) {
        toggle.toggleAttrVal("aria-expanded", "true", "false");
        toggle.find(".sr-target").toggleText("Close ", "Open ");
        list.slideToggle(200);
        icon.toggleClass("fa-window-close", "fa-bars");
    }

    function fixedNav() {
        navigation_wrap.waypoint(function(direction) {
            if (direction == "down") {
                navigation_wrap.addClass("sticky");
            } else {
                navigation_wrap.removeClass("sticky");
            }
        }, {
            offset: "-400px"
        });
    }

    function navigationScroll() {
        $(function() {
            $("a[href*=#]:not([href=#])").click(function() {
                if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                    if (target.length) {
                        $("html,body").animate({
                            scrollTop: target.offset().top
                        }, 1500);
                        return false;
                    }
                }
            });
        });
    }
})(jQuery);
(function($) {
    var btn_open = $(".btn--discord");
    var popup = $(".popup");
    var btn_close = $(".popup__close");
    events();

    function events() {
        btn_open.on("click", openPopup);
        btn_close.on("click", closePopup);
    }

    function openPopup() {
        popup.addClass("popup--active");
    }

    function closePopup() {
        popup.removeClass("popup--active");
    }
})(jQuery);
"use strict";
(function($) {
    events();

    function events() {
        if ($("body").hasClass("logged-in")) {
            $(".like-box").on("click", clickDispatcher);
        } else {
            $(".like-box").on("click", error);
        }
    }

    function clickDispatcher(e) {
        var currentLikeBox = $(e.target).closest(".like-box");
        if (currentLikeBox.attr("data-exists") == "yes") {
            deleteLike(currentLikeBox);
        } else {
            createLike(currentLikeBox);
        }
    }

    function error(e) {
        var currentLikeBox = $(e.target).closest(".like-box");
        message = currentLikeBox.find(".like-box__error");
        message.show();
        setTimeout(function() {
            message.hide();
        }, 1000);
    }

    function createLike(currentLikeBox) {
        $.ajax({
            beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader("X-WP-Nonce", data.nonce);
            },
            url: data.root_url + "/wp-json/rest_route/manageLike",
            type: "POST",
            data: {
                resourceId: currentLikeBox.data("resource")
            },
            success: function success(response) {
                currentLikeBox.attr("data-exists", "yes");
                var likeCount = parseInt(currentLikeBox.find(".like-box__like-count").html(), 10);
                likeCount++;
                currentLikeBox.find(".like-box__like-count").html(likeCount);
                currentLikeBox.attr("data-like", response);
                console.log(response);
            },
            error: function error(response) {
                console.log(response);
            }
        });
    }

    function deleteLike(currentLikeBox) {
        $.ajax({
            beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader("X-WP-Nonce", data.nonce);
            },
            url: data.root_url + "/wp-json/rest_route/manageLike",
            data: {
                like: currentLikeBox.attr("data-like")
            },
            type: "DELETE",
            success: function success(response) {
                currentLikeBox.attr("data-exists", "no");
                var likeCount = parseInt(currentLikeBox.find(".like-box__like-count").html(), 10);
                likeCount--;
                currentLikeBox.find(".like-box__like-count").html(likeCount);
                currentLikeBox.attr("data-like", "");
                console.log(response);
            },
            error: function error(response) {
                console.log(response);
            }
        });
    }
})(jQuery);
"use strict";
(function($) {
    addSearchHTML();
    resultsDiv = $("#search-overlay__results");
    openButton = $(".js-search-trigger");
    closeButton = $(".search-overlay__close");
    searchOverlay = $(".search-overlay");
    searchField = $("#search-term");
    isOverlayOpen = false;
    isSpinnerVisible = false;
    previousValue = undefined;
    typingTimer = undefined;
    events();

    function events() {
        openButton.on("click", openOverlay);
        closeButton.on("click", closeOverlay);
        $(document).on("keydown", keyPressDispatcher);
        searchField.on("keyup", typingLogic);
    }

    function typingLogic() {
        if (searchField.val() != previousValue) {
            clearTimeout(typingTimer);
            if (searchField.val()) {
                if (!isSpinnerVisible) {
                    resultsDiv.html('<div class="spinner-loader"></div>');
                    isSpinnerVisible = true;
                }
                typingTimer = setTimeout(getResults, 750);
            } else {
                resultsDiv.html("");
                isSpinnerVisible = false;
            }
        }
        previousValue = searchField.val();
    }

    function getResults() {
        $.getJSON(data.root_url + "/wp-json/rest_route/search?term=" + searchField.val(), function(results) {
            resultsDiv.html("\n        <div class=\"search-overlay__row row\">\n          <div class=\"search-overlay__column\">\n            <h2 class=\"search-overlay__section-title\">General Information</h2>\n            " + (results.generalInfo.length ? '<ul class="search-overlay__list">' : "<p>No general information matches that search.</p>") + "\n              " + results.generalInfo.map(function(item) {
                return "<li class=\"search-overlay__item\"><a class=\"search-overlay__link\" href=\"" + item.permalink + "\">" + item.title + "</a> " + (item.postType == "post" ? "by " + item.authorName : "") + "</li>";
            }).join("") + "\n            " + (results.generalInfo.length ? "</ul>" : "") + "\n          </div>\n        <div class=\"search-overlay__column\">\n          <h2 class=\"search-overlay__section-title\">Resources</h2>\n          " + (results.resource.length ? '<ul class="search-overlay__list">' : "<p>No general information matches that search.</p>") + "\n            " + results.resource.map(function(item) {
                return "<li class=\"search-overlay__item\"><a class=\"search-overlay__link\" href=\"" + item.permalink + "\">" + item.title + "</a></li>";
            }).join("") + "\n          " + (results.resource.length ? "</ul>" : "") + "\n        </div>\n        <div class=\"search-overlay__column\">\n          <h2 class=\"search-overlay__section-title\">Projects</h2>\n          " + (results.project.length ? '<ul class="search-overlay__list">' : "<p>No general information matches that search.</p>") + "\n            " + results.project.map(function(item) {
                return "<li class=\"search-overlay__item\"><a class=\"search-overlay__link\" href=\"" + item.permalink + "\">" + item.title + "</a></li>";
            }).join("") + "\n          " + (results.project.length ? "</ul>" : "") + "\n        </div>\n        </div>\n      ");
            isSpinnerVisible = false;
        });
    }

    function keyPressDispatcher(e) {
        if (e.keyCode == 83 && !isOverlayOpen && !$("input, textarea").is(":focus")) {
            openOverlay();
        }
        if (e.keyCode == 27 && isOverlayOpen) {
            closeOverlay();
        }
    }

    function openOverlay() {
        searchOverlay.addClass("search-overlay--active");
        $("body").addClass("body-no-scroll");
        searchField.val("");
        setTimeout(function() {
            return searchField.focus();
        }, 301);
        isOverlayOpen = true;
        return false;
    }

    function closeOverlay() {
        searchOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        isOverlayOpen = false;
    }

    function addSearchHTML() {
        $("body").append("\n      <div class=\"search-overlay\">\n      <div class = \"row\">\n        <div class=\"search-overlay__top\">\n        <div class=\"search-overlay__search\">\n            <i class=\"fa fa-search search-overlay__icon\" aria-hidden=\"true\"></i>\n            <input type=\"text\" class=\"search-overlay__search-term\" placeholder=\"What are you looking for?\" id=\"search-term\">\n            </div>\n            <button class=\"search-overlay__close\" aria-label=\"close search overlay\" aria-controls=\"search overlay\" tiitle=\"close search overlay\"><i class=\"search-overlay__icon fa fa-window-close\" aria-hidden=\"true\"></i></button>\n\n        </div>\n        \n          <div class = \"search-overlay__results\" id=\"search-overlay__results\"></div>\n\n        </div>\n      </div>\n    ");
    }
})(jQuery);
