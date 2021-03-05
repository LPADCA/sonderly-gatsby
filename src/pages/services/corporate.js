import React from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout.js"
import Scroll from 'react-scroll'

import "@styles/corporate.scss"

var Element  = Scroll.Element;
var scroller = Scroll.scroller;
var tabs = [0,1,2];

class ServicesCorporate extends React.Component {
    constructor(props) {
        
        super(props);
        this.data = props.data;
        this.changeSlide = this.changeSlide.bind(this);
        this.state = {
            activeSlide: 0
        }
    }

    changeSlide(id) {
        console.log(id)
        this.setState(
            {
                activeSlide: id
            })
        console.log(this.state.activeSlide)
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
                <div className="corporate-services-hero">
                    <div className="container">
                        <h1>Corporate Services</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo</p>
                    </div>
                </div>
                {/* Two tabs */}
                <div className="container">
                    <div className="corporate-services-hero-tabs">
                        <div className="tab1">
                            <div className="tab-header">
                                <div><img src="/deleteme/placeholder.png" width="60" height="60" alt="placeholder"/></div>
                                <div><h3>Corporate Group Purchase</h3></div>
                            </div>
                            <p><strong>Where:</strong> Corporate group purchase for online courses </p>
                            <p><strong>Minimum registrations:</strong> 10 participants per course</p>
                            <a className="button" href="/">Sign Up Now</a>
                        </div>
                        <div className="tab2">
                            <div className="tab-header">
                                <div><img src="/deleteme/placeholder.png" width="60" height="60" alt="placeholder"/></div>
                                <div><h3>Corporate Group Purchase</h3></div>
                            </div>
                            <p>You can book a training event at your location to benefit from a workshop style with active participation. Please see below for available trainings​​.</p>
                            <p><strong>Where:</strong> Corporate group purchase for online courses </p>
                            <p><strong>Minimum registrations:</strong> 10 participants per course</p>
                            <a className="button" href="/">Sign Up Now</a>
                        </div>
                    </div>
                </div>
                {/* Training types */}
                <div className="trainings container">
                    <h2 className="centered underline">Available Custom Training</h2>
                    <ul>
                        {tabs.map((item, i) => (
                            <li key={item} className={item === this.state.activeSlide ? 'active' : ''} onClick={() => this.changeSlide(item)}>Autism in the Community: Effective Support and Response Strategies</li>
                        ))}
                        </ul>
                    <div className="preview-wrapper">
                        <Element name="preview-wrapper"/>
                        {tabs.map((item, i) => (
                        <div key={`${item}`} className={`preview ${item === this.state.activeSlide ? 'selected' : ''}`}>
                            <div className="image">
                                <img src="/deleteme/img1.png" width="100%" alt="Img alt"/>
                            </div>
                            <div className="content">
                                <h3>{item} Autism in the Community: Effective Support and Response Strategies</h3>
                                <p>Type: Webinar or In-Class Hours: 3 hours This is an introductory level course</p>
                                <p>Individuals with Autism Spectrum Disorder (ASD) may respond to situations in the community differently due to their unique communication, sensory and learning abilities. Sometimes these responses can lead to challenging behaviour. This training focuses on teaching support strategies to effectively respond and promote inclusion in the community.</p>
                                <p>Learning Objectives:</p>
                                <p>Learn the diagnostic characteristics and unique learning profiles of individuals with ASD Learn essential behaviour support strategies to effectively respond to various situations in the community Discuss proactive environmental changes and communication approaches which promote inclusion</p>
                                <p>This training supports staff in the following roles:</p>
                                <p>First responders such as Police officers, Security personnel, Paramedics, etc. Community and customer service such as Librarian, Customer Service Rep, Public Transportation staff Attractions, Hospitality and Tourism</p>
                                <p>Training examples and discussions/activities can be adapted to meet individual group needs.</p>
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
        prismicHomepage {
            data {
                hero_slide {
                    button_text
                    description
                }
            }
        }
    }
`
