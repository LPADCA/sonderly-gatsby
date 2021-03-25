import React from "react"
import { BiBookOpen } from "react-icons/bi"

const CoursesPreview = ({ data }) => {
    //console.log(data)
    return (
        <div className="coursesPreview">
            <div className="container">
                <div className="localHeader">
                    <h2 className="typical">{data.cp_title.text}</h2>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data.cp_description.html,
                        }}
                    />
                </div>
                <div className="cards">
                    {data.cp_card.map((card, i) => (
                        <div key={`key-${i}`} className="card">
                            <BiBookOpen size="50" className="icon" />
                            <h3>{card.cp_card_title.text}</h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: card.cp_card_description.html,
                                }}
                            />
                            {card.cp_card_button_link && (
                                <a href={card.cp_card_button_link.url} target={card.cp_card_button_link.target}>
                                    {card.cp_card_button_text}
                                </a>
                            )}
                            <div className="animation-spacer" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="bgel1" />
            <div className="divider-dots" />
        </div>
    )
}
export default CoursesPreview
