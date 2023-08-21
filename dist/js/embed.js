(function () {
  function e(e, t) {
    var c = document.createElement(e);
    for (var r in t) c.setAttribute(r, t[r]);
    document.head.appendChild(c);
  }

  const t = "https://weather-widget-pi.vercel.app/";
  e("link", {
    rel: "stylesheet",
    href: t + "css/app.e83ce612.css",
  }),
    e("script", {
      src: t + "js/chunk-vendors.862d1884.js",
      defer: "defer",
    }),
    e("script", { src: t + "js/app.afacc213.js", defer: "defer" });
})();
