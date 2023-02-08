import { useStaticQuery, graphql } from "gatsby"
import { useFormspark } from "@formspark/use-formspark"
import { useState, useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { FaCheckCircle } from "react-icons/fa"

const LetsTalk = () => {
    const query = useStaticQuery(graphql`
        query LetsTalkQuery {
            prismicLetstalk {
                data {
                    label_email
                    label_message
                    label_name
                    label_phone
                    submit
                    success
                    title {
                        text
                    }
                }
            }
        }
    `)
    const data = query.prismicLetstalk.data
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
    return (
        <section className="letstalk">
            <h2 className="explicit centered">{data.title[0].text}</h2>
            <div className="container">
                <div>
                    <div className="form-wrapper">
                        {isSubmited ? (
                            <FormSuccess>{data.success}</FormSuccess>
                        ) : (
                            <form name="letstalk-form" className="letstalk-form" id="letstalk-form" method="POST" data-netlify="true" onSubmit={onSubmit}>
                                <div className="grid">
                                    <div className="illustration"/>
                                    <div className="center">
                                        <label htmlFor="name">{data.label_name}</label>
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
                                        <label htmlFor="email">{data.label_email}</label>
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
                                        <label htmlFor="phone">{data.label_phone}</label>
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
                                        <label htmlFor="message">{data.label_message}</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            value={messageField}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows={messageField.split("\n").length}
                                        ></textarea>
                                        <div className="submit-button">
                                            <button className="button black" type="submit" disabled={submitting}>
                                                {data.submit}
                                            </button>
                                            <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={process.env.GATSBY_RECAPTCHA_KEY} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )

}

export default LetsTalk
