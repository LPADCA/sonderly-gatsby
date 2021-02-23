// Navbar.js

import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { RiSearchLine } from "react-icons/ri"

const Logo = ({}) => {
    return (
        <div>
            <Link to="/">
                <img
                    className="logo hide-off-desktop"
                    src="/images/logo-header.png"
                    srcSet="/images/logo-header-2x.png 2x"
                    alt="Sonderly logo"
                />
                <img
                    className="logo hide-on-desktop"
                    src="/images/logo-header-mobile.png"
                    srcSet="/images/logo-header-mobile-2x.png 2x"
                    alt="Sonderly logo"
                />
            </Link>
        </div>
    )
}



const Navbar = ({ menu }) => {
    //console.log(menu)
    return (
        <div>
            <ul id="primaryMenu" className="l1">
                {menu.map((item, i) => (
                    <li key={`l1${i}`} className={item.items[0] && item.items[0].submenu_item_text && 'hasChildren'}>
                        <Link to={item.primary.link.url}>
                            {item.primary.text}
                        </Link>
                        {item.items.length>0 && item.items[0].submenu_item_text && (
                            <ul className="l2">
                                {item.items.map((subitem, j) => (
                                    <li key={`l2${j}`}>
                                        <Link
                                            to={item.items[0].submenu_item_link.url}
                                        >
                                            {subitem.submenu_item_text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Search = ({}) => {
    return (
        <div>
            <a className="search" href="/">
                <RiSearchLine size="24"/>
            </a>    
        </div>
    )
}
const Login = ({}) => {
    return (
        <>
            <a className="button" href="/">Log in</a>
        </>
    )
}
const Lang = ({}) => {
    return (
        <>
            <Link to="/fr/" className="lang">
                <img src="/images/french.svg" width="22" height="22"/>
            </Link>
        </>
    )
}
const Navigation = ({}) => {
    return (
        <StaticQuery
            query={graphql`
                query Navigation {
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
                            <Search />
                            <Login />
                            <Lang />
                        </div>
                        <div className="mobile"></div>
                    </div>
                </div>
            )}
        />
    )
}

export default Navigation
