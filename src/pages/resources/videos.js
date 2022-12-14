import React from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout"
import "@styles/pages/resources/videos.scss"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ReactPlayer from 'react-player'
import { GrClose, GrPlayFill } from 'react-icons/gr'
import { FaLastfmSquare, FaSmileBeam } from "react-icons/fa";

//

class Modal extends React.Component {
    render() {
        return this.props.is_visible === true ? (
            <div className="modal-wrapper">
                <div className="fade" onClick={this.props.hide_fn}/>
                <div className="modal">
                    <ReactPlayer url={this.props.url} playing={this.props.is_playing}/>
                    <div className="close" onClick={this.props.hide_fn}>
                        <GrClose/>
                </div>
                </div>

            </div>
        ) : null
    }
}

const Promoted = ({data, show_fn}) => {
    return (
        <>
            {data.map((card, i) => (
                <div key={`key-${i}`} className="card-wrapper">
                    <a href="" onClick={(e) => show_fn(card.video.document.data.video_url.embed_url, e)}>
                        <div className="card">
                            <div className="img_wrapper">
                                <img src={card.video.document.data.video_url.thumbnail_url} />
                                <div className="play_button"/>
                            </div>
                            <div className="content">
                                <h3>{card.video.document.data.title.text}</h3>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </>
    )
}


const SelectedListShow = ({data, show_fn}) => {
    return (
        <div className="regular">
            {data.map((card, i) => (
                <div key={`key-${i}`} className="card-wrapper">
                    <a href="" onClick={(e) => show_fn(card.node.data.video_url.embed_url, e)}>
                        <div className="card">
                            <div className="img_wrapper">
                                <img src={card.node.data.video_url.thumbnail_url}/>
                                <div className="play_button"/>
                            </div>
                            <h3>{card.node.data.title.text}</h3>
                            {//<p className="datetime">{card.node.data.datetime}</p>
                            }
                        </div>
                    </a>
                </div>
            ))}
        </div>
    )
}

class Regular extends React.Component {
    label = this.props.label
    data = this.props.data
    options = this.props.categories
    defaultOption = this.options[0];
    state = {
        selected_data: this.data,
    };
    _onSelect(value) {
        var selected_data = []
        {this.data.forEach((card) => {
            if (card.node.data.category === value.value) {
                selected_data.push(card)
            } 
        })}
        this.setState({selected_data: selected_data})
    }
    render () {
        return (
            <>
                <div className="regular-filter">
                    <Dropdown options={this.options} onChange={(value) => this._onSelect(value)} placeholder="Category" />
                </div>
                <p className="category_label">{this.label}</p>
                <SelectedListShow data = {this.state.selected_data} show_fn={this.props.show_fn}/>
            </>
        )
    }
}


class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.data = props.data
        this.location = props.location
        this.primary_item = this.data.prismicVideos.data.primary.document.data
        this.promoted_items = this.data.prismicVideos.data.promoted
        this.regular_items  = this.data.allPrismicVideo.edges
        this.categories = []
        {this.regular_items.forEach((item, i) => (
            this.categories.push(item.node.data.category)
        ))}
        this.state = {
            modal_visible: false,
            modal_playing: false,
            modal_url: 'https://www.youtube.com/watch?v=p2Q04J9wEUA'
        }
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }
    hide() {
        this.setState({ 
            modal_playing: false, 
            modal_visible: false 
        }) 
    }          

    show(new_url, e) {
        this.setState({
            url: new_url,
            modal_visible: true
        })
        e.preventDefault()
    }
    render() {
        return (
        <Layout location={this.location}>
            <section className="videos_page">
                <h1 className="centered">{this.data.prismicVideos.data.title.text}</h1>
                <Modal url={this.state.modal_url} is_visible={this.state.modal_visible} is_playing={this.state.modal_playing} hide_fn={this.hide}/>
                <div className="container">
                    <p className="category_label">{this.data.prismicVideos.data.featured_label.text}</p>
                    <div className="promogrid">
                        <div className="left">
                            <div className="slider_wrapper">
                                <div className="l2">
                                    <h2>{this.primary_item.title.text}</h2>
                                </div>
                                <a href="" onClick={(e) => this.show(this.primary_item.video_url.embed_url, e)}>
                                    <div className="img_wrapper">
                                        <img src={this.primary_item.video_url.thumbnail_url} />
                                        <div className="play_button"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="right">
                            <Promoted data={this.promoted_items} show_fn={this.show} />
                        </div>
                    </div>
                    <Regular label={this.data.prismicVideos.data.regular_label.text} data={this.regular_items} categories={[...new Set(this.categories)]} show_fn={this.show}/>
                </div>
            </section>
        </Layout>
        )
    }
}



export default Videos

export const courseMapQuery = graphql`
query Videos {
    allPrismicVideo(sort: {fields: data___datetime, order: DESC}) {
        edges {
            node {
                id
                url
                data {
                    category
                    datetime(formatString: "MMM DD, YYYY @ hh:mm a", locale: "en")
                    seo_description
                    seo_keywords
                    seo_title
                    title {
                        text
                    }
                    video_url {
                        embed_url
                        thumbnail_url
                      }
                }
            }
        }
    },
    prismicVideos {
        data {
            promoted {
                video {
                    document {
                        ... on PrismicVideo {
                            id
                            data {
                                datetime(formatString: "MMM DD, YYYY @ hh:mm a", locale: "en")
                                video_url {
                                    embed_url
                                    thumbnail_url
                                }
                                title {
                                    text
                                }
                            }
                        }
                    }
                }
            }
            seo_description
            seo_keywords
            seo_title
            title {
                html
                text
            }
            featured_label {
                text
            }
            regular_label {
                text
            }
            primary {
                document {
                    ... on PrismicVideo {
                        id
                        url
                        data {
                            title {
                                text
                            }
                            video_url {
                                embed_url
                                thumbnail_url
                            }
                        }
                    }
                }
            }
        }
    }
}
`
