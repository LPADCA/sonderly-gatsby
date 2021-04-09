import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "@components/common/layout"
import Hero from "@components/blocks/hero"
import { FaFilter } from "react-icons/fa"
import { RiInformationLine, RiStarFill } from "react-icons/ri"
import { FaVideo } from "react-icons/fa"
import Slider, { SliderTooltip } from "rc-slider"
import "rc-slider/assets/index.css"
import Scroll from "react-scroll"

import "@styles/pages/services/courses.scss"

var Element = Scroll.Element

const { Handle } = Slider

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props
    return (
        <SliderTooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
            <Handle value={value} {...restProps} />
        </SliderTooltip>
    )
}

const CourseMap = ({ data, location }) => {
    const coursesList = data.allPrismicCourses.nodes
    const pageContent = data.prismicCourseMap.data
    const {
        age_label,
        age_tooltip,
        availiable_in_french_label,
        filters_label,
        levels_label,
        moe_funded_label,
        video_recordings,
        yes,
        level,
        not_found,
    } = pageContent
    const levels = pageContent.levels.map((l) => l.filter_level)
    const ages = pageContent.ages.map((l) => l.filter_age)

    const [state, setState] = useState({
        age: 0,
        french: false,
        funded: false,
        level: 0,
        filtered: 0,
    })

    const courses = coursesList
        .filter(({ data: course }) => {
            if (state.french && !course.french) return false
            if (state.funded && !course.moe_funded) return false
            if (state.level > levels.indexOf(course.level)) return false
            if (course.age.localeCompare(ages[state.age], undefined, { sensetivity: "base" }) !== 0) return false
            return true
        })
        .map((c) => c.data)
        .sort((a, b) => levels.indexOf(a.level) - levels.indexOf(b.level))

    const updateLevel = (level) => setState({ ...state, level: level - 1 })
    const updateAge = (newAge) => setState({ ...state, age: newAge })
    const updateFrench = () => setState({ ...state, french: !state.french })
    const updateFunded = () => setState({ ...state, funded: !state.funded })

    return (
        <Layout location={location} {...Layout.pickSeoProps(pageContent)}>
            <div className="spacer-top" />
            <Hero title={pageContent.title.text} subheading={pageContent.subheading} />

            <div className="container">
                <div className="courses">
                    <div className="filters">
                        <form>
                            <h4>
                                <FaFilter /> {filters_label}
                            </h4>
                            <h5 className="filter-label age">
                                {age_label} <RiInformationLine />
                                <div className="tooltip" dangerouslySetInnerHTML={{ __html: age_tooltip.html }} />
                            </h5>
                            {ages.map((age, index) => {
                                return (
                                    <p key={age}>
                                        <input
                                            type="radio"
                                            id={`age-${index}`}
                                            name="age"
                                            onChange={() => updateAge(index)}
                                            defaultChecked={index === 0}
                                        />
                                        <label htmlFor={`age-${index}`}>{age}</label>
                                    </p>
                                )
                            })}
                            <h5 className="filter-label">{availiable_in_french_label}</h5>
                            <p className="filter-label">
                                <input
                                    type="checkbox"
                                    id="language"
                                    name="language"
                                    onChange={() => updateFrench()}
                                    checked={state.french}
                                />
                                <label htmlFor="language" className="capitalize">
                                    {yes}
                                </label>
                            </p>
                            <h5 className="filter-label">{moe_funded_label}</h5>
                            <p className="filter-label">
                                <input
                                    type="checkbox"
                                    id="funded"
                                    name="funded"
                                    onChange={() => updateFunded()}
                                    checked={state.funded}
                                />
                                <label htmlFor="funded" className="capitalize">
                                    {yes}
                                </label>
                            </p>
                            <h5 className="filter-label">{levels_label}</h5>
                            <Slider
                                min={1}
                                max={levels.length}
                                className="slider"
                                defaultValue={1}
                                handle={handle}
                                onChange={updateLevel}
                            />
                            {levels.map((level, i) => (
                                <div key={i} className={`levels ${state.level === i ? "current" : ""}`} id={`lvl${i}`}>
                                    {i + 1} - {level}
                                </div>
                            ))}

                            <div className="legend">
                                <div className="icon icon1">
                                    <FaVideo />
                                </div>
                                <div>{video_recordings}</div>
                                <div className="icon icon2">FR</div> <div>{availiable_in_french_label}</div>
                                <div className="icon icon3">
                                    <RiStarFill />
                                </div>{" "}
                                <div>{moe_funded_label}</div>
                            </div>
                        </form>
                    </div>
                    <div className="content">
                        <div className="image">
                            <img
                                src={pageContent.image.fluid.src}
                                srcSet={pageContent.image.fluid.srcSet}
                                width="100%"
                                height="200"
                                alt={pageContent.image.alt}
                            />
                        </div>
                        <div className="padded">
                            <Element name="courseblocks-anchor" />
                            {courses.length === 0 && (
                                <div className="no-courses" dangerouslySetInnerHTML={{ __html: not_found.html }} />
                            )}
                            <div className="courseblocks">
                                {courses.map((course, i) => {
                                    return (
                                        <a key={i} href={course.link.url} className="courseblock">
                                            <h3>{course.course_name.text}</h3>
                                            <div className="status">
                                                {course.with_video && (
                                                    <div className="icon icon1">
                                                        <FaVideo />
                                                    </div>
                                                )}
                                                {course.french && <div className="icon icon2">FR</div>}
                                                {course.moe_funded && (
                                                    <div className="icon icon3">
                                                        <RiStarFill />
                                                    </div>
                                                )}
                                                <div className="level">
                                                    {level} {levels.indexOf(course.level) + 1}
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="circle1" />
                    <div className="circle2" />
                </div>
            </div>
        </Layout>
    )
}

export default CourseMap

export const courseMapQuery = graphql`
    query CourseMap {
        prismicCourseMap {
            data {
                seo_title
                seo_keywords
                seo_description
                title {
                    text
                }
                subheading {
                    html
                }
                image {
                    fluid(maxWidth: 1400) {
                        ...GatsbyPrismicImageFluid
                    }
                    alt
                }
                ages {
                    filter_age
                }
                age_tooltip {
                    html
                }
                levels {
                    filter_level
                }
                age_label
                availiable_in_french_label
                filters_label
                levels_label
                level
                moe_funded_label
                yes
                video_recordings
                not_found {
                    html
                }
            }
        }
        allPrismicCourses {
            nodes {
                data {
                    age
                    course_name {
                        text
                    }
                    french
                    keywords
                    level
                    link {
                        link_type
                        target
                        type
                        uid
                        url
                    }
                    moe_funded
                    summary {
                        html
                    }
                    with_video
                }
            }
        }
    }
`
