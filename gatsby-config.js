/*
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
*/
const linkResolver = require('./src/utils/linkResolver')


module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `sonderly`,
        accessToken: `MC5ZQ1FqMXhJQUFDSUFSOU5C.XO-_vSpY77-977-9IWfvv70wUzHvv71AP1tbDQ3vv73vv73vv73vv71BKk4LNz9g77-9ag`,
        //linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
        linkResolver: ({ node, key, value }) => (doc) => linkResolver(doc),
        schemas: {
          page: require("./src/schemas/page.json"),
          menu_primary: require("./src/schemas/menu_primary.json"),
          homepage: require("./src/schemas/homepage.json"),
          // Your custom types mapped to schemas
        },
        imageImgixParams: {
          auto: 'compress,format',
          fit: 'max',
          q: 50,
        },
        //page: require("./src/schemas/page.json"),
      },
    },
  ],
}