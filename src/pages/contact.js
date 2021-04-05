import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgSmall } from "../assets/decorations/bg-small.svg"
import { getImageProps } from "@utils/getImageProps"

import "@styles/pages/contact.scss"

const ContactPage = ({ data, location }) => {
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
        const form = e.target
        const formData = new FormData(form)
        const object = {}
        formData.forEach((value, key) => {
            object[key] = value
        })
        fetch("https://submit-form.com/BazGy6gL", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(object),
        })
        // .then(() => console.log("Form successfully submitted"))
        // .catch((error) => alert(error))
    }
    return (
        <Layout location={location} className="contact-page" {...Layout.pickSeoProps(data.prismicContactPage.data)}>
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
                            <form className="contact-form" method="POST" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="name">Name:</label>
                                    <input id="name" name="name"></input>
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input id="email" name="email"></input>
                                </div>
                                <div>
                                    <label htmlFor="message">Message:</label>
                                    <input id="message" name="message"></input>
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
                seo_title
                seo_keywords
                seo_description
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
