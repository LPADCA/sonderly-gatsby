/*
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
*/
require("dotenv").config()
const linkResolver = require("./src/utils/linkResolver")

module.exports = {
    siteMetadata: {
        siteUrl: process.env.SITE_URL || "https://sonderly.io/",
        title: "Sonderly",
        description:
            "An educational and training platform for professionals and educators seeking to learn more about autism and mental health.",
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-robots-txt",
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-plugin-sharp",
            options: {
                defaults: {
                    quality: 100,
                    backgroundColor: "transparent",
                },
            },
        },
        "gatsby-plugin-sass",
        {
            resolve: `gatsby-source-prismic`,
            options: {
                repositoryName: `sonderly`,
                accessToken: process.env.PRISMIC_TOKEN,
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
                    landing_page: require("./src/schemas/landing_page.json"),
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
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                // You can add multiple tracking ids and a pageview event will be fired for all of them.
                trackingIds: [process.env.GOOGLE_ID],
                pluginConfig: {
                    head: true,
                },
            },
        },
        {
            resolve: `gatsby-plugin-facebook-pixel`,
            options: {
                pixelId: process.env.FACEBOOK_PIXEL_ID,
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
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "Sonderly",
                short_name: "Sonderly",
                start_url: "/",
                background_color: "$color1",
                display: "minimal-ui",
                icon: "src/assets/icons/logo.png",
            },
        },
    ],
}
