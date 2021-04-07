import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import { useState } from "react"
import AnimateHeight from "react-animate-height"
import { ReactComponent as BgBig } from "../assets/decorations/bg-big.svg"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgSmall } from "../assets/decorations/bg-small.svg"

import "@styles/pages/about.scss"

const ManagementItem = ({ management_photo, management_name, management_description, photo_bg_color }) => {
    const [isOpen, setOpen] = useState(false)
    const onClick = () => setOpen(!isOpen)
    return (
        <div key={management_name} className="card">
            <div>
                <div className="management-photo" style={{ backgroundColor: photo_bg_color }}>
                    <img {...management_photo.fixed} {...management_photo.dimensions} alt={management_photo.alt} />
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
                        read more
                    </button>
                </div>
            </div>
        </div>
    )
}

const AboutPage = ({ data, location }) => {
    const { page_title, hero_image, page_description, management_team } = data.prismicAboutPage.data
    return (
        <Layout location={location} className="about-page" {...Layout.pickSeoProps(data.prismicAboutPage.data)}>
            <BgSmall className="bg-1" />
            <BgMedium className="bg-2" />
            <BgSmall className="bg-3" />
            <BgBig className="bg-4" />
            <BgSmall className="bg-5" />
            <section className="container two-column">
                <div>
                    <img {...hero_image.fluid} {...hero_image.dimensions} alt={hero_image.alt} />
                </div>
                <div className="hero-description">
                    <h1>{page_title.text}</h1>
                    <div dangerouslySetInnerHTML={{ __html: page_description.html }}></div>
                </div>
            </section>
            <section className="container management-team">
                <h2>Management Team</h2>
                <div className="management-cards">
                    {management_team.map((item) => (
                        <ManagementItem key={item.management_name} {...item} />
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
