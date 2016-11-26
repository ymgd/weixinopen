"use strict";
! function() {
    function e(e, t, o, n) {
        var i = { to: e, msg: t, command: o, ext: n };
        i.comefrom = "webframe", i.webviewID = d, window.postMessage(i, "*")
    }

    function t() {
        window.prompt, window.confirm, window.alert;
        window.alert = function(t) {
            var o = { type: "alert", msg: t };
            e("backgroundjs", o)
        }, window.confirm = function(e) {
            return !0
        }
    }

    function o() {
        try {
            ! function() {
                c = new WebInspector.DeviceModeModel(function() {}), c._target = WebInspector.targetManager.mainTarget(), c._applyTouch(!0, !0), c._target.emulationAgent().invoke_setDeviceMetricsOverride(l, function() { e("backgroundjs", "", "INIT_DEVTOOLS_SUCCESS") });
                var t = WebInspector.DOMModel.prototype.setInspectMode;
                WebInspector.DOMModel.prototype.setInspectMode = function(e, o) { "searchForNode" === e ? c._applyTouch(!1, !1) : setTimeout(function() { c._applyTouch(!0, !0) }, 1e3 / 60), t.call(this, e, o) }
            }()
        } catch (t) { setTimeout(o, 1e3) }
    }

    function n() {
        var e = WebInspector.inspectorView.showPanel;
        WebInspector.inspectorView.showPanel = function(t) { f[t] && (t = "console"), e.call(this, t) }
    }

    function i() {
        var e = (document.querySelector(".inspector-view-toolbar"), document.querySelector(".inspector-view-tabbed-pane")),
            t = e.shadowRoot,
            o = { childList: !0, subtree: !0 };
        r(t, o, function(e) {
            for (var t = e.addedNodes, o = 0, n = t.length; o < n; o++) {
                var i = t[o];
                return "tabbed-pane-header-tab" === i.className
            }
        }, function() {
            h.forEach(function(e) {
                var o = t.querySelector("#" + e);
                o.style.display = "none", r(o, { attributes: !0 }, function(e) {
                    var t = e.target;
                    t.classList.contains("selected") && WebInspector.inspectorView.showPanel("console")
                }, function() {})
            });
            var e = t.querySelector(".tabbed-pane-tab-slider");
            r(t.querySelector(".tabbed-pane-header-tabs"), { attributes: !0, subtree: !0 }, function(o) {
                var n = t.querySelector(".selected"),
                    i = n.offsetLeft,
                    a = n.offsetWidth,
                    r = "transform: translateX(" + i + "px); width: " + a + "px;";
                e.style.cssText = r
            }, function() {})
        })
    }

    function a() { o(), u && (i(), n()), e("contentscript", {}, "SHAKE_HANDS") }

    function r(e, t, o, n) {
        var i = new MutationObserver(function(e) {
            for (var t = 0, a = e.length; t < a; t++) {
                var r = e[t];
                if (o(r)) {
                    n(), i.disconnect();
                    break
                }
            }
        });
        i.observe(e, t)
    }
    if ("chrome-devtools:" === location.protocol) {
        var c, s = navigator.userAgent,
            d = parseInt(s.match(/webview\/(\d*)/)[1]),
            u = (s.match(/chromeRuntimeID\/(.*)\s?/)[1], s.indexOf("asviewdevtools") !== -1),
            l = { width: 375, height: 667, deviceScaleFactor: 2, mobile: !0, fitWindow: !1 };
        window.location.hash = "no-back-button", window.location.hash = "Again-No-back-button", window.onhashchange = function() { window.location.hash = "no-back-button" }, t(), window.addEventListener("message", function(o) {
            var n = o.data || {},
                i = n.command,
                a = n.msg;
            "init" === i ? (l.width = parseInt(a.width), l.height = parseInt(a.height), l.deviceScaleFactor = parseFloat(a.dpr), c && c._target.emulationAgent().invoke_setDeviceMetricsOverride(l, function() { e("backgroundjs", "", "INIT_DEVTOOLS_SUCCESS") }), t(n)) : "setEmulate" === i && (l.width = parseInt(a.width), l.height = parseInt(a.height), l.deviceScaleFactor = parseFloat(a.dpr), c._target.emulationAgent().invoke_setDeviceMetricsOverride(l, function() {}))
        });
        var f = { element: !0, timeline: !0, profiles: !0, security: !0, audits: !0, resources: !0 },
            h = ["tab-elements", "tab-timeline", "tab-profiles", "tab-security", "tab-audits", "tab-resources"];
        r(document.body, { childList: !0 }, function(e) {
            for (var t = e.addedNodes, o = 0, n = t.length; o < n; o++) {
                var i = t[o];
                return "widget vbox root-view" === i.className
            }
        }, function() { a() })
    }
}();
