import React, { useState } from "react"

import "@styles/pages/whatsnew.scss"

const Box = ({ whats_new_box_content, whats_new_box_button, whats_new_box_link }) => {
    const [hovered, setHovered] = useState(false)
    let buttonClasName = "button button-box"
    if (hovered) buttonClasName += " hovered"

    return (
        <article className="box" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <p className="box-title">{whats_new_box_content.text}</p>
            <a target="blank" href={whats_new_box_link.url} className={buttonClasName}>
                {whats_new_box_button.text}
            </a>
        </article>
    )
}

const WhatsNew = ({ sectionTitle, boxes }) => {
    const { text } = sectionTitle
    return (
        <section className="whats-new-wrapper">
            <div className="featured-title">
                <h2>{text}</h2>
            </div>
            <div className="box-wrapper">
                {boxes.map((box, index) => (
                    <Box key={index} {...box} />
                ))}
            </div>
            <img className="section-divider" src="/images/whatsnew-section-divider.svg" alt="section-divider" />
        </section>
    )
}

export default WhatsNew
