import React from "react"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
}

const TestimonialsSlider = ({ data }) => {
    return (
        <Slider {...settings}>
            {data.tmn_cards.map((card, i) => (
                <div key={`key-${i}`} className="card">
                    <div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: card.tmn_card_text.html,
                            }}
                        />
                        <div className="divider" />
                        <div className="author">
                            <div className="image">
                                <img
                                    src={card.tmn_card_author_icon.fixed.src}
                                    srcSet={card.tmn_card_author_icon.fixed.srcSet}
                                    alt={card.tmn_card_author_icon.alt}
                                />
                            </div>
                            <div className="text">
                                <p className="name">{card.tnm_card_author_name}</p>
                                <p className="position">{card.tmn_card_author_position}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

const Testimonials = ({ data }) => {
    return (
        <>
            <div className="testimonials">
                <div className="container">
                    <h2 className="typical">{data.tmn_title.text}</h2>
                    <TestimonialsSlider data={data} />
                </div>
                <div className="divider-dots" />
                <div className="bgel4" />
            </div>
        </>
    )
}
export default Testimonials
