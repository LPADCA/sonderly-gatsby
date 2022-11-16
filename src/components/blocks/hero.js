import React from "react"

import "@styles/blocks.scss"

const Hero = ({ title, subheading }) => {
    return (
        <>
            <div className="hero-default">
                <div className="container">
                    <h1>{title}</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: subheading.html,
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default Hero
