const SubscribeForm = ({ subscription_button }) => {
    return (
        <div id="mc_embed_signup">
            <form
                action="https://sonderly.us3.list-manage.com/subscribe/post?u=449c6d27168b4aa6dcea47338&amp;id=0e9a6199da"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
                noValidate
            >
                <div id="mc_embed_signup_scroll">
                    <div className="mc-field-group">
                        <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" />
                    </div>
                    <div id="mce-responses" className="clear">
                        <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                        <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                    </div>
                    <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                        <input type="text" name="b_449c6d27168b4aa6dcea47338_0e9a6199da" tabIndex="-1" value="" />
                    </div>
                    <div className="clear">
                        <input
                            type="submit"
                            value={subscription_button}
                            name="subscribe"
                            id="mc-embedded-subscribe"
                            className="button"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SubscribeForm
