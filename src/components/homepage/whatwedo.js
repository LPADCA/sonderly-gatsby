import React from "react"
//import { Link } from

const WhatWeDo = ({ data }) => {
    return (
        <div className="whatwedo section">
            <div className="container">
                <div className="grid">
                    <div id="wwd-left">
                        <h2>{data.wwd_title.text}</h2>
                    </div>
                    <div id="wwd-right">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data.wwd_text.html,
                            }}
                        />
                        {data.wwd_pros.length > 0 && (
                            <ul>
                                {data.wwd_pros.map((item, i) => (
                                    <li key={`key-${i}`}>{item.value}</li>
                                ))}
                            </ul>
                        )}
                        {data.wwd_primary_button_text && (
                            <a
                                className="button black"
                                href={data.wwd_primary_button_link.url}
                                target={data.wwd_primary_button_link.target}
                            >
                                {data.wwd_primary_button_text}
                            </a>
                        )}
                        &nbsp;&nbsp;&nbsp;
                        {data.wwd_secondary_button_text && (
                            <a
                                className="button black inverted"
                                href={data.wwd_secondary_button_link.url}
                                target={data.wwd_secondary_button_link.target}
                            >
                                {data.wwd_secondary_button_text}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WhatWeDo
