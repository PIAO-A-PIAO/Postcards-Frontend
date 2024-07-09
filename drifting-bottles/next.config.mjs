const {NextFederationPlugin} = require("@module-federation/nextjs-mf")

const remotes = (isServer) => {
    const location = isServer ? "ssr" : "chunks"
    return {
        remote: `remote@http://localhost:8080/_next/static/${location}/remoteEntry.js`,
    }
    
}