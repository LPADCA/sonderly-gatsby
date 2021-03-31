/*
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
*/
const linkResolver = require("./src/utils/linkResolver")

module.exports = {
    plugins: [
        "gatsby-plugin-image",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-plugin-sharp",
            options: {
                defaults: {
                    quality: 100,
                    backgroundColor: "transparent"
                },
            },
        },
        "gatsby-plugin-sass",
        {
            resolve: `gatsby-source-prismic`,
            options: {
                repositoryName: `sonderly`,
                accessToken: `MC5ZQ1FqMXhJQUFDSUFSOU5C.XO-_vSpY77-977-9IWfvv70wUzHvv71AP1tbDQ3vv73vv73vv73vv71BKk4LNz9g77-9ag`,
                //linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
                linkResolver: () => (doc) => linkResolver(doc),
                lang: process.env.GATSBY_LOCALE ? process.env.GATSBY_LOCALE : "en-us",
                schemas: {
                    page: require("./src/schemas/page.json"),
                    menu_primary: require("./src/schemas/menu_primary.json"),
                    homepage: require("./src/schemas/homepage.json"),
                    services_corporate: require("./src/schemas/services_corporate.json"),
                    contact_page: require("./src/schemas/contact_page.json"),
                    courses: require("./src/schemas/courses.json"),
                    course_map: require("./src/schemas/course_map.json"),
                    faq_page: require("./src/schemas/faq_page.json"),
                    funded_training: require("./src/schemas/funded_training_page.json"),
                    about_page: require("./src/schemas/about_page.json"),
                    404: require("./src/schemas/404.json"),
                    // Your custom types mapped to schemas
                },
                imageImgixParams: {
                    auto: "compress,format",
                    fit: "max",
                    q: 50,
                },
                //page: require("./src/schemas/page.json"),
            },
        },
        {
            resolve: "gatsby-plugin-svgr",
            options: {
                svgo: true,
                svgoConfig: {
                    removeViewBox: false,
                },
            },
        }
    ],
}
