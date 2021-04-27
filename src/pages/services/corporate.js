import { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import CommonLink from "@components/common-link"

import "@styles/pages/services/corporate.scss"

function makeUid(title) {
    return title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .toLowerCase()
}

const Switches = ({ activeSlide, trainings_list }) => {
    return (
        <ul>
            {trainings_list.map((item) => {
                const hash = item.course.uid || makeUid(item.trainings_list_title.text)
                return (
                    <li key={hash}>
                        <a href={`#${hash}`} className={`course-link ${hash == activeSlide ? "active" : ""}`}>
                            {item.trainings_list_title.text}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

const ServicesCorporate = ({ data, location }) => {
    const pageData = data.prismicServicesCorporate.data
    const firstTraining = pageData.trainings_list[0]
    const firstSlide = firstTraining.course.uid || makeUid(firstTraining.trainings_list_title.text)
    const [activeSlide, setActiveSlide] = useState(firstSlide)

    useEffect(() => {
        const hash = location.hash !== "" && location.hash.replace("#", "")
        if (hash) onHashChange()

        function onHashChange() {
            const hash = window.location.hash !== "" && window.location.hash.replace("#", "")
            setActiveSlide(hash ? hash : firstSlide)
            document.getElementById("preview").scrollIntoView({ block: "center", behavior: "smooth" })
        }
        window.addEventListener("hashchange", onHashChange)

        return () => window.removeEventListener("hashchange", onHashChange)
    }, [])

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
                <Switches activeSlide={activeSlide} trainings_list={pageData.trainings_list} />
                <div id="preview" className="preview-wrapper">
                    {pageData.trainings_list.map((item) => {
                        const hash = item.course.uid || makeUid(item.trainings_list_title.text)
                        return (
                            <div
                                key={item.trainings_list_title.text}
                                className={`preview ${hash == activeSlide ? "selected" : ""}`}
                            >
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
                        )
                    })}
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
                    course {
                        uid
                    }
                }
                trainings_title {
                    text
                }
            }
        }
    }
`
