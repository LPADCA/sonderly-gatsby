import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "@components/common/layout"
import Hero from "@components/blocks/hero"
import { BsClockFill, BsStarFill } from "react-icons/bs"
import { FaVideo } from "react-icons/fa"
import Select, { components } from 'react-select'

import "@styles/pages/services/courses.scss"

/*
const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
const { ValueContainer, Placeholder } = components;
const EmptyValueContainer = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
        {React.Children.map(children, child =>
          child && child.type !== Placeholder ? child : null
        )}
      </ValueContainer>
    );
  };
*/


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
    const categoryOptions = pageContent.categories.map((el, i) => ({'value': i, 'label': el.category}));         
    const ageOptions = pageContent.ages.map((el, i) => ({'value': i, 'label': el.age}));          
    const ageDefaultValue = {'value': 0, 'label': pageContent.ages[0].age}
    const levelOptions = pageContent.levels.map((el, i) => ({'value': i, 'label': el.level}));
    const extrasOptions = [{'value': 0, 'label': video_recordings_label}, {'value': 1, 'label': availiable_in_french_label}]
    const uniStyle = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: '#35ce8d',
            '&:hover': {
                boxShadow: '0 0 7px #35ce8d',
            },
            boxShadow: 'none',
            
        }),
        valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            color: '#35ce8d',
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? '#35ce8d' : 'white',
            color: 'black'
        }),
    }
    

    const [state, setState] = useState({
        text: "",
        categories: [],
        age: 0,
        french: false,
        video: false,
        levels: [],
        extrasOptions: []
    })

    const courses = coursesList
        .filter(({ data: course }) => {
            if (state.video && !course.with_video) return false
            if (state.french && !course.french) return false
            if (ageOptions[state.age].label !== course.ag && state.age !== 0) return false
            if (state.categories.length > 0 && !state.categories.map(({label, value}) => label).includes(course.category)) return false
            if (state.levels.length > 0 && !state.levels.map(({label, value}) => label).includes(course.lvl)) return false
            if (state.text.length == 0) return true
            else if (state.text.length > 0 && course.course_name.text.toLowerCase().includes(state.text.toLowerCase())) return true
            else return false
        })
        .map((c) => c.data)
        //.sort((a, b) => levels.indexOf(a.level) - levels.indexOf(b.level))

    const updateCategory = (val) => {
        setState({ ...state, categories: val})
    }
    const updateLevel = (val) => {
        setState({ ...state, levels: val})
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
    const updateString = (event) => {
        setState({ ...state, text: event.target.value})
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
                                styles={uniStyle}
                                placeholder={category_label}
                                options={categoryOptions}
                                isMulti
                                onChange={(e) => updateCategory(e)}
                                />
                            </div>
                            <div>
                                <Select 
                                    styles={uniStyle}
                                    placeholder={age_label}
                                    options={ageOptions}
                                    onChange={(e) => updateAge(e.value)}
                                    defaultValue={ageDefaultValue}
                                    />
                            </div>
                            <div>
                                <Select
                                    styles={uniStyle}
                                    placeholder={level_label}
                                    options={levelOptions}
                                    isMulti
                                    onChange={(e) => updateLevel(e)}
                                    value={state.levelOptions}
                                    />
                            </div>
                            <div>
                                <Select
                                    styles={uniStyle}
                                    placeholder={other_label}
                                    options={extrasOptions}
                                    isMulti
                                    onChange={updateExtras}
                                    value={state.extrasOptions}
                                    />
                            </div>
                        </div>
                        <div className="quick_filter">
                            <input type="text" value={state.text} onChange={(e) => updateString(e)} placeholder="Start typing for quick search.."/>
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
                                                <p className="categorisation">{course.category} / {course.lvl} / {course.age}</p>
                                                <h3>{course.course_name.text}</h3>
                                                <div dangerouslySetInnerHTML={{ __html: course.summary.html }}/>
                                                <div className="lb1">
                                                    <BsClockFill className="icon"/> {course.time}
                                                </div>
                                                <div className="lb2">
                                                    < BsStarFill className="icon"/> {course.ceu_credits} CEU credit(s)
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
                    ag
                    course_name {
                        text
                    }
                    french
                    lvl
                    ceu_credits
                    category
                    time
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
