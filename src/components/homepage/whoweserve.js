import React from "react"
import { Helmet } from "react-helmet";
//import { Link } from 

const WhoWeServe = ({data}) => {
    //console.log(data)
    return (
            <>
                <div className="whoweserve">
                    <div className="container">
                        <h2 className="typical">{data.wws_title.text}</h2>
                        <div className="grid">
                            {data.wws_client_type.map((item,i)=>(
                                <div key={`key-${i}`}>
                                    <div className="circle"
                                        style={{
                                            backgroundImage: `url(${item.wws_type_image.fixed.src})`
                                        }}>
                                        <div>
                                            <h3>{item.wws_type_title.text}</h3>
                                        </div>
                                    </div>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                    <div className="bgel3"/>
                    <div className="bgel4"/>
            </div>
            </>
        )
}
export default WhoWeServe
