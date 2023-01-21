import React, { useEffect, createRef } from 'react'
import {graphql} from 'gatsby'
import CommonLink from "@components/common-link"
import Layout from "@components/common/layout.js"
import lottie from "lottie-web";
import animation from "../../static/animations/head.json";
import "@styles/pages/adhd.scss"

const Adhd = ({ data, location }) => {
    const blocks   = data.prismicAdhdLandingPage.data.block
    const training = data.prismicAdhdLandingPage.data
    const animationContainer = createRef()
    useEffect(() => {
        const anim = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animation
        });
        return () => anim.destroy(); // optional clean up for unmounting
      }, []);

    return (
        <Layout location={location} className="adhd-page">
            <div className='container-small'>

                <div className='block block1'>
                    <div className='bubble'>
                        <img src={blocks[0].header_bubble.url} alt={blocks[0].header_bubble.alt}/>
                    </div>
                    <div className='illustration'>
                        <div className='animation1' ref={animationContainer}/>
                    </div>
                    <div className='text'>
                        <div dangerouslySetInnerHTML={{__html: blocks[0].text.html}}/>
                        <CommonLink to={blocks[0].button_link.url} className="button black">{blocks[0].button_text}</CommonLink>
                    </div>
                </div>

                <div className='block block2 reverse'>
                    <div className='bubble'>
                        <img src={blocks[1].header_bubble.url} alt={blocks[1].header_bubble.alt}/>
                    </div>
                    <div className='illustration'>
                        <img src={blocks[1].main_illustration.url} alt={blocks[1].main_illustration.alt}/>
                    </div>
                    <div className='text'>
                        <div dangerouslySetInnerHTML={{__html: blocks[1].text.html}}/>
                        <CommonLink to={blocks[1].button_link.url} className="button black">{blocks[1].button_text}</CommonLink>
                    </div>
                </div>

            </div>


            <div className='container'>
                <div className='lower-block-header'>
                    <h2>{training.title.text}</h2>
                </div>
                    <div className="corporate-services-hero-tabs">
                        <div className='tab0'>
                            <div className="tab-header">
                                {training.icon.fixed && (
                                    <img
                                        src={training.icon.fixed.src}
                                        srcSet={training.icon.fixed.srcSet}
                                        width="60"
                                        height="60"
                                    />
                                )}
                                <div>
                                    <h3>{training.title2.text}</h3>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: training.text_inside_box.html }} />
                            {training.signup_button_link && training.signup_button_link.url && (
                                <CommonLink
                                    className="button black"
                                    type={training.signup_button_link.type}
                                    to={training.signup_button_link.url}
                                    target={training.signup_button_link.target}
                                >
                                    {training.signup_button_text}
                                </CommonLink>
                            )}
                        </div>
                        <div className='tab1'>
                            <div className="tab-header">
                                <div>
                                    <h3>{training.discount_code_title.text}</h3>
                                </div>
                            </div>
                            <div className="content" dangerouslySetInnerHTML={{ __html: training.discount_code_text.html }} />
                            {training.cta_url && training.cta_url.url && (
                                <CommonLink
                                    className="button black"
                                    type={training.cta_url.type}
                                    to={training.cta_url.url}
                                    target={training.cta_url.target}
                                >
                                    {training.cta_text}
                                </CommonLink>
                            )}
                        </div>
                    </div>
                    <div className='cta-wrapper'>
                        <CommonLink
                            className="button"
                            to="/services/courses"
                        >
                            Buy now and complete the training later
                        </CommonLink>
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
                title2 {
                    text
                }
                title {
                    text
                }
                text_inside_box {
                    html
                }
                signup_button_text
                signup_button_link {
                    type
                    url
                    target
                }
                icon {
                    fixed(width: 60, height: 60) {
                        ...GatsbyPrismicImageFixed
                    }
                }
                discount_code_text {
                    html
                }
                discount_code_title {
                    text
                }
                cta_text
                cta_url {
                    type
                    url
                    target
                }

                seo_title
                seo_keywords
                seo_description
            }
        }
    }
`

