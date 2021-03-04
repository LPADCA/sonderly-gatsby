const path = require("path");
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@static": path.resolve(__dirname, "static"),
        "@styles": path.resolve(__dirname, "src/styles")
      }
    }
  });
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  //console.log("===============NODE===============");
  //console.log(node);
  // Transform the new node here and create a new node or
  // create a new node field.
}

const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogResult = await wrapper(
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

  const blogList = blogResult.data.allPrismicPage.edges
    
  blogList.forEach(edge => {
    createPage({
      type: "page",
      match: `/blog/:uid`,
      path: `/blog/${edge.node.uid}`,
      component: path.resolve("src/templates/page.js"),
      context: {
        uid: `${edge.node.uid}`,
      },
    })
    console.log(`/page/${edge.node.uid}`)
  })

}