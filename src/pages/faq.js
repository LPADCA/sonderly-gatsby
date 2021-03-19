import { useEffect, useState } from "react"
import Layout from "@components/common/layout.js"
import { ReactComponent as ArrowLeft } from "@assets/icons/arrow-left.svg"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"

import "@styles/pages/faq/index.scss"

const FAQ_OPEN_STATE = {
    paddingTop: "20px",
    maxHeight: "100px",
    opacity: 1,
}

const FAQ_CLOSED_STATE = {
    paddingTop: 0,
    maxHeight: 0,
    opacity: 0,
}

const FaqItem = ({ isOpen }) => {
    const [stateOpen, setOpen] = useState(isOpen)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    return (
        <div className="faq-item">
            <button onClick={() => setOpen(!stateOpen)} className="faq-button">
                <h4 className="faq-item-title">
                    I have purchased a course; how do I access it?
                    <ArrowLeft
                        className={`faq-arrow ${
                            stateOpen ? "faq-arrow-down" : "faq-arrow-up"
                        }`}
                    />
                </h4>
            </button>
            <p
                className="faq-item-body"
                style={stateOpen ? FAQ_OPEN_STATE : FAQ_CLOSED_STATE}
            >
                Your active courses are accessible from your transcript. You can
                access your transcript by clicking on “Transcript View” on your
                Learner Home page.
            </p>
        </div>
    )
}

const FaqList = () => {
    const [isAllOpen, setAllOpen] = useState(false)
    return (
        <div className="container faq-list">
            <div className="faq-list-buttons">
                <button className="link" onClick={() => setAllOpen(false)}>
                    Close All
                </button>
                <button className="link" onClick={() => setAllOpen(true)}>
                    Expand All
                </button>
            </div>
            <div className="faq-list-items">
                <FaqItem isOpen={isAllOpen} />
            </div>
        </div>
    )
}

const FAQPage = ({ data }) => {
    console.log("data", data)
    return (
        <Layout>
            <div className="faq-header">
                <h1>Frequently asked questions</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Bibendum est ultricies integer quis. Iaculis urna id
                    volutpat lacus laoreet. Mauris vitae ultricies leo
                </p>
            </div>
            <FaqList />
        </Layout>
    )
}

export default withPreview(FAQPage)

export const faqDetailQuery = graphql`
    query FaqQuery {
        prismicFaqPage {
            data {
                faq_list {
                    faq_description {
                        text
                    }
                    faq_title
                }
            }
        }
    }
`
