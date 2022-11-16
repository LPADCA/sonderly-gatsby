/*
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
*/
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
                accessToken: `MC5ZQ1FqMXhJQUFDSUFSOU5C.XO-_vSpY77-977-9IWfvv70wUzHvv71AP1tbDQ3vv73vv73vv73vv71BKk4LNz9g77-9ag`,
                //linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
                linkResolver: () => (doc) => linkResolver(doc),
                lang: process.env.GATSBY_LOCALE ? process.env.GATSBY_LOCALE : "en-us",
                schemas: {
                    page: require("./src/schemas/page.json"),
                    menu_primary: require("./src/schemas/menu_primary.json"),
                    homepage2022: require("./src/schemas/homepage2022.json"),
                    services_corporate: require("./src/schemas/services_corporate.json"),
                    contact_page: require("./src/schemas/contact_page.json"),
                    courses: require("./src/schemas/courses.json"),
                    course_map: require("./src/schemas/course_map.json"),
                    blogs: require("./src/schemas/blogs.json"),
                    blog_post: require("./src/schemas/blog_post.json"),
                    videos: require("./src/schemas/videos.json"),
                    video: require("./src/schemas/video.json"),
                    faq_page: require("./src/schemas/faq_page.json"),
                    funded_training: require("./src/schemas/funded_training_page.json"),
                    professional_training: require("./src/schemas/professional_training_page.json"),
                    about_page: require("./src/schemas/about_page.json"),
                    landing_page: require("./src/schemas/landing_page.json"),
                    myth_landing_page: require("./src/schemas/myth_landing_page.json"),
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
                background_color: "white",
                display: "minimal-ui",
                icon: "src/assets/icons/logo.png",
            },
        },
    ],
}
