import React from "react"
import Layout from "@components/common/layout.js"
import { graphql } from "gatsby"
import "@styles/pages/page.scss"

const Page = ({ location, data }) => {
    const { title, content } = data.prismicPage.data
    return (
        <Layout className="custom-page" location={location} {...Layout.pickSeoProps(data.prismicPage.data)}>
            <div className="container">
                <div className="title-container" dangerouslySetInnerHTML={{ __html: title.html }} />
                <div className="content-container" dangerouslySetInnerHTML={{ __html: content.html }} />
            </div>
        </Layout>
    )
}

export default Page

export const query = graphql`
    query PageQuery($uid: String) {
        prismicPage(uid: { eq: $uid }) {
            data {
                title {
                    html
                }
                content {
                    html
                }
                seo_title
                seo_keywords
                seo_description
            }
        }
    }
`
