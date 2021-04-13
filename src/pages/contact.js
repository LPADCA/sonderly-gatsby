import { useState, createRef } from "react"
import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgSmall } from "../assets/decorations/bg-small.svg"
import { getImageProps } from "@utils/getImageProps"
import { FaCheckCircle } from "react-icons/fa"
import { useFormspark } from "@formspark/use-formspark"
import ReCAPTCHA from "react-google-recaptcha"

import "@styles/pages/contact.scss"

const FormContent = ({
    form_email_label,
    form_message_label,
    form_name_label,
    form_subject,
    form_submit,
    setSubmit,
    onBlur,
}) => {
    const recaptchaRef = createRef()

    const [nameField, setName] = useState("")
    const [emailField, setEmail] = useState("")
    const [subjectField, setSubject] = useState("")
    const [messageField, setMessage] = useState("")
    const [submit, submitting] = useFormspark({
        formId: "BazGy6gL",
    })
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const obj = {
                name: nameField,
                email: emailField,
                "_email.from": emailField,
                "_email.subject": subjectField,
                subject: subjectField,
                message: messageField,
            }
            await recaptchaRef.current.executeAsync()
            await submit(obj)
        } catch (err) {
            alert(err.message)
            return
        }
        setSubmit(true)
    }
    return (
        <form className="contact-form" id="contact-form" method="POST" onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">{form_name_label}</label>
                <input
                    id="name"
                    name="name"
                    value={nameField}
                    required
                    onChange={(e) => setName(e.target.value)}
                    onBlur={onBlur}
                ></input>
            </div>
            <div>
                <label htmlFor="email">{form_email_label}</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={emailField}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="subject">{form_subject}</label>
                <input
                    id="subject"
                    name="subject"
                    required
                    value={subjectField}
                    onChange={(e) => setSubject(e.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="message">{form_message_label}</label>
                <textarea
                    id="message"
                    name="message"
                    required
                    value={messageField}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={messageField.split("\n").length}
                ></textarea>
            </div>
            <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.GATSBY_RECAPTCHA_KEY} />
            <button className="button" type="submit" disabled={submitting}>
                {form_submit}
            </button>
        </form>
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
    const {
        hero_image,
        page_title,
        page_description,
        address_title,
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
        form_subject,
        form_submit,
        success_message,
    } = data.prismicContactPage.data

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
                        <h2>{form_title}</h2>
                        <div className="contact-form-container">
                            {isSubmited ? (
                                <FormSuccess>{success_message}</FormSuccess>
                            ) : (
                                <FormContent
                                    form_email_label={form_email_label}
                                    form_message_label={form_message_label}
                                    form_name_label={form_name_label}
                                    form_subject={form_subject}
                                    form_submit={form_submit}
                                    setSubmit={setSubmit}
                                />
                            )}
                        </div>

                        <h2>{address_title}</h2>
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
                address_title
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
                    alt
                }
                email_label
                form_email_label
                form_message_label
                form_name_label
                form_title
                form_submit
                form_subject
                address_label
                phone_label
                other_phone_label
                success_message
            }
        }
    }
`

export default withPreview(ContactPage)
