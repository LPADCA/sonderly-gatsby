import { useEffect } from "react"
import Layout from "@components/common/layout.js"
import { graphql, navigate } from "gatsby"
import { getImageProps } from "@utils/getImageProps"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgBig } from "../assets/decorations/bg-big.svg"
import "@styles/pages/404.scss"

const notFound404 = ({ location, data }) => {
    useEffect(() => {
        if (document.referrer.indexOf(process.env.GATSBY_LOCALE_LINK) !== -1) {
            navigate("/")
        }
    }, [])
    const { hero_image, hero_description } = data.prismic404.data
    const img = getImageProps(hero_image)
    return (
        <Layout className="not-found-page" location={location} {...Layout.pickSeoProps(data.prismic404.data)}>
            <BgBig className="bg-1" />
            <BgMedium className="bg-2 " />
            <div className="not-found-container">
                <div className="hero-image">
                    4<img {...img} />4
                </div>
                <div className="hero-description" dangerouslySetInnerHTML={{ __html: hero_description.html }} />
            </div>
        </Layout>
    )
}

export default notFound404

export const query = graphql`
    query NotFound {
        prismic404 {
            data {
                seo_title
                seo_keywords
                seo_description
                hero_description {
                    html
                }
                hero_image {
                    alt
                    fluid(maxWidth: 460) {
                        ...GatsbyPrismicImageFluid_noBase64
                    }
                    dimensions {
                        width
                        height
                    }
                }
            }
        }
    }
`
