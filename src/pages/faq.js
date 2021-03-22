import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import FaqList from "@components/faq/faq-list"
import { ReactComponent as BgBig } from "@assets/decorations/bg-big.svg"
import { useState } from "react"

import "@styles/pages/faq/index.scss"

const BG_OPEN_STATE = [
    {
        transform: "translate(-30%, -50%)",
    },
    {
        transform: "translate(30%, 50%)",
    },
]

const getStyle = (n, isOpen) => (isOpen ? BG_OPEN_STATE[n] : undefined)

const FAQPage = ({ data }) => {
    const [isAllOpen, setAllOpen] = useState(false)
    const { faq_list, title, description } = data.prismicFaqPage.data
    return (
        <Layout>
            <div className="faq-header">
                <h1>{title}</h1>
                <div className="faq-header-description" dangerouslySetInnerHTML={{ __html: description.html }} />
            </div>
            <section className="faq-content">
                <BgBig className="faq-bg-decoration" style={getStyle(0, isAllOpen)} />
                <FaqList list={faq_list} onStateChange={setAllOpen} />
                <BgBig className="faq-bg-decoration" style={getStyle(1, isAllOpen)} />
            </section>
        </Layout>
    )
}

export default withPreview(FAQPage)

export const faqDetailQuery = graphql`
    query FaqQuery {
        prismicFaqPage {
            data {
                title
                description {
                    html
                }
                faq_list {
                    faq_description {
                        html
                    }
                    faq_title
                }
            }
        }
    }
`
