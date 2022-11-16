import React from "react"
import { BiBookOpen } from "react-icons/bi"

const CoursesPreview = ({ data }) => {
    return (
        <div className="courses-preview section">
            <div className="container">
                <h2 className="newtitle">{data.cp_title.text}</h2>
                <div className="cards">
                    {data.cp_card.map((card, i) => (
                        <div key={`key-${i}`} className="wrapper">
                            <div className="card">
                                <img src={card.cp_card_image.fixed.src} srcSet={card.cp_card_image.fixed.srcSet}/>
                                <div className="content">
                                    <h3>{card.cp_card_title.text}</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: card.cp_card_description.html,
                                        }}
                                    />
                                    {card.cp_card_button_link && card.cp_card_button_link.url && (
                                        <a href={card.cp_card_button_link.url} target={card.cp_card_button_link.target}>
                                            {card.cp_card_button_text}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default CoursesPreview
