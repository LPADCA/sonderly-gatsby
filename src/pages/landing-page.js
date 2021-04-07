import React from "react"
import Layout from "@components/common/layout.js"
import { graphql } from "gatsby"
import { getImageProps } from "@utils/getImageProps"
import { ReactComponent as BgMedium } from "../assets/decorations/bg-medium.svg"
import { ReactComponent as BgBig } from "../assets/decorations/bg-big.svg"
import { ReactComponent as BgSmall } from "../assets/decorations/bg-small.svg"
import "@styles/pages/landing-page.scss"

const CourseCard = ({ course_title, course_description, course_image }) => {
    const img = getImageProps(course_image)
    return (
        <div className="card">
            <img className="card-image" {...img} />
            <div className="card-content">
                <div dangerouslySetInnerHTML={{ __html: course_title.html }}></div>
                <div dangerouslySetInnerHTML={{ __html: course_description.html }}></div>
            </div>
        </div>
    )
}

const LandingPage = ({ location, data }) => {
    const { title, description, courses } = data.prismicLandingPage.data
    return (
        <Layout className="landing-page" location={location} {...Layout.pickSeoProps(data.prismicLandingPage.data)}>
            <BgBig className="bg-1" />
            <BgMedium className="bg-2" />
            <BgSmall className="bg-3" />
            <div className="landing-header">
                <div className="landing-header-title" dangerouslySetInnerHTML={{ __html: title.html }} />
                <div className="landing-header-description" dangerouslySetInnerHTML={{ __html: description.html }} />
            </div>
            <div>
                <div className="landing-content container card-grid">
                    {courses.map((course) => {
                        return <CourseCard key={course.course_title} {...course} />
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default LandingPage

export const query = graphql`
    query LandingPageQuery {
        prismicLandingPage {
            data {
                courses {
                    course_title {
                        html
                    }
                    course_description {
                        html
                    }
                    course_image {
                        alt
                        fixed(width: 560) {
                            ...GatsbyPrismicImageFixed_noBase64
                        }
                        dimensions {
                            height
                            width
                        }
                    }
                }
                description {
                    html
                }
                title {
                    html
                }
                seo_title
                seo_keywords
                seo_description
            }
        }
    }
`
