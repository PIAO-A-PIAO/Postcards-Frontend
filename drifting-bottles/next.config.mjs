import { createRequire } from "module";
const require = createRequire(import.meta.url);
const NextFederationPlugin = require("@module-federation/nextjs-mf");

export default {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "shop",
          filename: "static/chunks/remoteEntry.js",
          remotes: {
            home: "home@http://localhost:3000/_next/static/chunks/remoteEntry.js",
          },
          exposes: {
            "./shop": "./pages/index",
          },
        })
      );
    }
    return config;
  },
};
