import React, { useEffect, createRef } from 'react'
import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import { JsonLD, organizationJsonLD } from "@components/json-ld"
import Hero from "@components/homepage/hero"
import Stats from "@components/homepage/stats"
import WhatWeDo from "@components/homepage/whatwedo"
import CoursesPreview from "@components/homepage/courses"
import WhoWeServe from "@components/homepage/whoweserve"
import Testimonials from "@components/homepage/testimonials"
import FeaturedCourses from "@components/homepage/featured_courses"
import WhatsNew from "@components/homepage/whatsnew"
import lottie from "lottie-web";
import head1 from "../../static/animations/head1.json";
import head2 from "../../static/animations/head2.json";
import speak1 from "../../static/animations/speak1.json";
import speak2 from "../../static/animations/speak2.json";
import "@styles/pages/homepage.scss"


const Homepage = ({ data, location }) => {
    const adhd_title = data.prismicHomepage.data.adhd_section_title ? data.prismicHomepage.data.adhd_section_title.text : ''
    const adhd_blocks = data.prismicHomepage.data.adhd_course_block
    const head1Container = createRef();
    const head2Container = createRef();
    const speak1Container = createRef();
    const speak2Container = createRef();
    useEffect(() => {
        const h1 = lottie.loadAnimation({
          container: head1Container.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: head1
        });
        const h2 = lottie.loadAnimation({
            container: head2Container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: head2
          });
        const s1 = lottie.loadAnimation({
            container: speak1Container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: speak1
          });
        const s2 = lottie.loadAnimation({
              container: speak2Container.current,
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: speak2
            });
          return () => {
            h1.destroy(); // optional clean up for unmounting
            h2.destroy(); // optional clean up for unmounting
            s1.destroy(); // optional clean up for unmounting
            s2.destroy(); // optional clean up for unmounting
        }
      }, []);
    console.log(adhd_title, adhd_blocks)
    return (
        <Layout location={location} {...Layout.pickSeoProps(data.prismicHomepage.data)}>
            <JsonLD>{organizationJsonLD}</JsonLD>
            <Hero slides={data.prismicHomepage.data.hero_slide} />
            {data.prismicHomepage.data.whats_new_box.length > 0 && (
                <WhatsNew
                    sectionTitle={data.prismicHomepage.data.whats_new_section_title}
                    boxes={data.prismicHomepage.data.whats_new_box}
                />
            )}
            {adhd_blocks && (
                <div className="adhd-home-section">
                    <h2 className="featured-title">{adhd_title}</h2>
                    <div className="adhd-blocks">
                        {adhd_blocks.map((item, i)=>(
                            <div key={i} className={`item${i}`}>
                                {i==0 && (
                                    <>
                                        <div className="bubble1" ref={speak1Container}/>
                                        <div className="head1" ref={head1Container}/>
                                    </>
                                )}
                                {i==1 && (
                                    <>
                                        <div className="bubble2" ref={speak2Container}/>
                                        <div className="head2" ref={head2Container}/>
                                    </>
                                )}
                                <h3>{item.title.text}</h3>
                                <div dangerouslySetInnerHTML={{__html: item.content.html}}/>
                                <div className="bottomlink">
                                    <a href={item.button_link.url} className="button">{item.button_text}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {data.prismicHomepage.data.featured_courses.length > 0 && (
                <FeaturedCourses {...data.prismicHomepage.data} />
            )}
            <Stats blocks={data.prismicHomepage.data.stats_element} />
            <WhatWeDo data={data.prismicHomepage.data} />
            <CoursesPreview data={data.prismicHomepage.data} />
            <WhoWeServe data={data.prismicHomepage.data} />
            <Testimonials data={data.prismicHomepage.data} />
        </Layout>
    )
}

export default Homepage

export const homepageQuery = graphql`
    query Homepage {
        prismicHomepage {
            data {
                seo_title
                seo_keywords
                seo_description
                hero_slide {
                    button_text
                    description
                    link {
                        target
                        link_type
                        url
                    }
                    title {
                        text
                    }
                    image {
                        fluid(maxWidth: 1000, maxHeight: 800) {
                            ...GatsbyPrismicImageFluid_noBase64
                        }
                        alt
                    }
                }
                featured_anchor
                featured_title {
                    html
                }
                featured_description {
                    html
                }
                featured_courses {
                    course_link_text
                    course_link_url
                    course_description {
                        html
                    }
                    course_icon {
                        alt
                        fluid(maxHeight: 30) {
                            ...GatsbyPrismicImageFluid_noBase64
                        }
                    }
                    course_title {
                        html
                    }
                }
                stats_element {
                    number
                    description
                }
                wwd_title {
                    text
                }
                wwd_text {
                    html
                }
                wwd_primary_button_link {
                    lang
                    link_type
                    target
                    type
                    url
                }
                wwd_primary_button_text
                wwd_secondary_button_link {
                    lang
                    link_type
                    target
                    type
                    url
                }
                wwd_secondary_button_text
                wwd_image {
                    fluid(maxWidth: 1000, maxHeight: 800) {
                        ...GatsbyPrismicImageFluid
                    }
                    alt
                }
                wwd_pros {
                    value
                }
                cp_title {
                    text
                }
                cp_description {
                    html
                }
                cp_card {
                    cp_card_button_link {
                        uid
                        url
                        type
                        target
                        link_type
                    }
                    cp_card_button_text
                    cp_card_description {
                        html
                    }
                    cp_card_title {
                        text
                    }
                }
                wws_client_type {
                    wws_type_image {
                        fixed(width: 500) {
                            ...GatsbyPrismicImageFixed
                        }
                    }
                    wws_type_title {
                        text
                    }
                }
                wws_title {
                    text
                }
                tmn_title {
                    text
                }
                tmn_cards {
                    tmn_card_author_position
                    tnm_card_author_name
                    tmn_card_text {
                        html
                    }
                }
                whats_new_section_title {
                    text
                }
                whats_new_box {
                    whats_new_box_content {
                        text
                    }
                    whats_new_box_button {
                        text
                    }
                    whats_new_box_link {
                        url
                        type
                        target
                        link_type
                    }
                }
                adhd_section_title {
                    text
                }
                adhd_course_block {
                    title {
                        text
                    }
                    content {
                        html
                    }
                    button_text
                    button_link {
                        url
                        target
                        type
                    }
                }
            }
        }
    }
`
