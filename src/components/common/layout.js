import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import "@styles/sonderly.scss"
import "@styles/header.scss"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ location, children, seo_title, seo_description, seo_keywords, ...props }) => {
    const title = seo_title || "Sonderly"
    return (
        <>
            <Helmet
                htmlAttributes={{
                    lang: process.env.GATSBY_LOCALE,
                }}
            >
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta httpEquiv="cache-control" content="no-cache" />
                <meta httpEquiv="expires" content="0" />
                <meta httpEquiv="pragma" content="no-cache" />

                <title>{title}</title>
                <meta name="description" content={seo_description} />
                <meta name="keywords" content={seo_keywords} />
                <meta property="og:image" content="/images/og.jpg" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={seo_description} />
                <meta property="og:locale" content={process.env.GATSBY_LOCALE} />
                <link
                    href="https://fonts.googleapis.com/css?family=Muli:400,400i,600,600i,700,700i&display=swap"
                    rel="stylesheet"
                />
                <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" />
                <script
                    async
                    defer
                    src="https://static.cdn.prismic.io/prismic.js?new=true&repo=vindicia-public"
                ></script>
            </Helmet>

            <Header location={location} />
            <main {...props}>{children}</main>
            <Footer />
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

Layout.pickSeoProps = ({ seo_description, seo_title, seo_keywords }) => ({
    seo_description,
    seo_title,
    seo_keywords,
})

export default Layout
