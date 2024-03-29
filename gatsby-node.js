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
    const { createPage, createRedirect } = actions

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
                prismicLandingPage {
                    lang
                }
                prismicFundedTraining {
                    lang
                }
                prismicProfessionalTraining {
                    lang
                }
                prismicMythLandingPage {
                    lang
                }
                prismicAdhdLandingPage {
                    lang
                }
            }
        `)
    )

    const customPagesList = customPagesResult.data.allPrismicPage.edges
    const prismicLandingPage = customPagesResult.data.prismicLandingPage
    const prismicFundedTraining = customPagesResult.data.prismicFundedTraining
    const prismicProfessionalTraining = customPagesResult.data.prismicProfessionalTraining
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

    if (prismicLandingPage) {
        createPage({
            type: "page",
            path: `/get-certification`,
            component: path.resolve("src/templates/landing-page.js"),
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
	createRedirect({
        fromPath: `/learnthefacts`,
        toPath: `/learn-the-facts`,
        redirectInBrowser: true,
        isPermanent: true,
      });

    if (prismicFundedTraining) {
        createPage({
            type: "page",
            path: `/services/funded-training`,
            component: path.resolve("src/templates/services/funded-training.js"),
        })
    }
    if (prismicProfessionalTraining) {
        createPage({
            type: "page",
            path: `/services/professional-training`,
            component: path.resolve("src/templates/services/professional-training.js"),
        })
    }
}
