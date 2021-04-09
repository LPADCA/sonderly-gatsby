import CommonLink from "@components/common-link"
import { useStaticQuery, graphql, Link } from "gatsby"
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi"

import "@styles/footer.scss"

const Footer = () => {
    const data = useStaticQuery(graphql`
        query FooterQuery {
            prismicMenuPrimary {
                data {
                    footer_links {
                        footer_link {
                            target
                            url
                            link_type
                        }
                        footer_link_label
                    }
                    footer_contacts {
                        html
                    }
                }
            }
        }
    `)

    const { footer_links, footer_contacts } = data.prismicMenuPrimary.data
    const year = new Date().getFullYear()
    return (
        <>
            <div id="footer">
                <div className="container">
                    <div className="table">
                        <div className="cell left">
                            <Link to="/">
                                <img
                                    className="logo"
                                    src="/images/logo-footer.png"
                                    srcSet="/images/logo-footer@2x.png 2x"
                                    alt="Sonderly logo (footer)"
                                />
                            </Link>
                            <div dangerouslySetInnerHTML={{ __html: footer_contacts.html }}></div>
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
                                {footer_links.map((i) => {
                                    return (
                                        <li key={i.footer_link.url}>
                                            <CommonLink type={i.footer_link.link_type} to={i.footer_link.url}>
                                                {i.footer_link_label}
                                            </CommonLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
