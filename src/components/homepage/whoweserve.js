import React from "react"


const WhoWeServe = ({ data }) => {
    return (
        <div className="whoweserve section">
            <h2 className="newtitle">{data.wws_title.text}</h2>
            <div className="background" style={{backgroundImage: "url("+data.wws_background_image.url+")"}}>
                <div className="container">
                    {data.wws_client_type.map((item, i) => (
                        <div className="grid" key={`key-${i}`}>
                            <div className="title">
                                <h3>{item.wws_type_title.text}</h3>
                            </div>
                            <div className="text">
                                <p>{item.wws_type_description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default WhoWeServe
