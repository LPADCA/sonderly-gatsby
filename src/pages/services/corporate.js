import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import CommonLink from "@components/common-link"
import { useState, useEffect } from "react"
import { ReactComponent as ArrowLeft } from "@assets/icons/arrow-left.svg"
import AnimateHeight from "react-animate-height"

const UnfoldItem = ({ isOpen, title, description }) => {
    const [stateOpen, setOpen] = useState(isOpen)
    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    return (
        <div className="unfold-item">
            <button onClick={() => setOpen(!stateOpen)} className="unfold-button">
                <h3 className={`unfold-item-title ${stateOpen ? "open" : ""} `}>
                    {title}
                    <ArrowLeft className={`unfold-arrow ${stateOpen ? "unfold-arrow-down" : "unfold-arrow-up"}`} />
                </h3>
            </button>
            <AnimateHeight height={stateOpen ? "auto" : 0} duration={1000}>
                <div className="unfold-item-body" dangerouslySetInnerHTML={{ __html: description }} />
            </AnimateHeight>
        </div>
    )
}

const UnfoldList = ({ list }) => {
    return (
        <div className="container unfold-list">
            <div className="unfold-list-items">
                {list.map((item, i) => (
                    <UnfoldItem key={i} isOpen={false} title={item.trainings_list_title.text} description={item.tranings_list_richtext.html} />
                ))}
            </div>
        </div>
    )
}


import "@styles/pages/services/corporate.scss"


const ServicesCorporate = ({ data, location }) => {
    const pageData = data.prismicGroupTraining.data
    const unfoldList = pageData.trainings_list
    const isFrench = data.prismicGroupTraining.lang === 'fr-ca'
    return (
        <Layout location={location} {...Layout.pickSeoProps(pageData)}>
            <div className="spacer-top" />
            <div className="corporate-services-hero-wrapper">
                <section className="corporate-services-hero">
                    <h1>{pageData.title.text}</h1>
                </section>
                <div className="container">
                    <div className={`corporate-services-hero-tabs ${isFrench && 'french'}`}>
                        {pageData.hero_boxes.map((box, i) => {
                            return (
                                <div key={i} className={`tab${i}`}>
                                    <div className="tab-header">
                                        {box.hero_boxes_icon.fixed && (
                                            <img
                                                src={box.hero_boxes_icon.fixed.src}
                                                srcSet={box.hero_boxes_icon.fixed.srcSet}
                                                width="60"
                                                alt={box.hero_boxes_icon.alt}
                                            />
                                        )}
                                        <div>
                                            <h3>{box.hero_boxes_title.text}</h3>
                                        </div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: box.hero_boxes_description.html }} />
                                    {box.hero_boxes_button_link && box.hero_boxes_button_link.url && (
                                        <CommonLink
                                            className="button black"
                                            type={box.hero_boxes_button_link.type}
                                            to={box.hero_boxes_button_link.url}
                                            target={box.hero_boxes_button_link.target}
                                        >
                                            {box.hero_boxes_button_text}
                                        </CommonLink>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: pageData.hero_note.html }} />
                </div>
            </div>
            <section className="trainings">
                <h2 className="centered">{pageData.trainings_title.text}</h2>
                <div className="container">
                    <div id="preview" className="preview-wrapper">
                        <UnfoldList list={unfoldList} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ServicesCorporate

export const servicesCorporateQuery = graphql`
    query ServicesCorporate {
        prismicGroupTraining {
            lang
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
