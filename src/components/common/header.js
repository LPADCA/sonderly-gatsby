// Navbar.js

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
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
                <img className="logo hide-on-desktop" src="/images/logomark.svg" alt="Sonderly logo" />
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
                        {this.menu.map((item, i) => (
                            <li
                                key={`l1${i}`}
                                className={item.items[0] && item.items[0].submenu_item_text && "hasChildren"}
                            >
                                <CommonLink to={item.primary.link} onClick={this.handleClick}>
                                    {item.primary.text}
                                </CommonLink>
                                {item.items.length > 0 && item.items[0].submenu_item_text && (
                                    <ul className="l2">
                                        {item.items.map((subitem, j) => (
                                            <li key={`l2${j}`}>
                                                <CommonLink to={subitem.submenu_item_link} onClick={this.handleClick}>
                                                    {subitem.submenu_item_text}
                                                </CommonLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
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
                    const { url, type } = link

                    const hasChildren = item.items[0] && item.items[0].submenu_item_text
                    return (
                        <li key={`l1${i}`} className={hasChildren && "hasChildren"}>
                            <CommonLink type={type} to={url} className="l1-link">
                                {text}
                            </CommonLink>
                            {item.items.length > 0 && item.items[0].submenu_item_text && (
                                <ul className="l2">
                                    {item.items.map((subitem, j) => {
                                        return (
                                            <li key={`l2${j}`}>
                                                <CommonLink type={subitem.type} to={subitem.submenu_item_link}>
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

const Lang = () => {
    const { GATSBY_LOCALE, GATSBY_LOCALE_LINK } = process.env
    console.log('GATSBY_LOCALE', GATSBY_LOCALE, GATSBY_LOCALE == null || GATSBY_LOCALE === "en-us")
    const flag = GATSBY_LOCALE == null || GATSBY_LOCALE === "en-us" ? "/images/french.svg" : "/images/english.svg"
    return (
        <a href={GATSBY_LOCALE_LINK} className="lang">
            <img src={flag} width="22" height="22" />
        </a>
    )
}
const Header = () => {
    return (
        <StaticQuery
            query={graphql`
                query Header {
                    prismicMenuPrimary {
                        data {
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
            `}
            render={(data) => (
                <div className="header">
                    <div className="container">
                        <div className="desktop">
                            <Logo />
                            <Navbar menu={data.prismicMenuPrimary.data.body} />
                            <a href="https://sonderly.csod.com/client/sonderly/default.aspx" className="button">
                                Login
                            </a>
                            <Lang />
                            <Hamburger menu={data.prismicMenuPrimary.data.body} />
                        </div>
                        <div className="mobile"></div>
                    </div>
                </div>
            )}
        />
    )
}

export default Header
