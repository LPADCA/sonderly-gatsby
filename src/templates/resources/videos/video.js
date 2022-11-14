import React from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout"
import "@styles/pages/video.scss"

const Video = ({ data, location }) => {
    const videoRecord = data.prismicVideo.data
    const extras = data.allPrismicVideo.edges
    return (
    <Layout location={location}>
        <div className="blog_post">
            <div className="navi container">
                <a href="/resources/blogs/">Blogs</a> &gt; Article
            </div>
            <div className="title container">
                <h1>{videoRecord.title.text}</h1>
                <p className="datetime">{videoRecord.datetime}</p>
            </div>
            <div className="container content_wrapper">
            </div>
        </div>
        <div className="more_blog_posts container">
            {extras.map((card, i) => (
                    <div key={`key-${i}`} className="card-wrapper">
                        <a href={card.node.url}>
                            <div className="card">
                                <img src={card.node.data.blog_image.url}/>
                                <h3>{card.node.data.title.text}</h3>
                                <p className="datetime">{card.node.data.datetime}</p>
                            </div>
                        </a>
                    </div>
                ))}           
        </div>
    </Layout>
    )
}

export default Video

export const query = graphql`
    query VideoQuery($uid: String) {
        prismicVideo(uid: { eq: $uid }) {
            data {
                datetime(formatString: "MMM DD, YYYY @ hh:mm a", locale: "en")
                seo_description
                seo_keywords
                seo_title
                title {
                    text
                }
            }
        }
        allPrismicVideo(sort: {fields: data___datetime, order: DESC}, limit: 4) {
            edges {
                node {
                    id
                    url
                    data {
                        datetime(formatString: "DD MMMM, YYYY @ hh:mm a", locale: "en")
                        title {
                            text
                        }
                    }
                }
            }
        }
    }
`
