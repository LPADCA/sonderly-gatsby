import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import { ReactComponent as BgBig } from "../../assets/decorations/bg-big.svg"
import { ReactComponent as BgMedium } from "../../assets/decorations/bg-medium.svg"
import { ReactComponent as BgSmall } from "../../assets/decorations/bg-small.svg"
import { getImageProps } from "@utils/getImageProps"

import "../../styles/pages/services/professional-training.scss"

const ProfessionalTrainingPage = ({ data, location }) => {
    const { page_title, page_description, signup_link, signup_link_text, hero_image, oap_professions_title, oap_professions_list, skill_block, eligibility_text, eligibility_title } = data.prismicProfessionalTraining.data

    return (
        <Layout
            location={location}
            className="professional-training-page"
            {...Layout.pickSeoProps(data.prismicProfessionalTraining.data)}
        >
            <BgBig className="bg-1" />
            <BgSmall className="bg-2" />
            <BgSmall className="bg-3" />
            <BgMedium className="bg-4" />
            <BgSmall className="bg-5" />
            <BgMedium className="bg-6" />
            <section className="container dual-column">
                <div>
                    <img {...getImageProps(hero_image)} />
                </div>
                <div className="hero-description">
                    <h1>{page_title.text}</h1>
                    <div dangerouslySetInnerHTML={{ __html: page_description.html }}></div>
                    <a href={signup_link.url} className="button" target="_blank">{signup_link_text}</a>
                </div>
            </section>
            <section className="container professions">
                <div dangerouslySetInnerHTML={{ __html: oap_professions_title.html }}></div>
                <div className="professions-list">
                    {oap_professions_list.map(({ profession }, i) => {
                        return (
                            <div className="profession">{profession}</div>
                        )
                    })}
                </div>
            </section>
            <section className="container skills">
                {skill_block.map(({ image_position, skill_image, skill_text }, i) => {
                    return (
                        <div className={"skills-block "+image_position}>
                            <div className="image">
                                <img {...getImageProps(skill_image)} />
                            </div>
                            <div className="content">
                                <div dangerouslySetInnerHTML={{ __html: skill_text.html }}></div>
                            </div>
                        </div>
                    )
                })}
            </section>
            <section className="container eligibility">
                <h2>{eligibility_title.text}</h2>
                <div dangerouslySetInnerHTML={{ __html: eligibility_text.html }}></div>
                <a href={signup_link.url} className="button" target="_blank">{signup_link_text}</a>
            </section>

        </Layout>
    )
}

export const query = graphql`
    query ProfessionalTrainingPageQuery {
        prismicProfessionalTraining {
            data {
                seo_title
                seo_keywords
                seo_description
                signup_link {
                    url
                }
                signup_link_text
                hero_image {
                    alt
                    fluid(maxWidth: 550) {
                        ...GatsbyPrismicImageFluid_noBase64
                    }
                    dimensions {
                        width
                        height
                    }
                }
                page_description {
                    html
                }
                page_title {
                    text
                }
                oap_professions_title {
                    html
                }
                oap_professions_list {
                    profession
                }
                skill_block {
                    image_position
                    skill_image {
                      alt
                      fluid(maxWidth: 550) {
                         ...GatsbyPrismicImageFluid_noBase64
                      }
                      dimensions {
                        height
                        width
                      }
                    }
                    skill_text {
                      html
                    }
                }
                eligibility_text {
                    html
                }
                eligibility_title {
                    text
                }
            }
        }
    }
`

export default withPreview(ProfessionalTrainingPage)
