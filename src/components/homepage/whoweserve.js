import React from "react"
import AnimatedBackground from "../common/animated_background"

const WhoWeServe = ({ data }) => {
    return (
        <>
            <section className="whoweserve">
                <h2 className="centered">{data.wws_title.text}</h2>
                <div className="background">
                    <AnimatedBackground/>
                    <div className="container">
                        {data.wws_client_type.map((item, i) => (
                            <div className="grid" key={`key-${i}`}>
                                <div>
                                    <h3>{item.wws_type_title.text}</h3>
                                </div>
                                <div className="text">
                                    <p>{item.wws_type_description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
export default WhoWeServe
