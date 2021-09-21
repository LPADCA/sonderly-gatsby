import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes} lang={process.env.GATSBY_LOCALE}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="p:domain_verify" content="dbfada72c0fade268cfd3f725f79afdb" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
                        !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(
                            Array.prototype.slice.call(arguments))};var
                            n=window.pintrk;n.queue=[],n.version="3.0";var
                            t=document.createElement("script");t.async=!0,t.src=e;var
                            r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
                          pintrk('load', '2612968015949');
                          pintrk('page');`,
                    }}
                />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        alt=""
                        src="https://ct.pinterest.com/v3/?tid=2612968015949&event=init&noscript=1"
                    />
                </noscript>
                {props.headComponents}
            </head>
            <body {...props.bodyAttributes}>
                {props.preBodyComponents}
                <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
                {props.postBodyComponents}
            </body>
        </html>
    )
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
}
