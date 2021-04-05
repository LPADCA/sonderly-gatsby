import React from "react"
import { Link } from "gatsby"
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi"

import "@styles/footer.scss"

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <>
            <div id="footer">
                <div className="container">
                    <div className="table">
                        <div className="cell left">
                            <img
                                className="logo"
                                src="/images/logo-footer.png"
                                srcSet="/images/logo-footer@2x.png 2x"
                                alt="Sonderly logo (footer)"
                            />

                            <p className="phonemail">
                                <a href="mailto:contactus@sonderly.io">contactus@sonderly.io</a>
                                <br />
                                +1 (416) 640 9459
                            </p>
                            <p className="address">
                                112 Merton Street
                                <br />
                                Toronto, Ontario, M4S-2Z8
                                <br />
                                <a href="#">View on map</a>
                            </p>
                        </div>
                        <div className="cell right">
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/sonderly.io/" title="Facebook" target="_blank">
                                        <FiFacebook />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/sonderlyio" title="Twitter" target="_blank">
                                        <FiTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/sonderly.io/" title="Instagram" target="_blank">
                                        <FiInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/showcase/sonderly/"
                                        title="LinkedIn"
                                        target="_blank"
                                    >
                                        <FiLinkedin />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="table">
                        <div className="cell left">
                            <p className="copyright">&copy; {year} Sonderly.io All Rights reserved.</p>
                        </div>
                        <div className="cell right">
                            <ul>
                                <li>
                                    <Link to="/">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/">Refund Policy</Link>
                                </li>
                                <li>
                                    <Link to="/">Terms of Use</Link>
                                </li>
                                <li>
                                    <Link to="/">Course Info Sheet</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
