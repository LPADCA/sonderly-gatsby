import { useState, useRef } from "react"
import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
//import { getImageProps } from "@utils/getImageProps"
import { FaCheckCircle } from "react-icons/fa"
import { useFormspark } from "@formspark/use-formspark"
import ReCAPTCHA from "react-google-recaptcha"
import AnimatedBackground from "../components/common/animated_background"

import "@styles/pages/contact.scss"

const FormContent = ({
    form_email_label,
    form_message_label,
    form_name_label,
    form_phone_label,
    form_submit,
    setSubmit,
    onBlur,
    recaptchaRef,
}) => {
    const [nameField, setName] = useState("")
    const [emailField, setEmail] = useState("")
    const [phoneField, setPhone] = useState("")
    const [messageField, setMessage] = useState("")
    const [submit, submitting] = useFormspark({
        formId: process.env.GATSBY_FORM_ID,
    })
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const obj = {
                name: nameField,
                email: emailField,
                "_email.from": emailField,
                "_email.subject": 'Form submission',
                phone: phoneField,
                message: messageField,
            }
            //await recaptchaRef.current.executeAsync()
            await submit(obj)
            setSubmit(true)
        } catch (err) {
            alert(err.message)
            return
        }
    }
    return (
        <form name="contact-form" className="contact-form" id="contact-form" method="POST" data-netlify="true" onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">{form_name_label}</label>
                <div className="input-wrapper name">
                    <input
                        id="name"
                        name="name"
                        value={nameField}
                        placeholder="Your name"
                        required
                        onChange={(e) => setName(e.target.value)}
                        onBlur={onBlur}
                    ></input>
                </div>
            </div>
            <div>
                <label htmlFor="email">{form_email_label}</label>
                <div className="input-wrapper email">
                    <input
                        id="email"
                        name="email"
                        placeholder="yourname@email.com"
                        type="email"
                        value={emailField}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
            </div>
            <div>
                <label htmlFor="phone">{form_phone_label}</label>
                <div className="input-wrapper phone">
                    <input
                        id="phone"
                        name="phone"
                        type="phone"
                        placeholder="+1 xxx-xxx-xxxx"
                        required
                        value={phoneField}
                        onChange={(e) => setPhone(e.target.value)}
                    ></input>
                </div>
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
            <div className="submit-wrapper">
                <button className="button black" type="submit" disabled={submitting}>
                    {form_submit}
                </button>
            </div>
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
    const recaptchaRef = useRef()
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
        form_phone_label,
        form_message_label,
        form_name_label,
        form_submit,
        success_message,
    } = data.prismicContactPage.data
    //console.log(data.prismicContactPage.data, form_phone_label)
    return (
        <Layout location={location} className="contact-page" {...Layout.pickSeoProps(data.prismicContactPage.data)}>
            {/*<ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.GATSBY_RECAPTCHA_KEY} />*/}
            <div className="contact-hero">
                <AnimatedBackground/>
            </div>
            <section className="contact-body container">
                <div>
                    <h1 className="withdot" dangerouslySetInnerHTML={{ __html: page_title.text }} />
                </div>
                <div>
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
            </section>
            <section className="contact-body2">
                <AnimatedBackground/>
                <div className="cover"/>
                <div className="container">
                    <div className="grid">
                        <div className="left"/>
                        <div className="right">
                            <div className="form-card">
                                <h2>{form_title}</h2>
                                <div className="contact-form-container">
                                    {isSubmited ? (
                                        <FormSuccess>{success_message}</FormSuccess>
                                    ) : (
                                        <FormContent
                                            form_email_label={form_email_label}
                                            form_message_label={form_message_label}
                                            form_name_label={form_name_label}
                                            form_phone_label={form_phone_label}
                                            form_submit={form_submit}
                                            recaptchaRef={recaptchaRef}
                                            setSubmit={setSubmit}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
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
                form_phone_label
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
