const { defineConfig } = require("@vue/cli-service");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/variables.scss";',
      },
    },
  },
  outputDir: "dist",
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "./embed.js", to: "js" }],
      }),
    ],
  },
  devServer: {
    proxy: {
      "/js": {
        target: "https://weather-widget-pi.vercel.app",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
