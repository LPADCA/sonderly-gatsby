import React from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"

import Hero from "@components/homepage/hero"
import Stats from "@components/homepage/stats"
import WhatWeDo from "../components/homepage/whatwedo"

import '@styles/homepage.scss'

const Homepage = ({ data }) => {
    //console.log(data)
    return (
        <Layout>
            <Hero slides={data.prismicHomepage.data.hero_slide}/>
            <Stats blocks={data.prismicHomepage.data.stats_element}/>
            <WhatWeDo data={data.prismicHomepage.data}/>
        </Layout>
    )
}

export default Homepage

export const homepageQuery = graphql` 
    query Homepage {
        prismicHomepage {
            data {
                hero_slide {
                    button_text
                    description
                    link {
                        target
                        link_type
                        url
                    }
                    title {
                        text
                    }
                    image {
                        fluid(maxWidth: 1000, maxHeight: 800) {
                          ...GatsbyPrismicImageFluid
                        }
                        alt
                      }
                }
                stats_element {
                    number
                    description
                }
                wwd_title {
                    text
                }
                wwd_text {
                    html
                }
                wwd_primary_button_link {
                    lang
                    link_type
                    target
                    type
                    url
                }
                wwd_primary_button_text
                wwd_secondary_button_link {
                    lang
                    link_type
                    target
                    type
                    url
                }
                wwd_secondary_button_text
                wwd_image {
                    fluid(maxWidth: 1000, maxHeight: 800) {
                      ...GatsbyPrismicImageFluid
                    }
                    alt
                }
                wwd_pros {
                    value
                }
            }
        }
    }
`
