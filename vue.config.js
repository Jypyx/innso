module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/styles/abstract.scss";
        `,
      },
    },
  },
}
