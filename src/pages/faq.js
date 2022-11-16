import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import FaqList from "@components/faq/faq-list"
import { useState } from "react"
import { JsonLD, faqJsonLD } from "@components/json-ld"


import "@styles/pages/faq.scss"

const FAQPage = ({ data, location }) => {
    const [isAllOpen, setAllOpen] = useState(false)
    const { faq_list, title, description } = data.prismicFaqPage.data

    return (
        <Layout location={location} {...Layout.pickSeoProps(data.prismicFaqPage.data)}>
            <JsonLD>{faqJsonLD(faq_list)}</JsonLD>
            <div className="faq-header">
                <h1>{title}</h1>
                <div className="faq-header-description" dangerouslySetInnerHTML={{ __html: description.html }} />
            </div>
            <section className="faq-content">
                <FaqList list={faq_list} onStateChange={setAllOpen} />
            </section>
        </Layout>
    )
}

export default withPreview(FAQPage)

export const faqDetailQuery = graphql`
    query FaqQuery {
        prismicFaqPage {
            data {
                seo_title
                seo_keywords
                seo_description
                title
                description {
                    html
                }
                faq_list {
                    faq_description {
                        html
                        text
                    }
                    faq_title
                }
            }
        }
    }
`
