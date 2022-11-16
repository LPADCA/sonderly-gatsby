import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
//import { useState } from "react"
//import AnimateHeight from "react-animate-height"
import { getImageProps } from "@utils/getImageProps"
import { JsonLD, organizationJsonLD } from "@components/json-ld"
import Stats from "@components/common/stats"
import "@styles/pages/about.scss"

const ManagementItem = ({ management_photo, management_name, management_description, photo_bg_color, button_text }) => {
    const heroImg = getImageProps(management_photo)
    return (
        <div className="card-container">
            <div key={management_name} className="card">
                <div className="management-photo" style={{ backgroundColor: photo_bg_color }}>
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
    } = data.prismicAboutPage.data
    return (
        <Layout location={location} className="about-page" {...Layout.pickSeoProps(data.prismicAboutPage.data)}>
            <JsonLD>{organizationJsonLD}</JsonLD>
            <div className="spacer-top" />
            <section className="container title-grid">
                <div>
                    <h1>{page_title.text}</h1>
                </div>
                <div className="hero-description">
                    <div dangerouslySetInnerHTML={{ __html: page_description.html }}></div>
                </div>
            </section>
            <img className="hero-image" {...getImageProps(hero_image)} />
            <Stats />
            <section className="container management-team">
                <h2>{section_name}</h2>
                <div className="management-cards">
                    {management_team.map((item) => (
                        <ManagementItem management_photo={item.management_photo} key={item.management_name} {...item} button_text={button_text} />
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query AboutQuery {
        prismicAboutPage {
            data {
                seo_title
                seo_keywords
                seo_description
                section_name
                button_text
                hero_image {
                    fluid(maxWidth: 550, maxHeight: 550) {
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
                        fixed(height: 167) {
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
            }
        }
    }
`

export default withPreview(AboutPage)
