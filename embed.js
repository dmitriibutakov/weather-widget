(function () {
  function e(e, t) {
    var r = document.createElement(e);
    for (var a in t) r.setAttribute(a, t[a]);
    document.head.appendChild(r);
  }

  const baseUrl = "https://weather-widget-pi.vercel.app/";
  e("link", {
    rel: "stylesheet",
    href: baseUrl + "css/app.e83ce612.css",
  }),
    e("script", {
      src: baseUrl + "js/chunk-vendors.cec10b05.js",
      defer: "defer",
    }),
    e("script", {
      src: baseUrl + "js/app.d9c8e6bb.js",
      defer: "defer",
    });
})();
