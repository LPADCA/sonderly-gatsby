import React from "react"
import { Link } from "gatsby"
import { CgArrowRight } from "react-icons/cg"

const Hero = ({ slides }) => {
    //console.log(slides)
    return (
        <>
            <div className="homepage-hero">
                <div className="illustration">
                    <img
                        src={slides[0].image.fluid.src}
                        srcSet={slides[0].image.fluid.srcSet}
                        alt={slides[0].image.alt}
                    />
                </div>
                <div className="container">
                    <div className="content">
                        <div className="wrapper">
                            <h1>{slides[0].title.text}</h1>
                            <p>{slides[0].description}</p>
                            <div className="button-wrapper">
                                <a href={slides[0].link.url} target={slides[0].link.target} className="button">
                                    {slides[0].button_text}
                                </a>
                                <div className="learn-more">
                                    <Link to="/">
                                        <CgArrowRight size="20" />
                                        &nbsp;Learn more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bg-el1" />
                <div id="bg-el3" />
                <div id="bg-el4" />
            </div>
        </>
    )
}

export default Hero
