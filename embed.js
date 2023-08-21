(function () {
  function e(e, t) {
    var r = document.createElement(e);
    for (var a in t) r.setAttribute(a, t[a]);
    document.head.appendChild(r);
  }

  e("link", {
    rel: "stylesheet",
    href: "https://weather-widget-pi.vercel.app/css/app.e83ce612.css",
  }),
    e("script", {
      src: "https://weather-widget-pi.vercel.app/js/chunk-vendors.cec10b05.js",
      defer: "defer",
    }),
    e("script", {
      src: "https://weather-widget-pi.vercel.app/js/app.d9c8e6bb.js",
      defer: "defer",
    });
})();
