import React from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import Hero from "@components/homepage/hero.js"
import Stats from "@components/homepage/stats.js"

import '@styles/homepage.scss'

const Homepage = ({ data }) => {
    //console.log(data)
    return (
        <Layout>
            <Hero slides={data.prismicHomepage.data.slide}/>
            <Stats blocks={data.prismicHomepage.data.element}/>
        </Layout>
    )
}

export default Homepage

export const homepageQuery = graphql` 
    query Homepage {
        prismicHomepage {
            data {
                slide {
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
                element {
                    number
                    description
                }
            }
        }
    }
`
