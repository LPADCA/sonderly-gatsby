import { useState } from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import Scroll from "react-scroll"
import CommonLink from "@components/common-link"

import "@styles/pages/services/corporate.scss"

const Element = Scroll.Element
const scroller = Scroll.scroller

const ServicesCorporate = ({ data, location }) => {
    const [activeSlide, setActiveSlide] = useState(0)
    const pageData = data.prismicServicesCorporate.data

    const changeSlide = (id) => {
        setActiveSlide(id)
        scroller.scrollTo("preview-wrapper", {
            duration: 500,
            delay: 50,
            smooth: true,
            offset: -80, // Scrolls to element + 50 pixels down the page
        })
    }

    return (
        <Layout location={location} {...Layout.pickSeoProps(pageData)}>
            <div className="spacer-top" />
            <div className="corporate-services-hero-wrapper">
                <div className="corporate-services-hero">
                    <div className="container">
                        <h1>{pageData.title.text}</h1>
                        <div dangerouslySetInnerHTML={{ __html: pageData.subheading.html }} />
                    </div>
                </div>
                <div className="container">
                    <div className="corporate-services-hero-tabs">
                        {pageData.hero_boxes.map((box, i) => (
                            <div key={i} className={`tab${i}`}>
                                <div className="tab-header">
                                    <div>
                                        <img
                                            src={box.hero_boxes_icon.fixed.src}
                                            srcSet={box.hero_boxes_icon.fixed.srcSet}
                                            width="60"
                                            height="60"
                                            alt={box.hero_boxes_icon.alt}
                                        />
                                    </div>
                                    <div>
                                        <h3>{box.hero_boxes_title.text}</h3>
                                    </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: box.hero_boxes_description.html }} />
                                {box.hero_boxes_button_link && box.hero_boxes_button_link.url && (
                                    <CommonLink
                                        className="button"
                                        type={box.hero_boxes_button_link.type}
                                        to={box.hero_boxes_button_link.url}
                                        target={box.hero_boxes_button_link.target}
                                    >
                                        {box.hero_boxes_button_text}
                                    </CommonLink>
                                )}
                            </div>
                        ))}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: pageData.hero_note.html }} />
                </div>
            </div>
            <div className="trainings container">
                <h2 className="centered underline">{pageData.trainings_title.text}</h2>
                <Element name="preview-wrapper" />
                <ul>
                    {pageData.trainings_list.map((item, i) => (
                        <li key={i} className={i === activeSlide ? "active" : ""} onClick={() => changeSlide(i)}>
                            {item.trainings_list_title.text}
                        </li>
                    ))}
                </ul>
                <div className="preview-wrapper">
                    {pageData.trainings_list.map((item, i) => (
                        <div key={`page-${i}`} className={`preview ${i === activeSlide ? "selected" : ""}`}>
                            <div className="image">
                                <img
                                    src={item.traninings_list_image.fixed.src}
                                    srcSet={item.traninings_list_image.fixed.srcSet}
                                    width="60"
                                    height="60"
                                    alt={item.traninings_list_image.alt}
                                />
                            </div>
                            <div className="content">
                                <h3>{item.trainings_list_title.text}</h3>
                                <div dangerouslySetInnerHTML={{ __html: item.tranings_list_richtext.html }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ServicesCorporate

export const servicesCorporateQuery = graphql`
    query ServicesCorporate {
        prismicServicesCorporate {
            data {
                seo_title
                seo_keywords
                seo_description
                hero_boxes {
                    hero_boxes_button_link {
                        url
                        uid
                        type
                        target
                        link_type
                    }
                    hero_boxes_button_text
                    hero_boxes_description {
                        html
                    }
                    hero_boxes_icon {
                        fixed(width: 60, height: 60) {
                            ...GatsbyPrismicImageFixed
                        }
                        alt
                    }
                    hero_boxes_title {
                        text
                    }
                }
                hero_note {
                    html
                }
                subheading {
                    html
                }
                title {
                    text
                }
                trainings_list {
                    trainings_list_title {
                        text
                    }
                    tranings_list_richtext {
                        html
                    }
                    traninings_list_image {
                        fixed(width: 500) {
                            ...GatsbyPrismicImageFixed
                        }
                        alt
                    }
                }
                trainings_title {
                    text
                }
            }
        }
    }
`
