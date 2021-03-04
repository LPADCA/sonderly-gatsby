import React from "react"
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, useStaticQuery, graphql } from "gatsby"
import "@styles/sonderly.scss"
import "@styles/header.scss"

import Header from "./header";
import Footer from "./footer";


const Layout = ({ location, children }) => {

  return (
    <>
        <Helmet>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta http-equiv='cache-control' content='no-cache'/>
            <meta http-equiv='expires' content='0'/>
            <meta http-equiv='pragma' content='no-cache'/>
            <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,600,600i,700,700i&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" />
            <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=vindicia-public"></script>
        </Helmet>

        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

