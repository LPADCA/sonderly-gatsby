import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "@components/common/layout"
import "@styles/pages/blog_post.scss"


const BlogPost = ({ data, location }) => {
    const blogPost = data.prismicBlogPost.data
    const extras = data.allPrismicBlogPost.edges
    return (
    <Layout location={location}>
        <div className="blog_post">
            <div className="navi container">
                <Link to="/resources/blogs/">{data.prismicBlogs.data.regular_label.text}</Link> &gt; {data.prismicBlogs.data.single_article_label}
            </div>
            <div className="title container">
                <h1>{blogPost.title.text}</h1>
                <p className="datetime">{blogPost.post_datetime}</p>
            </div>
            <div className="container content_wrapper">
                <img src={blogPost.blog_image.url} alt={blogPost.blog_image.alt}/>
                <div className="content" dangerouslySetInnerHTML={{
                        __html: blogPost.content.html }}/>
            </div>
        </div>
        <div className="more_blog_posts container">
            <div className="card-wrapper">
            {extras.map((card, i) => (
                <Link key={`key-${i}`} to={card.node.url}>
                    <div className="card">
                        <img src={card.node.data.blog_image.url} alt={card.node.data.blog_image.alt}/>
                        <h3>{card.node.data.title.text}</h3>
                        <p className="datetime">{card.node.data.post_datetime}</p>
                    </div>
                </Link>
            ))}           
            </div>
        </div>
    </Layout>
    )
}

export default BlogPost

export const query = graphql`
    query BlogPostQuery($uid: String) {
        prismicBlogPost(uid: { eq: $uid }) {
            data {
                blog_image {
                    url(imgixParams: {maxWidth: 1400})
                    alt
                }
                content {
                    html
                }
                post_datetime(formatString: "MMM DD, YYYY @ hh:mm a", locale: "en")
                seo_description
                seo_keywords
                seo_title
                title {
                    text
                }
            }
        }
        allPrismicBlogPost(sort: {fields: data___post_datetime, order: DESC}, limit: 4) {
            edges {
                node {
                    id
                    url
                    data {
                        post_datetime(formatString: "MMM DD, YYYY @ hh:mm a", locale: "en")
                        title {
                            text
                        }
                        blog_image {
                            url(imgixParams: {maxWidth: 1400})
                            alt
                        }
                    }
                }
            }
        }
        prismicBlogs {
            data {
                regular_label {
                    text
                }
                single_article_label
            }
        }
    }
`
