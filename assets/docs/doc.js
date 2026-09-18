/* doc.js — shared behaviour for .doc- documentation pages */
(function () {
  "use strict";

  /* Sidebar scroll-spy: highlight the TOC link for the section in view */
  var links = Array.prototype.slice.call(document.querySelectorAll(".doc-toc a[href^='#']"));
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var current = null;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          if (current) current.classList.remove("toc-active");
          var a = map[e.target.id];
          if (a) { a.classList.add("toc-active"); current = a; }
        }
      });
    }, { rootMargin: "0px 0px -78% 0px", threshold: 0 });
    document.querySelectorAll(".doc-section[id]").forEach(function (s) { io.observe(s); });
  }

  /* Request / response tabs: data-tab on the button => panel id */
  document.querySelectorAll(".doc-tabs").forEach(function (group) {
    var tabs = group.querySelectorAll(".doc-tab");
    var panels = group.querySelectorAll(".doc-tab-panel");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("is-active"); });
        panels.forEach(function (p) { p.classList.remove("is-active"); });
        tab.classList.add("is-active");
        var target = group.querySelector("#" + tab.getAttribute("data-tab"));
        if (target) target.classList.add("is-active");
      });
    });
  });
})();
