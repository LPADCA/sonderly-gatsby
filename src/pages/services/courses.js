import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "@components/common/layout"
import Hero from "@components/blocks/hero"
import { BsClockFill, BsStarFill } from "react-icons/bs"
import { FaVideo } from "react-icons/fa"
import Select from 'react-select'

import "@styles/pages/services/courses.scss"

const CourseMap = ({ data, location }) => {
    const coursesList = data.allPrismicCourses.nodes
    const pageContent = data.prismicCourseMap2022.data
    const {
        category_label,
        age_label,
        other_label,
        level_label,
        availiable_in_french_label,
        video_recordings_label,
        not_found,
    } = pageContent
    //const levels = pageContent.levels.map((l) => l.filter_level)
    const categories = pageContent.categories.map((l) => l.category)
    const categoryOptions = pageContent.categories.map((el, i) => ({'value': i, 'label': el.category}));          
    const ages = pageContent.ages.map((l) => l.age)
    const ageOptions = pageContent.ages.map((el, i) => ({'value': i, 'label': el.age}));          
    const ageDefaultValue = {'value': 0, 'label': pageContent.ages[0].age}
    const levelOptions = pageContent.levels.map((el, i) => ({'value': i, 'label': el.level}));
    const extrasOptions = [{'value': 0, 'label': video_recordings_label}, {'value': 1, 'label': availiable_in_french_label}]

    const [state, setState] = useState({
        category: 0,
        age: null,
        french: false,
        video: false,
        funded: false,
        level: 0,
        filtered: 0,
        extrasOptions: []
    })

    const courses = coursesList
        .filter(({ data: course }) => {
            if (state.video && !course.with_video) return false
            if (state.french && !course.french) return false
            //if (state.level > levels.indexOf(course.level)) return false
            //console.log(course.age, ages[state.age])
            //console.log(course.age.localeCompare(ages[state.age], undefined, { sensitivity: "base" }))
            if (state.age != null && state.age === 0) return true
            if (
                state.age != null &&
                course.age.localeCompare(ages[state.age], undefined, { sensitivity: "base" }) !== 0
            ) {
                return false
            }
            return true
        })
        .map((c) => c.data)
        //.sort((a, b) => levels.indexOf(a.level) - levels.indexOf(b.level))
    //console.log(courses)

    const updateCategory = (val) => {
        setState({ ...state, category: val})
    }
    const updateLevel = (val) => {
        setState({ ...state, level: val})
    }
    const updateAge = (newAge) => setState({ ...state, age: newAge })
    const updateExtras = (options) => {
        var newOptions = {'french': false, 'video': false}
        options.forEach((option)=> {
            if (option.value === 1) {
                newOptions['french'] = true
            }
            else if (option.value === 0) {
                    newOptions['video'] = true
            }
        })
        setState({ ...state, french: newOptions['french'], video: newOptions['video'], extrasOptions: options})
    }


    return (
        <Layout location={location} {...Layout.pickSeoProps(pageContent)}>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(
                        {
                            "@context": "https://schema.org",
                            "@type": "ItemList",
                            itemListElement: coursesList.map(({ data: c }, i) => ({
                                "@type": "ListItem",
                                position: i,
                                item: {
                                    name: c.course_name.text,
                                    description: c.summary.text,
                                    url: c.link.url,
                                },
                            })),
                        },
                        null,
                        4
                    )}
                </script>
            </Helmet>
            <div className="spacer-top" />
            <Hero title={pageContent.title.text} />

            <div className="container">
                <div className="courses">
                    <form>
                        <div className="filters">
                            <div>
                            <Select 
                                styles={{
                                    control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: '#35ce8d',
                                    }),
                                }}
                                placeholder={category_label}
                                options={categoryOptions}
                                onChange={(e) => updateCategory(e.value)}
                                />
                            </div>
                            <div>
                                <Select 
                                    styles={{
                                        control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: '#35ce8d',
                                        }),
                                    }}
                                    placeholder={age_label}
                                    options={ageOptions}
                                    onChange={(e) => updateAge(e.value)}
                                    defaultValue={ageDefaultValue}
                                    />
                            </div>
                            <div>
                                <Select
                                    styles={{
                                        control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: '#35ce8d',
                                        }),
                                    }}
                                    placeholder={level_label}
                                    options={levelOptions}
                                    onChange={updateLevel}
                                    value={state.levelOptions}
                                    />
                            </div>
                            <div>
                                <Select
                                    styles={{
                                        control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: '#35ce8d',
                                        }),
                                    }}
                                    placeholder={other_label}
                                    options={extrasOptions}
                                    isMulti
                                    onChange={updateExtras}
                                    value={state.extrasOptions}
                                    />
                            </div>
                        </div>
                    </form>
                    <div className="content">
                        <div className="padded">
                            {courses.length === 0 && (
                                <div className="no-courses" dangerouslySetInnerHTML={{ __html: not_found.html }} />
                            )}
                            <div className="courseblocks">
                                {courses.map((course, i) => {
                                    return (
                                        <a key={i} href={course.link.url}>
                                            <div className="courseblock">
                                                <p className="categorisation">Autism / Intermediate</p>
                                                <h3>{course.course_name.text}</h3>
                                                <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sagittis iaculis lectus, sit amet varius nibh egestas at. Ut placerat sapien vel ex iaculis facilisis. Aenean pharetra dui id urna imperdiet dapibus vel sit amet nisl. Proin sagittis gravida tortor id sodales. Nunc massa lacus, placerat sit amet volutpat eu, euismod in velit. 
                                                </p>
                                                <div className="lb1">
                                                    <BsClockFill className="icon"/> 1 hour 30 min
                                                </div>
                                                <div className="lb2">
                                                    < BsStarFill className="icon"/> 1 CEU credit
                                                </div>
                                                <div className="lb3"><div className="txt">EN</div>
                                                    {course.french && <div className="txt">+FR</div>}
                                                    {course.with_video && (
                                                            <FaVideo className="icon video"/>
                                                    )}
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CourseMap

export const courseMapQuery = graphql`
    query CourseMap {
        prismicCourseMap2022 {
            data {
                age_label
                availiable_in_french_label
                category_label
                level_label
                other_label
                seo_description
                seo_keywords
                seo_title
                video_recordings_label
                title {
                    text
                    html
                }
                not_found {
                    html
                    text
                }
                levels {
                    level
                }
                categories {
                    category
                }
                ages {
                    age
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
                        url
                    }
                    summary {
                        html
                        text
                    }
                    with_video
                }
            }
        }
    }
`
