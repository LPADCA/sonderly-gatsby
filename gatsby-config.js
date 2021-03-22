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
                linkResolver: ({ node, key, value }) => (doc) => linkResolver(doc),
                schemas: {
                    page: require("./src/schemas/page.json"),
                    menu_primary: require("./src/schemas/menu_primary.json"),
                    homepage: require("./src/schemas/homepage.json"),
                    services_corporate: require("./src/schemas/services_corporate.json"),
                    courses: require("./src/schemas/courses.json"),
                    course_map: require("./src/schemas/course_map.json"),
                    faq_page: require("./src/schemas/faq_page.json"),
                    funded_training: require("./src/schemas/funded_training_page.json"),
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
        },
        {
            resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
            options: {
                // Fields to index
                fields: [`title`, `tags`],
                // How to resolve each field`s value for a supported node type
                resolvers: {
                    PrismicPage: {
                        title: (node) => node.data.title.text,
                        tags: (node) => node.tags,
                        path: (node) => node.url,
                    },
                    //PrismicHomepage: {
                    //  title: "Homepage",
                    //  tags: node => node.tags,
                    //  path: node => node.url,
                    //},
                    // For any node of type MarkdownRemark, list how to resolve the fields` values
                    //MarkdownRemark: {
                    //  title: node => node.frontmatter.title,
                    //  tags: node => node.frontmatter.tags,
                    //  path: node => node.frontmatter.path,
                    //},
                },
                // Optional filter to limit indexed nodes
                //filter: (node, getNode) => node.frontmatter.tags !== "exempt",
            },
        },
    ],
}
