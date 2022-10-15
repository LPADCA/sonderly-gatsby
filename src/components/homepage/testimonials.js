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
                <div key={`key-${i}`} className="card-wrapper">
                    <div className="card">
                        <div className="content"
                            dangerouslySetInnerHTML={{
                                __html: card.tmn_card_text.html,
                            }}
                        />
                        <div className="author">
                            <p className="name">{card.tnm_card_author_name}</p>
                            <p className="position">{card.tmn_card_author_position}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
}

const Testimonials = ({ data }) => {
    return (
        <div className="testimonials" style={{backgroundImage: "url('images/testimonials_bg.jpg')"}}>
            <div className="container">
                <h2 className="newtitle inverted">{data.tmn_title.text}</h2>
                <TestimonialsSlider data={data} />
            </div>
        </div>
    )
}
export default Testimonials
