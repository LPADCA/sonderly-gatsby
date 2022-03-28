// import { Link } from "gatsby"
// import { CgArrowRight } from "react-icons/cg"
import { getImageProps } from "@utils/getImageProps"
import React, { useState } from 'react'
import useCollapse from 'react-collapsed'
import '@styles/inject.scss'
import Flower from '@static/videos/sonderly.mp4'


const Hero = ({ slides }) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    return (
        <>
            <div className="homepage-hero">
                <div className="illustration">
                    <div className="video-wrapper">
                        <video controls loop autoPlay muted>
                            <source src={Flower} type="video/mp4"/>
                        </video>
                    </div>
                </div>
                <div className="container">
                    <div className="content">
                        <div className="wrapper">
                            <h1 >This April, let’s learn to exhale.</h1>
                            <p>Individuals on the Spectrum cope with acute stress daily to avoid being overwhelmed by their surroundings. When everything operates at the same volume, and stress is peaking, you need advanced wellness and coping skills to make sense of everything. </p>
                            <button style={{cursor: 'pointer'}} {...getToggleProps()}>
                                {isExpanded ? 'Sound familiar? >' : 'Sound familiar? >'}
                            </button>
                            <section {...getCollapseProps()}>
                                <p>
                                    Globally, stress levels are on the rise so perhaps this year for Autism Awareness Month, we look within the community to draw inspiration on how to manage sensory overload, ground ourselves and create inner peace across our neurodiverse community. 
                                </p>
                                <p>
                                    This April, let’s learn from the Autism community. Let’s learn to exhale.
                                </p>
                            </section>

                        </div>
                    </div>
                </div>
                <div id="bg-el3" />
                <div id="bg-el4" />
            </div>
        </>
    )
}

export default Hero
