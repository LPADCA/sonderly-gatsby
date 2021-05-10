// Navbar.js

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import CommonLink from "@components/common-link"

const Logo = () => {
    return (
        <div>
            <Link to="/">
                <img
                    className="logo hide-off-desktop"
                    src="/images/logo-header.png"
                    srcSet="/images/logo-header-2x.png 2x"
                    alt="Sonderly logo"
                    width="198.5"
                    height="60"
                />
                <img className="logo hide-on-desktop" src="/images/logomark.svg" width="40" height="56" alt="Sonderly logo" />
            </Link>
        </div>
    )
}

class Hamburger extends React.Component {
    constructor(props) {
        super(props)
        this.menu = props.menu
        this.state = {
            checked: false,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            checked: !this.state.checked,
        })
    }

    render() {
        return (
            <div id="menuToggle">
                <input
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={() => this.setState({ checked: !this.state.checked })}
                    onClick={this.handleClick}
                />
                <span></span>
                <span></span>
                <span></span>
                <div id="mobileMenu">
                    <ul className="l1">
                        {this.menu.map((item, i) => {
                            const link = item.primary.link
                            return (
                                <li
                                    key={`l1${i}`}
                                    className={item.items[0] && item.items[0].submenu_item_text && "hasChildren"}
                                >
                                    <CommonLink type={link.link_type} to={link.url} onClick={this.handleClick}>
                                        {item.primary.text}
                                    </CommonLink>
                                    {item.items.length > 0 && item.items[0].submenu_item_text && (
                                        <ul className="l2">
                                            {item.items.map((subitem, j) => (
                                                <li key={`l2${j}`}>
                                                    <CommonLink
                                                        type={subitem.submenu_item_link.link_type}
                                                        to={subitem.submenu_item_link.url}
                                                        onClick={this.handleClick}
                                                    >
                                                        {subitem.submenu_item_text}
                                                    </CommonLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

const Navbar = ({ menu }) => {
    return (
        <div>
            <ul id="primaryMenu" className="l1">
                {menu.map((item, i) => {
                    const { text, link } = item.primary
                    const { url, link_type } = link

                    const hasChildren = item.items[0] && item.items[0].submenu_item_text
                    return (
                        <li key={`l1${i}`} className={hasChildren && "hasChildren"}>
                            {url ? (
                                <CommonLink type={link_type} to={url} className="header-link l1-link">
                                    {text}
                                </CommonLink>
                            ) : (
                                <span className="header-link l1-link">{text}</span>
                            )}
                            {item.items.length > 0 && item.items[0].submenu_item_text && (
                                <ul className="l2">
                                    {item.items.map((subitem, j) => {
                                        return (
                                            <li key={`l2${j}`}>
                                                <CommonLink
                                                    type={subitem.submenu_item_link.link_type}
                                                    to={subitem.submenu_item_link.url}
                                                    className="header-link"
                                                >
                                                    {subitem.submenu_item_text}
                                                </CommonLink>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const Lang = ({ currentUrl }) => {
    const locale = process.env.GATSBY_LOCALE
    const locale_host = process.env.GATSBY_LOCALE_LINK || ""
    const url = `${locale_host}${currentUrl}`
    const flag = locale == null || locale === "en-us" ? "/images/french.svg" : "/images/english.svg"
    return (
        <a href={url} className="lang" title="switch language">
            <img src={flag} width="22" height="22" />
        </a>
    )
}
const Header = ({ location }) => {
    const data = useStaticQuery(graphql`
        query Header {
            prismicMenuPrimary {
                data {
                    login_text
                    login_link {
                        url
                    }
                    body {
                        ... on PrismicMenuPrimaryBodyMenuItem {
                            id
                            items {
                                submenu_item_text
                                submenu_item_link {
                                    url
                                    uid
                                    type
                                    link_type
                                    lang
                                    target
                                }
                            }
                            primary {
                                text
                                link {
                                    url
                                    uid
                                    type
                                    target
                                    link_type
                                    lang
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    const { login_text, login_link } = data.prismicMenuPrimary.data
    return (
        <div className="header">
            <div className="header-container">
                <div className="desktop">
                    <Logo />
                    <Navbar currentUrl={location.pathname} menu={data.prismicMenuPrimary.data.body} />
                    <a href={login_link.url} className="button">
                        {login_text}
                    </a>
                    <Lang currentUrl={location.pathname} />
                    <Hamburger menu={data.prismicMenuPrimary.data.body} />
                </div>
                <div className="mobile"></div>
            </div>
        </div>
    )
}

export default Header
