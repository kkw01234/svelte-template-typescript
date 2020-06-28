const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({
    typescript: {
      tsconfigFilte: "./tsconfig.json",
    },
    emitCss: true,
    hotReload: true,
  }),
};
