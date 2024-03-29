import React from "react"

const WhoWeServe = ({ data }) => {
    return (
        <div className="whoweserve">
            <div className="container">
                <h2 className="typical">{data.wws_title.text}</h2>
                <div className="grid">
                    {data.wws_client_type.map((item, i) => (
                        <div className="circle" key={`key-${i}`}>
                            <div
                                className="image"
                                style={{
                                    backgroundImage: `url(${item.wws_type_image.fixed.src})`,
                                }}
                            ></div>
                            <div className="text">
                                <h3>{item.wws_type_title.text}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bgel3" />
            <div className="bgel4" />
        </div>
    )
}
export default WhoWeServe
