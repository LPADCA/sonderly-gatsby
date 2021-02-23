import React from "react"
import { Helmet } from "react-helmet";
//import { Link } from 

const WhatWeDo = ({data}) => {
    console.log(data)
    return (
            <>
                <div className="whatwedo">
                    <div className="container">
                        <div className="grid">
                            <div className="illustration">
                                <img src={data.wwd_image.fluid.src} srcSet={data.wwd_image.fluid.srcSet} alt={data.wwd_image.alt}/>
                            </div>
                            <div className="content">
                                <div>
                                    <h2>{data.wwd_title.text}</h2>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: data.wwd_text.html
                                            }}
                                    />
                                    {data.wwd_pros.length > 0 && <ul>
                                        {data.wwd_pros.map((item,i)=>(
                                            <li key={`key-${i}`}>
                                                {item.value}
                                            </li>
                                        )
                                        )}
                                    </ul>}
                                    <a className="button" href={data.wwd_primary_button_link.url} target={data.wwd_primary_button_link.target}>
                                        {data.wwd_primary_button_text}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}
export default WhatWeDo
