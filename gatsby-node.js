const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@assets": path.resolve(__dirname, "src/assets"),
                "@components": path.resolve(__dirname, "src/components"),
                "@static": path.resolve(__dirname, "static"),
                "@styles": path.resolve(__dirname, "src/styles"),
                "@utils": path.resolve(__dirname, "src/utils"),
            },
        },
    })
}

const wrapper = (promise) =>
    promise.then((result) => {
        if (result.errors) {
            throw result.errors
        }
        return result
    })

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const customPagesResult = await wrapper(
        graphql(`
            {
                allPrismicPage {
                    edges {
                        node {
                            uid
                        }
                    }
                }
                allPrismicBlogPost {
                    edges {
                        node {
                            uid
                        }
                    }
                }
                prismicLandingPage {
                    lang
                }
                prismicLandingCards {
                    lang
                }
                prismicMythLandingPage {
                    lang
                }
                prismicAdhdLandingPage {
                    lang
                }
                prismicBlogs {
                    lang
                }
                prismicVideos {
                    lang
                }
            }
        `)
    )

    const customPagesList = customPagesResult.data.allPrismicPage.edges
    const blogPostList = customPagesResult.data.allPrismicBlogPost.edges
    const prismicBlogsPage = customPagesResult.data.prismicBlogs
    const prismicVideosPage = customPagesResult.data.prismicVideos
    const prismicLandingPage = customPagesResult.data.prismicLandingPage
    const prismicLandingCards = customPagesResult.data.prismicLandingCards
    const prismicMythLandingPage = customPagesResult.data.prismicMythLandingPage
    const prismicAdhdLandingPage = customPagesResult.data.prismicAdhdLandingPage
    customPagesList.forEach((edge) => {
        createPage({
            type: "page",
            path: `/${edge.node.uid}`,
            component: path.resolve("src/templates/page.js"),
            context: {
                uid: `${edge.node.uid}`,
            },
        })
    })
    blogPostList.forEach((edge) => {
        createPage({
            type: "blog_post",
            path: `/resources/blogs/${edge.node.uid}`,
            component: path.resolve("src/templates/resources/blogs/blog_post.js"),
            context: {
                uid: `${edge.node.uid}`,
            },
        })
    })

    if (prismicLandingPage) {
        createPage({
            type: "page",
            path: `/get-certification`,
            component: path.resolve("src/templates/landing-page.js"),
        })
    }
    if (prismicLandingCards) {
        createPage({
            type: "page",
            path: `/us-sale`,
            component: path.resolve("src/templates/landing-cards.js"),
        })
    }
    if (prismicMythLandingPage) {
        createPage({
            type: "page",
            path: `/aba-myths-dispelled`,
            component: path.resolve("src/templates/myth-landing-page.js"),
        })
    }
    if (prismicAdhdLandingPage) {
        createPage({
            type: "page",
            path: `/learn-the-facts`,
            component: path.resolve("src/templates/adhd-landing-page.js"),
        })
    }
    if (prismicBlogsPage) {
        createPage({
            type: "page",
            path: `/resources/blogs`,
            component: path.resolve("src/templates/resources/blogs.js"),
        })
    }
    if (prismicVideosPage) {
        createPage({
            type: "page",
            path: `/resources/videos`,
            component: path.resolve("src/templates/resources/videos.js"),
        })
    }
}
