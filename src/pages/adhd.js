import {graphql} from 'gatsby'
import CommonLink from "@components/common-link"
import Layout from "@components/common/layout.js"
import "@styles/pages/adhd.scss"

const Adhd = ({ data, location }) => {
    const blocks   = data.prismicAdhdLandingPage.data.block
    const training = data.prismicAdhdLandingPage.data
    const pageData = data.prismicGroupTraining.data
    const box  = pageData.hero_boxes[0]
    return (
        <Layout location={location} className="adhd-page">
            <div className='container-small'>
            {blocks.map((block, i)=> (
                <div key={i} className={`block ${i%2==1 ? 'reverse' : ''}`}>
                    <div className='bubble'>
                        <img src={block.header_bubble.url} alt={block.header_bubble.alt}/>
                    </div>
                    <div className='illustration'>
                        <img src={block.main_illustration.url} alt={block.main_illustration.alt}/>
                    </div>
                    <div className='text'>
                        <div dangerouslySetInnerHTML={{__html: block.text.html}}/>
                        <CommonLink to={block.button_link.url} className="button black">{block.button_text}</CommonLink>
                    </div>
                </div>
            ))}
            </div>
            <div className='container'>
                <div className='lower-block-header'>
                    <h2>{training.training_header.text}</h2>
                    <p>{training.training_description}</p>
                </div>
                <div className="container">
                    <div className="corporate-services-hero-tabs">
                        <div className={`tab0`}>
                            <div className="tab-header">
                                {box.hero_boxes_icon.fixed && (
                                    <img
                                        src={box.hero_boxes_icon.fixed.src}
                                        srcSet={box.hero_boxes_icon.fixed.srcSet}
                                        width="60"
                                        height="60"
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
                    </div>
                    <div className='cta-wrapper'>
                        <CommonLink
                            className="button"
                            to="/services/courses"
                        >
                            Browse our courses
                        </CommonLink>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Adhd

export const query = graphql`
    query AdhdQuery {
        prismicAdhdLandingPage {
            data {
                block {
                    button_link {
                        url
                    }
                    button_text
                    header_bubble {
                        url
                    }
                    main_illustration {
                        url
                    }
                    text {
                        text
                        html
                    }
                }
                training_header {
                    text
                }
                training_description
                seo_title
                seo_keywords
                seo_description
            }
        }
        prismicGroupTraining {
            data {
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
                    }
                    hero_boxes_title {
                        text
                    }
                }
            }
        }
    }
`