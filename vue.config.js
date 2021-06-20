const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  devServer: {
    open: true,
  },
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader",
        },
      ],
    },
  },
};
