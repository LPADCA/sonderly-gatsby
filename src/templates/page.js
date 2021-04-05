import React from "react"
import Layout from "@components/common/layout.js"
import { graphql } from "gatsby"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgBig } from "../assets/decorations/bg-big.svg"
import "@styles/pages/page.scss"

const Page = ({ location, data }) => {
    const { title, content } = data.prismicPage.data
    return (
        <Layout className="custom-page" location={location} {...Layout.pickSeoProps(data.prismicPage.data)}>
            <BgBig className="bg-1" />
            <BgMedium className="bg-2 " />
            <div className="container">
                <div className="title-container" dangerouslySetInnerHTML={{ __html: title.html }} />
                <div className="content-container" dangerouslySetInnerHTML={{ __html: content.html }} />
            </div>
        </Layout>
    )
}

export default Page

export const query = graphql`
    query PageQuery {
        prismicPage {
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
