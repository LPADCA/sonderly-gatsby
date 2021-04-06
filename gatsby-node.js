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
            }
        `)
    )

    const customPagesList = customPagesResult.data.allPrismicPage.edges

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
}
