// Navbar.js

import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { RiSearchLine } from "react-icons/ri"
import Search from "./search"

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
                    src="/images/logomark.svg"
                    alt="Sonderly logo"
                />
            </Link>
        </div>
    )
}

class Hamburger extends React.Component {
    constructor(props) {
        super(props);
        this.menu = props.menu;
        this.state = {
            checked: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
          checked: !this.state.checked
        });
    }

    render() {
        return (
            <div id="menuToggle">
                <input type="checkbox" 
                    checked={this.state.checked}
                    onChange={()=>this.setState({checked:!this.state.checked})}
                    onClick={this.handleClick}
                    />
                <span></span>
                <span></span>
                <span></span>
                <div id="mobileMenu">
                    <ul className="l1">
                        {this.menu.map((item, i) => (
                            <li key={`l1${i}`} className={item.items[0] && item.items[0].submenu_item_text && 'hasChildren'}>
                                {item.primary.link.type === 'Document' ?
                                    <Link to={item.primary.link.url} onClick={this.handleClick}>
                                        {item.primary.text}
                                    </Link>:
                                    <a href={item.primary.link.url} onClick={this.handleClick}>
                                        {item.primary.text}
                                    </a>}
                                {item.items.length>0 && item.items[0].submenu_item_text && (
                                    <ul className="l2">
                                        {item.items.map((subitem, j) => (
                                            <li key={`l2${j}`}>
                                                {item.items[0].submenu_item_link.type === 'Document' ?
                                                    <Link onClick={this.handleClick} to={item.items[0].submenu_item_link.url}>
                                                        {subitem.submenu_item_text}
                                                    </Link> :
                                                    <a href={item.items[0].submenu_item_link.url} onClick={this.handleClick}>
                                                        {subitem.submenu_item_text}
                                                    </a>}
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
    //console.log(menu)
    return (
        <div>
            <ul id="primaryMenu" className="l1">
                {menu.map((item, i) => (
                    <li key={`l1${i}`} className={item.items[0] && item.items[0].submenu_item_text && 'hasChildren'}>
                        {item.primary.link.type === 'Document' ?
                            <Link to={item.primary.link.url}>
                                {item.primary.text}
                            </Link>:
                            <a href={item.primary.link.url}>
                                {item.primary.text}
                            </a>}
                        {item.items.length>0 && item.items[0].submenu_item_text && (
                            <ul className="l2">
                                {item.items.map((subitem, j) => (
                                    <li key={`l2${j}`}>
                                        {item.items[0].submenu_item_link.type === 'Document' ?
                                            <Link to={item.items[0].submenu_item_link.url}>
                                                {subitem.submenu_item_text}
                                            </Link> :
                                            <a href={item.items[0].submenu_item_link.url}>
                                                {subitem.submenu_item_text}
                                            </a>}
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

const SearchIcon = ({data}) => {
    return (
        <div>
            <Link className="search" to="/">
                <RiSearchLine size="24"/>
            </Link>
            {/*<Search searchIndex={data.index} />*/}    
        </div>
    )
}

const Login = ({}) => {
    return (
        <>
            <Link className="button" to="/">Log in</Link>
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
const Header = ({}) => {
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
                    siteSearchIndex {
                        index
                    }
                }
            `}
            render={(data) => (
                <div className="header">
                    <div className="container">
                        <div className="desktop">
                            <Logo />
                            <Navbar menu={data.prismicMenuPrimary.data.body} />
                            <SearchIcon data={data.siteSearchIndex}/>
                            
                            <Login />
                            <Lang />
                            <Hamburger menu={data.prismicMenuPrimary.data.body}/>
                        </div>
                        <div className="mobile"></div>
                    </div>
                </div>
            )}
        />
    )
}

export default Header
