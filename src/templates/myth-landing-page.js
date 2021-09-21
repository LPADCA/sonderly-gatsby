import React, { useState, useRef, useEffect } from "react"
import Layout from "@components/common/layout.js"
import { graphql } from "gatsby"
import useCurrentWidth from "../utils/getWindowWidth"
import { FiArrowLeft } from "react-icons/fi"
import Flippy, { FrontSide, BackSide } from "react-flippy"

import "@styles/pages/myth-landing-page.scss"
const Spacer = ({ size }) => <div style={{ marginBottom: `${size}px` }}></div>

const MobileMythCard = ({ ...card }) => {
    const [textHeight, setTextHeight] = useState(null)
    const [flipped, setFlipped] = useState(false)
    const ref = useRef()
    const flippedCard = useRef(null)
    const { myth_avatar, myth_title, myth_description, fact_title, fact_description, back_card_fact_copy } = card

    let className = "mobile-card"

    useEffect(() => {
        setTextHeight(flippedCard.current.offsetHeight + 100)
    }, [flipped])

    return (
        <Flippy
            style={{
                height: flipped ? textHeight + "px" : "100%",
            }}
            className={className}
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="horizontal"
            ref={ref}
            onClick={() => setFlipped(!flipped)}
        >
            <FrontSide>
                <div className="mobile-card-avatar-wrapper">
                    <img className="mobile-card-vertical-dots" src="/images/dots.svg" />
                    <img src={myth_avatar.url} className="card-avatar" />
                </div>
                <p className="myth-title">{myth_title.text}</p>
                <p className="myth-descriprition">{myth_description.text}</p>
                <Spacer size="4" />
                <p className="card-context-title">{fact_title.text}</p>
                <p className="card-context-subtitle">{fact_description.text}</p>
                <a
                    className="button"
                    role="button"
                    onClick={() => {
                        ref.current.toggle()
                        setFlipped(!flipped)
                    }}
                >
                    Read More
                </a>
            </FrontSide>
            <BackSide>
                <p className="card-context-title">{fact_title.text}</p>
                <p ref={flippedCard} className="card-context-subtitle">
                    {back_card_fact_copy.text}
                </p>
                <button
                    className="button-back"
                    onClick={() => {
                        ref.current.toggle()
                        setFlipped(!flipped)
                    }}
                >
                    <FiArrowLeft className="arrow-back" />
                </button>
            </BackSide>
        </Flippy>
    )
}

const MythCard = ({ alignment, ...card }) => {
    const [flipped, setFlipped] = useState(false)
    const [clicked, setClicked] = useState(false)
    const {
        myth_avatar,
        myth_title,
        myth_description,
        fact_title,
        fact_description,
        reversed,
        back_card_fact_copy,
    } = card

    let className = "card"
    if (alignment === "column") {
        className += "-vertical"
    } else if (alignment.includes("row")) {
        className += "-horizontal"
    }
    if (flipped) className = "animated " + className
    else if (clicked) className = "front " + className

    return flipped ? (
        <article className={reversed ? className + "-reversed" : className}>
            <div className="flipped">
                <p className="card-context-title">{fact_title.text}</p>
                <p className="back-card-description">{back_card_fact_copy.text}</p>
                <button
                    className="button-back"
                    onClick={() => {
                        setFlipped(false)
                        setClicked(true)
                    }}
                >
                    <FiArrowLeft className="arrow-back" />
                </button>
            </div>
        </article>
    ) : (
        <article className={reversed ? className + "-reversed" : className}>
            <div className={className + "-header-section"}>
                <div className={className + "-avatar-wrapper"}>
                    <img className={className + "-dots"} src="/images/dots.svg" />
                    <img src={myth_avatar.url} className="card-avatar" />
                </div>
                <div className={className + "-header-info"}>
                    <p className="myth-title" style={{ fontSize: "1.25rem" }}>
                        {myth_title.text}
                    </p>
                    <p className="myth-descriprition " style={{ fontSize: "1rem" }}>
                        {myth_description.text}
                    </p>
                </div>
            </div>
            <div className={className + "-main-section"}>
                <div
                    style={{
                        width: card && fact_description.text.startsWith("An effective ABA program") ? "100%" : "",
                    }}
                    className="card-context"
                >
                    <p className="card-context-title">{fact_title.text}</p>
                    <p className="card-context-subtitle">{fact_description.text}</p>
                </div>
                {alignment === "column" ? null : (
                    <div className="card-footer">
                        <a className="button" role="button" onClick={() => setFlipped(true)}>
                            Read More
                        </a>
                    </div>
                )}
            </div>
            {alignment === "column" ? (
                <div className="card-footer">
                    <a className="button" role="button" onClick={() => setFlipped(true)}>
                        Read More
                    </a>
                </div>
            ) : null}
        </article>
    )
}

const MythLandingPage = ({ location, data }) => {
    const width = useCurrentWidth()
    const { landing_page_title, myth_card } = data.prismicMythLandingPage.data
    const cardsToRender = []
    const cardsArray = Array.from({ length: myth_card.length }, (v, index) => {
        return myth_card[index]
    })
    const seoProps = {
        seo_description: data.prismicMythLandingPage.data.seo_description.text,
        seo_title: data.prismicMythLandingPage.data.seo_title.text,
        seo_keywords: data.prismicMythLandingPage.data.seo_keywords.text,
    }

    let rowCounter = 0
    for (let index = 0; index < cardsArray.length; index++) {
        const card = cardsArray[index]
        card.id = Math.floor(Math.random() * 1000)
        if (Array.isArray(cardsToRender[rowCounter])) cardsToRender[rowCounter] = [...cardsToRender[rowCounter]]
        else cardsToRender[rowCounter] = []
        cardsToRender[rowCounter].push(card)
        if (index > 0 && (index + 1) % 3 === 0) {
            rowCounter += 1
        }
    }
    if (!width) return null

    return (
        <Layout className="myth-landing-page" location={location} {...Layout.pickSeoProps(seoProps)}>
            <section className="myth-landing-header-wrapper">
                <h1 className="landing-header-title">{landing_page_title.text}</h1>
            </section>
            {width && width > 1200 ? (
                <section className="card-container">
                    {cardsToRender.map((row, rowIndex) => (
                        <div
                            style={{ flexDirection: rowIndex % 2 === 0 ? "row" : "row-reverse" }}
                            className="card-row"
                            key={rowIndex}
                        >
                            {row.map((card, cardIndex) => {
                                const alignment = cardIndex === 0 ? "column" : "row-reverse"
                                const size = cardIndex === 0 ? 434 : 654
                                if (cardIndex === 0) {
                                    return <MythCard size={size} key={row[0].id} alignment={alignment} {...card} />
                                } else if (cardIndex === 1) {
                                    return (
                                        <div key={row[cardIndex].id} className="double-card-row">
                                            <MythCard size={size} alignment={alignment} {...card} />
                                            <MythCard
                                                reversed={true}
                                                size={size}
                                                alignment={alignment}
                                                {...row[cardIndex + 1]}
                                            />
                                        </div>
                                    )
                                } else return null
                            })}
                        </div>
                    ))}
                </section>
            ) : (
                <section className="card-container">
                    {myth_card.map((card) => (
                        <MobileMythCard key={card.id} {...card} />
                    ))}
                </section>
            )}
        </Layout>
    )
}

export default MythLandingPage

export const query = graphql`
    query MythLandingPageQuery {
        prismicMythLandingPage {
            data {
                landing_page_title {
                    text
                }
                myth_card {
                    myth_title {
                        text
                    }
                    myth_description {
                        text
                    }
                    myth_avatar {
                        url
                    }
                    fact_title {
                        text
                    }
                    fact_description {
                        text
                    }
                    back_card_fact_copy {
                        text
                    }
                }
                seo_title {
                    text
                }
                seo_keywords {
                    text
                }
                seo_description {
                    text
                }
            }
        }
    }
`
