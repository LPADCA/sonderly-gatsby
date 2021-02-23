// Navbar.js

import React, { useState } from "react"
import { Link } from "gatsby"

const Toggle = null
const Navbox = null
const Hamburger = null
const NavbarLinks = null

const Navigation = ({menu}) => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    console.log(menu)

}



const Navbar = ({menu}) => {
    return (
        <div id="header">
            <Logo/>
            <Navigation menu={menu}/>
            {/*
            <Navigation>
                <Logo />
                <Toggle
                    navbarOpen={navbarOpen}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                >
                    {navbarOpen ? <Hamburger open /> : <Hamburger />}
                </Toggle>
                {navbarOpen ? (
                    <Navbox>
                        <NavbarLinks />
                    </Navbox>
                ) : (
                    <Navbox open>
                        <NavbarLinks />
                    </Navbox>
                )}
            </Navigation>
            */}
        </div>
    )
}

export default Navbar

