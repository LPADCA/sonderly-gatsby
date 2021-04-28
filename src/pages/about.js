import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import { useState } from "react"
import AnimateHeight from "react-animate-height"
import { ReactComponent as BgBig } from "../assets/decorations/bg-big.svg"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgSmall } from "../assets/decorations/bg-small.svg"
import { getImageProps } from "@utils/getImageProps"
import { JsonLD, organizationJsonLD } from "@components/json-ld"

import "@styles/pages/about.scss"

const ManagementItem = ({ management_photo, management_name, management_description, photo_bg_color, button_text }) => {
    const [isOpen, setOpen] = useState(false)
    const onClick = () => setOpen(!isOpen)
    const heroImg = getImageProps(management_photo)
    return (
        <div className="card-container">
            <div key={management_name} className="card">
                <div>
                    <div className="management-photo" style={{ backgroundColor: photo_bg_color }}>
                        <img {...heroImg} />
                    </div>
                    <div className="management-content">
                        <h3>{management_name}</h3>
                        <AnimateHeight duration={500} height={isOpen ? "auto" : 150}>
                            <div
                                className="management-description"
                                dangerouslySetInnerHTML={{ __html: management_description.html }}
                            ></div>
                        </AnimateHeight>
                        <button className="button" onClick={onClick}>
                            {button_text}
                        </button>
                    </div>
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
            <BgSmall className="bg-1" />
            <BgMedium className="bg-2" />
            <BgSmall className="bg-3" />
            <BgBig className="bg-4" />
            <BgSmall className="bg-5" />
            <section className="container two-column">
                <div>
                    <img {...getImageProps(hero_image)} />
                </div>
                <div className="hero-description">
                    <h1>{page_title.text}</h1>
                    <div dangerouslySetInnerHTML={{ __html: page_description.html }}></div>
                </div>
            </section>
            <section className="container management-team">
                <h2>{section_name}</h2>
                <div className="management-cards">
                    {management_team.map((item) => (
                        <ManagementItem key={item.management_name} {...item} button_text={button_text} />
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
