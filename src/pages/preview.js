// src/pages/preview.js
import { withPreviewResolver } from "gatsby-source-prismic"
import { linkResolver } from "../utils/linkResolver"
import Layout from "../components/common/layout"
import { navigate } from "gatsby"
import { useEffect } from "react"

const PreviewPageComponent = ({ location, isPreview }) => {
    useEffect(() => {
        if (isPreview == null) navigate("/")
    }, [])

    return (
        <Layout location={location}>
            <p>Loading via PreviewResolver</p>
        </Layout>
    )
}

export default withPreviewResolver(PreviewPageComponent, {
    repositoryName: "sonderly",
    linkResolver,
})
