import Layout from "@components/common/layout.js"
import { withPreview } from "gatsby-source-prismic"
import { graphql } from "gatsby"
import { ReactComponent as BgBig } from "../../assets/decorations/bg-big.svg"
import { ReactComponent as BgMedium } from "../../assets/decorations/bg-medium.svg"
import { ReactComponent as BgSmall } from "../../assets/decorations/bg-small.svg"
import { getImageProps } from "@utils/getImageProps"

import "../../styles/pages/services/funded-training.scss"

const FundedTrainingPage = ({ data, location }) => {
    const { page_title, page_description, hero_image, criterias, criteria_notes } = data.prismicFundedTraining.data

    return (
        <Layout
            location={location}
            className="funded-training-page"
            {...Layout.pickSeoProps(data.prismicFundedTraining.data)}
        >
            <BgBig className="bg-1" />
            <BgSmall className="bg-2" />
            <BgSmall className="bg-3" />
            <BgMedium className="bg-4" />
            <BgSmall className="bg-5" />
            <BgMedium className="bg-6" />
            <section className="container two-column">
                <div>
                    <img {...getImageProps(hero_image)} />
                </div>
                <div className="hero-description">
                    <h1>{page_title.text}</h1>
                    <div dangerouslySetInnerHTML={{ __html: page_description.html }}></div>
                </div>
            </section>
            <section className="criterias container card-grid">
                {criterias.map(({ criteria_title, criteria_description }, i) => {
                    return (
                        <div key={criteria_title} className="card">
                            <div className="ribbon">Criteria {i + 1}</div>
                            <h2 className="">{criteria_title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: criteria_description.html }}></div>
                        </div>
                    )
                })}
            </section>
            <section className="criteria-note container">
                <div className="criteria-note-content" dangerouslySetInnerHTML={{ __html: criteria_notes.html }} />
            </section>
        </Layout>
    )
}

export const query = graphql`
    query FundedTrainingPageQuery {
        prismicFundedTraining {
            data {
                seo_title
                seo_keywords
                seo_description
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
                criteria_notes {
                    html
                }
                criterias {
                    criteria_title
                    criteria_description {
                        html
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

export default withPreview(FundedTrainingPage)
