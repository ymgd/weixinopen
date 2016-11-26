"use strict";

function init() {
    function r(r, s) {
        function u(r, i, e, n) {
            if (i + e.length <= r.length && r.substr(i, e.length) == e) {
                var t = r.indexOf(n, i);
                if (t < 0 && "*/" == n) throw C + f;
                return t < 0 ? r.length - i : (t += n.length, t - i - 1)
            }
            return 0
        }

        function a(r, i, e) {
            var n = i;
            if (r[i] == e) {
                for (var t = i + 1; t < r.length; t++)
                    if ("\\" == r[t]) t++;
                    else if (r[t] == e) return t - n;
                throw C + o + e
            }
            return 0
        }

        function l(r, i) { g[++O] = r.id, b[O] = x[i.id], x[i.id] = O, y[r.id]++ }

        function h(r) {
            for (var i = 0, n = 0; n >= 0;) n = r.indexOf(e.sep, i + 1), n >= 0 && (i = n);
            return 0 == i ? e.sep : r.substring(0, i)
        }

        function d(r, i) {
            var e, n = { dis: 0, file: "" };
            if ("@import" == r.substr(i, 7)) {
                for (var t = i + 8; t < r.length;) {
                    if (e = u(r, t, "//", "\n")) t += e;
                    else if (e = u(r, t, "/*", "*/")) t += e;
                    else if ("'" == r[t] || '"' == r[t]) break;
                    t++
                }
                "'" != r[t] && '"' != r[t] || (e = a(r, t, r[t]), n.file = r.substr(t + 1, e - 1), n.dis = t + e - i)
            }
            return n
        }

        function c(r) {
            var f;
            if ("undefined" != typeof k[r]) return m[k[r]];
            k[r] = _++, f = { id: k[r], path: r }, m.push(f), y[f.id] = 0;
            var o;
            try {
                o = i.readFileSync(r, "utf8"), C = r;
                var s, p = h(r),
                    v = [0];
                S[f.id] = !0, F.push(f);
                for (var g = 0; g < o.length; g++)
                    if (s = u(o, g, "//", "\n")) g += s;
                    else if (s = u(o, g, "/*", "*/")) g += s;
                else if (s = a(o, g, "'")) g += s;
                else if (s = a(o, g, '"')) g += s;
                else {
                    var x;
                    if (x = d(o, g), x.dis) {
                        for (var b = g + x.dis + 1; b < o.length && j.indexOf(o[b]) > 0;) b++;
                        if (b >= o.length || ";" != o[b]) throw C + ": " + n;
                        v.push(g), v.push(b + 1), g += x.dis;
                        var O = c(e.join(p, x.file));
                        if (l(f, O), S[O.id])
                            for (var q = O.path;;) {
                                var z = F.pop();
                                if (q = z.path + " -> " + q, z.id == O.id) throw t + ":\n" + q
                            }
                    }
                }
            } catch (A) {
                throw A
            }
            F.pop(), S[f.id] = !1, v.push(o.length);
            w[f.id] = "";
            for (var g = 0; g < v.length; g += 2) w[f.id] += o.substring(v[g], v[g + 1]);
            return f
        }

        function p(r) {
            q += w[r] + "\n", y[r] = -1, v--;
            for (var i = x[r]; i; i = b[i]) {
                var e = g[i];
                y[e]--, 0 == y[e] && p(e)
            }
        }
        var v, g = [],
            x = [],
            b = [],
            w = [],
            k = [],
            m = [],
            y = [],
            O = 0,
            _ = 0,
            q = "",
            j = "\t\n\r ",
            C = "",
            F = [],
            S = [];
        try {
            c(r), v = _;
            for (var z = 0; z < _; z++) 0 == y[z] && p(z);
            s(null, q)
        } catch (A) { s(A, null) }
    }
    var i = require("fs"),
        e = require("path"),
        n = "lack of semicolon after import",
        t = "Circular dependencies",
        f = ": lack of */",
        o = ": lack of ";
    _exports = function(i, e) { r(i, function(r, i) { e(r, i) }) }
}
var _exports;
init(), module.exports = _exports;
