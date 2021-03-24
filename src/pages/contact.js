import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import { useState } from "react"
import AnimateHeight from "react-animate-height"
import { ReactComponent as BgBig } from "../assets/decorations/bg-big.svg"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgSmall } from "../assets/decorations/bg-small.svg"

import "@styles/pages/contact.scss"

const getImageProps = ({ fluid, dimensions }) => {
    const { aspectRatio, ...props } = fluid
    return {
        ...props,
        ...dimensions,
    }
}

const ContactPage = ({ data }) => {
    const {
        hero_image,
        page_title,
        page_description,
        contact_address,
        email,
        phone,
        north_america_phone,
    } = data.prismicContactPage.data
    const onSubmit = (e) => {
        e.preventDefault()
        console.log("e", e)
        const form = e.target.form
        const formData = new FormData(form)
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => console.log("Form successfully submitted"))
            .catch((error) => alert(error))
    }
    return (
        <Layout className="contact-page">
            <BgMedium className="bg-1" />
            <BgSmall className="bg-2" />
            <section className="container two-column">
                <div className="hero-image">
                    <img {...getImageProps(hero_image)} />
                </div>
                <div>
                    <div className="form-card">
                        <h1 dangerouslySetInnerHTML={{ __html: page_title.text }} />
                        <div dangerouslySetInnerHTML={{ __html: page_description.html }} />
                        <address>
                            <div className="address-block address">
                                <span className="address-label">Address:</span>
                                <p className="address-value" dangerouslySetInnerHTML={{ __html: contact_address }} />
                            </div>
                            <div className="address-block email">
                                <span className="address-label">Email:</span>
                                <p className="address-value" dangerouslySetInnerHTML={{ __html: email }} />
                            </div>
                            <div className="address-block phone">
                                <span className="address-label">Phone:</span>
                                <p className="address-value" dangerouslySetInnerHTML={{ __html: phone }} />
                            </div>
                            <div className="address-block">
                                <span className="address-label">For North America:</span>
                                <p
                                    className="address-value"
                                    dangerouslySetInnerHTML={{ __html: north_america_phone }}
                                />
                            </div>
                            <h2>Send us a quick note</h2>
                            <form className="contact-form" method="POST" data-netlify="true" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="name">Name:</label>
                                    <input id="name"></input>
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input id="email"></input>
                                </div>
                                <div>
                                    <label htmlFor="message">Message:</label>
                                    <input id="message"></input>
                                </div>
                                <button className="button">Send message</button>
                            </form>
                        </address>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query ContactQuery {
        prismicContactPage {
            data {
                page_title {
                    text
                }
                page_description {
                    html
                }
                contact_address
                email
                phone
                north_america_phone
                hero_image {
                    alt
                    fluid(maxWidth: 550) {
                        ...GatsbyPrismicImageFluid_noBase64
                    }
                    dimensions {
                        width
                        height
                    }
                }
            }
        }
    }
`

export default withPreview(ContactPage)
