import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import "@styles/sonderly.scss"
import "@styles/header.scss"

import Header from "./header"
import Footer from "./footer"

const organizationJsonLD = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://sonderly.io/",
    logo: "https://sonderly.io/images/logo-header-2x.png",
    name: "Sonderly",
    sameAs: [
        "https://www.facebook.com/sonderly.io/",
        "https://twitter.com/sonderlyio",
        "https://www.instagram.com/sonderly.io/",
        "https://www.linkedin.com/showcase/sonderly/",
    ],
})

const Layout = ({ location, children, seo_title, seo_description, seo_keywords, ...props }) => {
    const { site } = useStaticQuery(graphql`
        query SeoQuery {
            site {
                siteMetadata {
                    description
                    title
                }
            }
        }
    `)
    const title = seo_title || site.siteMetadata.title
    const description = seo_description || site.siteMetadata.description
    const keywords = seo_keywords || ""
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
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta property="og:image" content="https://sonderly.io/images/og.jpg" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:locale" content={process.env.GATSBY_LOCALE} />
                <link rel="alternate" href={`https://sonderly.io${location.pathname}`} hrefLang="en" />
                <link rel="alternate" href={`https://fr.sonderly.io${location.pathname}`} hrefLang="fr" />
                <link
                    href="https://fonts.googleapis.com/css?family=Muli:400,400i,600,600i,700,700i&display=swap"
                    rel="stylesheet"
                />
                <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" />\
                <script type="application/ld+json">{organizationJsonLD}</script>
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
