import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import Scroll from 'react-scroll'

import "@styles/corporate.scss"

var Element  = Scroll.Element;
var scroller = Scroll.scroller;
var tabs = [0,1,2];

class ServicesCorporate extends React.Component {
    constructor(props) {
        super(props);
        this.changeSlide = this.changeSlide.bind(this);
        this.data = props.data.prismicServicesCorporate.data;
        this.state = {
            activeSlide: 0
        }
    }


    changeSlide(id) {
        //console.log(id)
        this.setState(
            {
                activeSlide: id
            })
        //console.log(this.state.activeSlide)
        scroller.scrollTo('preview-wrapper', {
            duration: 500,
            delay: 50,
            smooth: true,
            offset: -80, // Scrolls to element + 50 pixels down the page
          });
    }

    render() {    
        return (
            <Layout>
                {/* Hero */}
                <div className="spacer-top"/>
                <div className="corporate-services-hero-wrapper">
                    <div className="corporate-services-hero">
                        <div className="container">
                            <h1>{this.data.title.text}</h1>
                            <div dangerouslySetInnerHTML={{ __html: this.data.subheading.html }}/>
                        </div>
                    </div>
                    {/* Two tabs */}
                    <div className="container">
                        <div className="corporate-services-hero-tabs">
                            {this.data.hero_boxes.map((box, i) => (
                                <div key={i} className={`tab${i}`}>
                                    <div className="tab-header">
                                        <div><img src={box.hero_boxes_icon.fixed.src} srcSet={box.hero_boxes_icon.fixed.srcSet} width="60" height="60" alt={box.hero_boxes_icon.alt}/></div>
                                        <div><h3>{box.hero_boxes_title.text}</h3></div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: box.hero_boxes_description.html }}/>
                                    {box.hero_boxes_button_link.type === 'Document' ?
                                    <Link className="button" to={box.hero_boxes_button_link.url} target={box.hero_boxes_button_link.target}>
                                        {box.hero_boxes_button_text}
                                    </Link>:
                                    <a className="button" href={box.hero_boxes_button_link.url} target={box.hero_boxes_button_link.target}>
                                        {box.hero_boxes_button_text}
                                    </a>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Training types */}
                <div className="trainings container">
                    <h2 className="centered underline">Available Custom Training</h2>
                    <ul>
                        {this.data.trainings_list.map((item, i) => (
                            <li key={i} className={i === this.state.activeSlide ? 'active' : ''} onClick={() => this.changeSlide(i)}>{item.trainings_list_title.text}</li>
                        ))}
                        </ul>
                    <div className="preview-wrapper">
                        <Element name="preview-wrapper"/>
                        {this.data.trainings_list.map((item, i) => (
                        <div key={`page-${i}`} className={`preview ${i === this.state.activeSlide ? 'selected' : ''}`}>
                            <div className="image">
                                <img src={item.traninings_list_image.fixed.src} srcSet={item.traninings_list_image.fixed.srcSet} width="60" height="60" alt={item.traninings_list_image.alt}/>
                            </div>
                            <div className="content">
                                <h3>{item.trainings_list_title.text}</h3>
                                <div dangerouslySetInnerHTML={{ __html: item.tranings_list_richtext.html }}/>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </Layout>
        )
    }
}

export default ServicesCorporate

export const servicesCorporateQuery = graphql` 
    query ServicesCorporate {
        prismicServicesCorporate {
          data {
            keywords
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
