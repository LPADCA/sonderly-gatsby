import { useStaticQuery, graphql } from "gatsby"
import { useFormspark } from "@formspark/use-formspark"
import { useState, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { FaCheckCircle } from "react-icons/fa"

const LetsTalk = () => {
    const data = useStaticQuery(graphql`
        query HeaderQuery {
            site {
                    siteMetadata {
                    title
                }
            }
        }
    `)
    const [nameField, setName] = useState("")
    const [emailField, setEmail] = useState("")
    const [phoneField, setPhone] = useState("")
    const [messageField, setMessage] = useState("")
    const [isSubmited, setSubmit] = useState(false)
    const recaptchaRef = useRef()
    const FormSuccess = ({ children }) => {
        return (
            <div className="grid-success">
                <div className="illustration"/>
                <div className="content">
                    <div className="success-icon">
                        <FaCheckCircle className="icon" />
                        <div className="text">{children}</div>
                    </div>
                </div>
            </div>
        )
    }
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
                "_email.subject": 'New form submission',
                phone: phoneField,
                message: messageField,
            }
            //await recaptchaRef.current.executeAsync()
            //await submit(obj)
            setSubmit(true)
        } catch (err) {
            alert(err)
            alert(err.message)
            return
        }
    }
    const form_name_label = 'Your name'
    const form_email_label = 'Email'
    const form_phone_label = 'Phone'
    const form_message_label = 'Message'
    const form_submit = 'Submit message'
    const success_message = 'Successfully submitted'
    return (
        <div className="letstalk">
            <h2 className="newtitle explicit">Let's Talk</h2>
            <div className="container">
                <div>
                    <div className="form-wrapper">
                        {isSubmited ? (
                            <FormSuccess>{success_message}</FormSuccess>
                        ) : (
                            <form className="letstalk-form" id="letstalk-form" method="POST" onSubmit={onSubmit}>
                                <div className="grid">
                                    <div className="illustration"/>
                                    <div className="center">
                                        <label htmlFor="name">{form_name_label}</label>
                                        <div className="input-wrapper name">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={nameField}
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                            ></input>
                                        </div>
                                        <label htmlFor="email">{form_email_label}</label>
                                        <div className="input-wrapper email">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={emailField}
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            ></input>
                                        </div>
                                        <label htmlFor="phone">{form_phone_label}</label>
                                        <div className="input-wrapper phone">
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="phone"
                                                required
                                                value={phoneField}
                                                onChange={(e) => setPhone(e.target.value)}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="right">
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
                                </div>
                                <div className="submit-button">
                                    <button className="button black" type="submit" disabled={submitting}>
                                        {form_submit}
                                    </button>
                                    <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.GATSBY_RECAPTCHA_KEY} />
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LetsTalk
