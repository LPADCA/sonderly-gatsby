import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import { JsonLD, organizationJsonLD } from "@components/json-ld"
import Hero from "@components/homepage/hero"
import Stats from "@components/common/stats"
import WhatWeDo from "@components/homepage/whatwedo"
import CoursesPreview from "@components/homepage/courses"
import WhoWeServe from "@components/homepage/whoweserve"
import Testimonials from "@components/homepage/testimonials"
//import FeaturedCourses from "@components/homepage/featured_courses"
//import WhatsNew from "@components/homepage/whatsnew"
import LetsTalk from "@components/common/letstalk"
import Popup from 'reactjs-popup';
import { RichText } from 'prismic-reactjs'
import 'reactjs-popup/dist/index.css';
import "@styles/pages/homepage.scss"
import "@styles/popup.scss"

const Homepage = ({ data, location }) => {
    const [popupOpen, setOpen] = useState(false);
    const openModal = () => {console.log(popupOpen);setOpen(true)};
    const closeModal = () => {console.log(popupOpen);setOpen(false)};
    const isFrench = data.prismicHomepage2022.lang === 'fr-ca'
    useEffect(()=>{
        console.log(isFrench)
        setTimeout(()=>{
          if (!window.sessionStorage.getItem("popup01")) {
              window.sessionStorage.setItem("popup01", true);
              setOpen(true)
            }
        }, 4000)
      }, [])
        return (
        <Layout location={location} {...Layout.pickSeoProps(data.prismicHomepage2022.data)}>
            <JsonLD>{organizationJsonLD}</JsonLD>
            <Hero slides={data.prismicHomepage2022.data.hero_slide} />
            <WhatWeDo data={data.prismicHomepage2022.data} />
            <Stats />
            <CoursesPreview data={data.prismicHomepage2022.data} />
            <WhoWeServe data={data.prismicHomepage2022.data} />
            <Testimonials data={data.prismicHomepage2022.data} />
            <LetsTalk data={data.prismicHomepage2022.data} />
            <a onClick={openModal}>open</a>
            {isFrench && <Popup open={popupOpen} position="center center" onClose={closeModal} modal>
                <a className="close" onClick={closeModal}>
                    &times;
                </a>
                <h3>{data.prismicHomepage2022.data.popup_title.text}</h3>
                <RichText render={data.prismicHomepage2022.data.popup_content.raw}/>
            </Popup>}    
        </Layout>
    )
}

/*
            {data.prismicHomepage.data.whats_new_box.length > 0 && (
                <WhatsNew
                    sectionTitle={data.prismicHomepage.data.whats_new_section_title}
                    boxes={data.prismicHomepage.data.whats_new_box}
                />
            )}
            {data.prismicHomepage.data.featured_courses.length > 0 && (
                <FeaturedCourses {...data.prismicHomepage.data} />
            )}
            <WhatWeDo data={data.prismicHomepage.data} />
*/



export default Homepage

export const homepageQuery = graphql`
    query Homepage {
        prismicHomepage2022 {
            lang
            data {
                seo_title
                seo_keywords
                seo_description
                hero_slide {
                    button_text
                    background {
                        alt
                        url(imgixParams: {maxWidth: 1400})
                      }
                    description {
                      html
                    }
                    link {
                      link_type
                      url
                      target
                    }
                    title {
                        html
                        raw
                        text
                    }
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
                wwd_pros {
                    value
                }
                stats_element {
                    number
                    description
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
                    cp_card_image {
                        fixed {
                            src
                            srcSet
                        }
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
                    wws_type_title {
                        text
                    }
                wws_type_description
                }
                    wws_title {
                    text
                }
                wws_background_image {
                    url(imgixParams: {maxWidth: 1400})
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
                popup_title {
                    text
                }
                popup_content {
                    raw
                }
            }
        }
    }
`
/*
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
                featured_anchor
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
                wws_client_type {
                    wws_type_image {
                        fluid(maxWidth: 1000, maxHeight: 800) {
                            ...GatsbyPrismicImageFluid
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
                whats_new_section_title {
                    text
                }
                whats_new_box {
                    whats_new_box_content {
                        text
                    }
                    whats_new_box_button {
                        text
                    }
                    whats_new_box_link {
                        url
                        type
                        target
                        link_type
                    }
                }
            }
        }
    }
`
*/