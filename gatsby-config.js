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
                accessToken: "MC5ZN1VmWUJjQUFQbEhzNGRl.d--_ve-_ve-_vSrvv73vv70rDe-_vVsSABxx77-9cu-_ve-_vQHvv71Q77-977-977-977-977-977-9c--_ve-_ve-_vQ",
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
                    professional_training: require("./src/schemas/professional_training_page.json"),
                    about_page: require("./src/schemas/about_page.json"),
                    landing_page: require("./src/schemas/landing_page.json"),
                    myth_landing_page: require("./src/schemas/myth_landing_page.json"),
                    adhd_landing_page: require("./src/schemas/adhd_landing_page.json"),
                    group_training: require("./src/schemas/group_training.json"),
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
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: process.env.GOOGLE_ID,
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
