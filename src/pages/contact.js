import { useState } from "react"
import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgSmall } from "../assets/decorations/bg-small.svg"
import { getImageProps } from "@utils/getImageProps"
import { FaCheckCircle } from "react-icons/fa"

import "@styles/pages/contact.scss"

const FormContent = ({
    form_email_label,
    form_message_label,
    form_name_label,
    form_submit,
    disabled,
    emailField,
    setEmail,
    nameField,
    setName,
    messageField,
    setMessage,
}) => {
    return (
        <>
            <div>
                <label htmlFor="name">{form_name_label}</label>
                <input id="name" name="name" value={nameField} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="email">{form_email_label}</label>
                <input id="email" name="email" value={emailField} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="message">{form_message_label}</label>
                <textarea
                    id="message"
                    name="message"
                    value={messageField}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={messageField.split("\n").length}
                ></textarea>
            </div>
            <button className="button" disabled={disabled}>
                {form_submit}
            </button>
        </>
    )
}

const FormSuccess = ({ children }) => {
    return (
        <div className="success-icon">
            <FaCheckCircle className="icon" />
            <div className="text">{children}</div>
        </div>
    )
}

const ContactPage = ({ data, location }) => {
    const [isSubmited, setSubmit] = useState(false)
    const [nameField, setName] = useState("")
    const [emailField, setEmail] = useState("")
    const [messageField, setMessage] = useState("")
    const [inProcess, setProcess] = useState(false)
    const {
        hero_image,
        page_title,
        page_description,
        contact_address,
        email,
        phone,
        north_america_phone,
        email_label,
        form_title,
        address_label,
        phone_label,
        other_phone_label,
        form_email_label,
        form_message_label,
        form_name_label,
        form_submit,
        success_message,
    } = data.prismicContactPage.data

    const enabled = nameField.length > 0 && emailField.includes("@") && messageField.length > 0 && !inProcess

    const onSubmit = (e) => {
        e.preventDefault()
        setProcess(true)

        const object = {
            name: nameField,
            email: emailField,
            message: messageField,
        }
        fetch("https://submit-form.com/BazGy6gL", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(object),
        })
            .then(() => {
                setSubmit(true)
                setProcess(false)
            })
            .catch((error) => {
                setProcess(false)
                alert(error.message)
            })
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
                                <span className="address-label">{address_label}</span>
                                <p className="address-value" dangerouslySetInnerHTML={{ __html: contact_address }} />
                            </div>
                            <div className="address-block email">
                                <span className="address-label">{email_label}</span>
                                <p className="address-value" dangerouslySetInnerHTML={{ __html: email }} />
                            </div>
                            <div className="address-block phone">
                                <span className="address-label">{phone_label}</span>
                                <p className="address-value" dangerouslySetInnerHTML={{ __html: phone }} />
                            </div>
                            <div className="address-block">
                                <span className="address-label">{other_phone_label}</span>
                                <p
                                    className="address-value"
                                    dangerouslySetInnerHTML={{ __html: north_america_phone }}
                                />
                            </div>
                            <h2>{form_title}</h2>
                        </address>
                        <form className="contact-form" method="POST" onSubmit={onSubmit}>
                            {isSubmited ? (
                                <FormSuccess>{success_message}</FormSuccess>
                            ) : (
                                <FormContent
                                    form_email_label={form_email_label}
                                    form_message_label={form_message_label}
                                    form_name_label={form_name_label}
                                    form_submit={form_submit}
                                    emailField={emailField}
                                    nameField={nameField}
                                    messageField={messageField}
                                    setEmail={setEmail}
                                    setMessage={setMessage}
                                    setName={setName}
                                    disabled={!enabled}
                                />
                            )}
                        </form>
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
                email_label
                form_email_label
                form_message_label
                form_name_label
                form_title
                form_submit
                address_label
                phone_label
                other_phone_label
                success_message
            }
        }
    }
`

export default withPreview(ContactPage)
