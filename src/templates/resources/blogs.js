import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@components/common/layout"
import Slider from "react-slick"

import "@styles/pages/resources/blogs.scss"

const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

const BlogsSlider = ({ data }) => {
    return (
        <Slider {...settings}>
            {data.map((card, i) => (
                <div key={`key-${i}`} className="card-wrapper">
                    <Link to={card.element.document.url}>
                        <div className="card">
                            <img src={card.element.document.data.blog_image.url} alt={card.element.document.data.blog_image.alt}/>
                            <h3>{card.element.document.data.title.text}</h3>
                            {/*<p className="datetime">{card.element.document.data.post_datetime}</p>*/}
                        </div>
                    </Link>
                </div>
            ))}
        </Slider>
    )
}

const Promoted = ({data}) => {
    return (
        <>
            {data.map((card, i) => (
                <div key={`key-${i}`} className="card-wrapper">
                    <Link to={card.element.document.url}>
                        <div className="card">
                            <img src={card.element.document.data.blog_image.url} alt={card.element.document.data.blog_image.alt}/>
                            <div className="content">
                                <h3>{card.element.document.data.title.text}</h3>
                                {/*<p>{card.element.document.data.post_datetime}</p>*/}
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </>
    )
}

const Regular = ({data}) => {
    return (
        <div className="regular">
            <div className="card-wrapper">
            {data.map((card, i) => (
                <Link key={`key-${i}`} to={card.node.url}>
                    <div className="card">
                        <img src={card.node.data.blog_image.url} alt={card.node.data.blog_image.alt}/>
                        <h3>{card.node.data.title.text}</h3>
                        {/*<p className="datetime">{card.node.data.post_datetime}</p>*/}
                    </div>
                </Link>
            ))}
            </div>
        </div>
    )
}


const Blogs = ({ data, location }) => {
    const scroller_items = data.prismicBlogs.data.scroller
    const promoted_items = data.prismicBlogs.data.promoted
    const regular_items  = data.allPrismicBlogPost.edges
    return (
    <Layout location={location}>
        <div className="spacer-top"/>
        <div className="blogs_page">
            <h1 className="centered withdot">{data.prismicBlogs.data.page_title.text}</h1>
            <div className="container">
                <p className="category_label">{data.prismicBlogs.data.featured_label.text}</p>
                <div className="promogrid">
                    <div className="left">
                        <div className="slider_wrapper">
                            <BlogsSlider data={scroller_items} />
                        </div>
                    </div>
                    <div className="right">
                        <Promoted data={promoted_items} />
                    </div>
                </div>
                <p className="category_label">{data.prismicBlogs.data.regular_label.text}</p>
                <Regular data={regular_items}/>
            </div>
        </div>
    </Layout>
    )
}



export default Blogs

export const courseMapQuery = graphql`
query Blogs {
    allPrismicBlogPost(sort: {fields: data___post_datetime, order: DESC}, limit: 10) {
        edges {
            node {
                id
                url
                data {
                    post_datetime(formatString: "MMM DD, YYYY @ hh:mm a", locale: "en")
                    seo_description
                    seo_keywords
                    seo_title
                    title {
                        text
                    }
                    blog_image {
                        url(imgixParams: {maxWidth: 1400})
                        alt
                    }
                    content {
                        html
                    }
                }
            }
        }
    }
    prismicBlogs {
        data {
            page_title {
                text
            }
            featured_label {
                text
            }
            regular_label {
                text
            }
            seo_description
            seo_keywords
            seo_title
            scroller {
                element {
                    document {
                        ... on PrismicBlogPost {
                            id
                            url
                            data {
                                blog_image {
                                    url(imgixParams: {width: 800})
                                    alt
                                }
                                title {
                                    text
                                }
                                post_datetime(formatString: "MMM DD, YYYY @ hh:mm a", locale: "en")
                            }
                        }
                    }
                }
            }
            promoted {
                element {
                    document {
                        ... on PrismicBlogPost {
                            id
                            url
                            data {
                                post_datetime(formatString: "MMM DD, YYYY @ hh:mm a", locale: "en")
                                blog_image {
                                    url(imgixParams: {width: 300})
                                    alt
                                }
                                title {
                                    text
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`
