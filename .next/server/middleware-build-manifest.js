self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/index.js"
    ],
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/admin": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/admin.js"
    ],
    "/beam-calculator": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/beam-calculator.js"
    ],
    "/contact-support": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/contact-support.js"
    ],
    "/pricing": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/pricing.js"
    ],
    "/privacy-policy": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/privacy-policy.js"
    ],
    "/refund-policy": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/refund-policy.js"
    ],
    "/terms-and-conditions": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/terms-and-conditions.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];