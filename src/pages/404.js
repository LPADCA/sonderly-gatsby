import React from "react"
import Layout from "@components/common/layout.js"

const notFound404 = ({ location }) => {
    return <Layout location={location}>404: Page not found</Layout>
}

export default notFound404
