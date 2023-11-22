const { defineConfig } = require("@vue/cli-service");
const isDev = process.env.NODE_ENV === "development";

const fs = require("fs");
const path = require("path");
function resolve(dir) {
  return path.resolve(__dirname, dir);
}
const join = path.join;
function getEntries(path) {
  let files = fs.readdirSync(resolve(path));
  const entries = files.reduce((ret, item) => {
    const itemPath = join(path, item);
    const isDir = fs.statSync(itemPath).isDirectory();
    if (isDir) {
      ret[item] = resolve(join(itemPath, "index.js"));
    } else {
      const [name] = item.split(".");
      ret[name] = resolve(itemPath);
    }
    return ret;
  }, {});
  return entries;
}

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    if (!isDev) {
      config.entryPoints.delete("app");
      config.optimization.delete("splitChunks");
      config.plugins.delete("copy");
      config.plugins.delete("html");
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      config.plugins.delete("hmr");
    }
  },
  configureWebpack: isDev
    ? {
        entry: "./examples/main.js",
      }
    : {
        entry: {
          ...getEntries("packages"),
        },
        output: {
          filename: "[name]/index.js",
          libraryTarget: "commonjs2",
        },
      },
  outputDir: "lib",
  css: {
    extract: {
      filename: "style/[name].css",
    },
  },
  productionSourceMap: isDev,
});
