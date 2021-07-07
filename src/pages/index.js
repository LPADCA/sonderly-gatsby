import React from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import { JsonLD, organizationJsonLD } from "@components/json-ld"
import Hero from "@components/homepage/hero"
import Stats from "@components/homepage/stats"
import WhatWeDo from "@components/homepage/whatwedo"
import CoursesPreview from "@components/homepage/courses"
import WhoWeServe from "@components/homepage/whoweserve"
import Testimonials from "@components/homepage/testimonials"
import FeaturedCourses from "@components/homepage/featured_courses"

import "@styles/pages/homepage.scss"

const Homepage = ({ data, location }) => {
    return (
        <Layout location={location} {...Layout.pickSeoProps(data.prismicHomepage.data)}>
            <JsonLD>{organizationJsonLD}</JsonLD>
            <Hero slides={data.prismicHomepage.data.hero_slide} />
            {data.prismicHomepage.data.featured_courses.length > 0 && (
                <FeaturedCourses {...data.prismicHomepage.data} />
            )}
            <Stats blocks={data.prismicHomepage.data.stats_element} />
            <WhatWeDo data={data.prismicHomepage.data} />
            <CoursesPreview data={data.prismicHomepage.data} />
            <WhoWeServe data={data.prismicHomepage.data} />
            <Testimonials data={data.prismicHomepage.data} />
        </Layout>
    )
}

export default Homepage

export const homepageQuery = graphql`
    query Homepage {
        prismicHomepage {
            data {
                seo_title
                seo_keywords
                seo_description
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
                            ...GatsbyPrismicImageFluid_noBase64
                        }
                        alt
                    }
                }
                featured_title {
                    html
                }
                featured_description {
                    html
                }
                featured_courses {
                    course_link_text
                    course_link_url
                    course_description {
                        html
                    }
                    course_icon {
                        alt
                        fluid(maxHeight: 30) {
                            ...GatsbyPrismicImageFluid_noBase64
                        }
                    }
                    course_title {
                        html
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
                cp_title {
                    text
                }
                cp_description {
                    html
                }
                cp_card {
                    cp_card_button_link {
                        uid
                        url
                        type
                        target
                        link_type
                    }
                    cp_card_button_text
                    cp_card_description {
                        html
                    }
                    cp_card_title {
                        text
                    }
                }
                wws_client_type {
                    wws_type_image {
                        fixed(width: 500) {
                            ...GatsbyPrismicImageFixed
                        }
                    }
                    wws_type_title {
                        text
                    }
                }
                wws_title {
                    text
                }
                tmn_title {
                    text
                }
                tmn_cards {
                    tmn_card_author_position
                    tnm_card_author_name
                    tmn_card_text {
                        html
                    }
                }
            }
        }
    }
`
