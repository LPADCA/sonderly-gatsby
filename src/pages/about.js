import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
//import { useState } from "react"
//import AnimateHeight from "react-animate-height"
import { getImageProps } from "@utils/getImageProps"
import { JsonLD, organizationJsonLD } from "@components/json-ld"
import Stats from "@components/common/stats"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import "@styles/pages/about.scss"

const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '25px',
}

const ManagementItem = ({ management_photo, management_name, management_description, photo_bg_color, button_text }) => {
    const heroImg = getImageProps(management_photo)
    return (
        <div className="card-container">
            <div key={management_name} className="card">
                <div className="management-photo">
                    <img {...heroImg} />
                </div>
                <div className="management-content">
                    <h3>{management_name}</h3>
                    <div
                        className="management-description"
                        dangerouslySetInnerHTML={{ __html: management_description.html }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

const AboutPage = ({ data, location }) => {
    const {
        page_title,
        hero_image,
        page_description,
        management_team,
        button_text,
        section_name,
        mission_text,
        mission_title,
        vision_title,
        vision_text,
        story_title,
        story_text
    } = data.prismicAboutPage2022.data
    return (
        <Layout location={location} className="about-page" {...Layout.pickSeoProps(data.prismicAboutPage2022.data)}>
            <JsonLD>{organizationJsonLD}</JsonLD>
            <div className="spacer-top" />
            <section className="container title-grid">
                <div>
                    <h1 className="withdot">{page_title.text}</h1>
                </div>
                <div className="hero-description">
                    <div dangerouslySetInnerHTML={{ __html: page_description.html }}/>
                </div>
            </section>
            <section className="image-insert">
                <img className="hero-image" {...getImageProps(hero_image)} />
            </section>
            <Stats />
            <div className="story container">
                <div>
                    <h2 className="withdot">{story_title.text}</h2>
                </div>
                <div dangerouslySetInnerHTML={{ __html: story_text.html }}/>
            </div>
            <div className="vision">
                <div className="container">
                    <div className="grid">
                        <div>
                            <h2>{vision_title.text}</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: vision_text.html }}/>
                    </div>
                    <div className="grid auto">
                        <div className="amp">
                            &amp;
                        </div>
                        <div className="line">
                            <hr/>
                        </div>
                    </div>
                    <div className="grid">
                        <div>
                            <h2>{mission_title.text}</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: mission_text.html }}/>
                    </div>
                </div>
            </div>
            <section className="container management-team">
                <h2>{section_name}</h2>
                <div className="management-cards">
                    {management_team.map((item) => (
                        <ManagementItem management_photo={item.management_photo} key={item.management_name} {...item} button_text={button_text} />
                    ))}
                </div>
                <div className="management-cards-slider">
                    <Slider {...settings}>
                        {management_team.map((item, i) => (
                            <div key={i} className="card-container">
                                <div className="card">
                                    <div className="management-photo">
                                        <img {...getImageProps(item.management_photo)} />
                                    </div>
                                    <div className="management-content">
                                        <h3>{item.management_name}</h3>
                                        <div
                                            className="management-description"
                                            dangerouslySetInnerHTML={{ __html: item.management_description.html }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query AboutQuery {
        prismicAboutPage2022 {
            data {
                seo_title
                seo_keywords
                seo_description
                section_name
                hero_image {
                    fluid(maxWidth: 1400, maxHeight: 600) {
                        ...GatsbyPrismicImageFluid_noBase64
                    }
                    alt
                    dimensions {
                        height
                        width
                    }
                }
                management_team {
                    photo_bg_color
                    management_description {
                        html
                    }
                    management_name
                    management_photo {
                        fixed(height: 400) {
                            ...GatsbyPrismicImageFixed_noBase64
                        }
                        dimensions {
                            height
                            width
                        }
                        alt
                    }
                }
                page_description {
                    html
                }
                page_title {
                    text
                }
                mission_text {
                    html
                }
                mission_title {
                    text
                }
                vision_title {
                    text
                }
                vision_text {
                    html
                }
                story_title {
                    text
                }
                story_text {
                    html
                }
            }
        }
    }
`

export default withPreview(AboutPage)
