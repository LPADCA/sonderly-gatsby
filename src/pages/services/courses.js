import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import Layout from "@components/common/layout"
import Hero from "@components/blocks/hero"
import { BsClockFill, BsStarFill } from "react-icons/bs"
import { FaVideo } from "react-icons/fa"
import Select, { components } from 'react-select'
import { RichText } from 'prismic-reactjs'
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

const CourseBlock = ({course, options, cta}) => {
    const popup = course.content
    const link = course.link
    const [visible, setVisible] = useState(0);
    const enabled = popup !== null && popup.text !== null && popup.text.length > 0
    console.log(enabled, popup, popup.text)
    const Clicker = (e) => {
        if (enabled) {  
            if(visible) {
                document.body.style.backgroundColor = "transparent"
            }
            else {
                document.body.style.backgroundColor = "white"
            }
            setVisible(!visible)
            e.preventDefault()
        }
    }

    const generateCategoriesOutput = (course, options) => {
        var strings = []
        if (course.category__autism) strings.push(options[0].label)
        if (course.category__mental_health) strings.push(options[1].label)
        if (course.category__neurodiversity) strings.push(options[2].label)
        return(
            <>{strings.join(", ")}</>
        )
    }

    return (
        <div className='course'>
            {enabled && (
                <div className={`popup ${visible ? 'visible' : ''}`} onClick={(e)=>Clicker(e)}>
                    <div className="insert" onClick={(e)=>e.stopPropagation()}>
                        {course.thumbnail && <div className="img-wrapper">
                            <img src={course.thumbnail.url} width="300" alt={course.thumbnail.alt}/>
                        </div>}
                        <h3>{course.course_name.text}</h3>
                        <RichText render={popup.raw}/>
                        <div className="bottom">
                            <div className="lower">
                                <div className="lb3"><div className="txt">EN</div>
                                    {course.french && <div className="txt">+FR</div>}
                                    {course.with_video && (
                                            <FaVideo className="icon video"/>
                                    )}
                                </div>
                                {((course.ceu_credits !== null) && (course.ceu_credits > 0)) &&
                                    <div className="lb2">
                                        < BsStarFill className="icon"/> {course.ceu_credits} BACB CEU credit(s)
                                    </div>
                                }
                                <div className="lb1">
                                    <BsClockFill className="icon"/> {course.time} 
                                </div>
                            </div>
                            <div className="button-wrapper">
                                <a href={link.url} className="button black">{cta}</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <a href={link.url} onClick={(e)=>Clicker(e)}>
                <div className="courseblock">
                    <p className="categorisation">{generateCategoriesOutput(course, options)} / {course.lvl} / {course.age}</p>
                    {course.thumbnail && <div className="img-wrapper">
                        <img src={course.thumbnail.url} width="300" alt={course.thumbnail.alt}/>
                    </div>}
                    <h3>{course.course_name.text}</h3>
                    <div dangerouslySetInnerHTML={{ __html: course.summary.html }}/>
                    <div className="lower">
                        <div className="lb3"><div className="txt">EN</div>
                            {course.french && <div className="txt">+FR</div>}
                            {course.with_video && (
                                    <FaVideo className="icon video"/>
                            )}
                        </div>
                        {((course.ceu_credits !== null) && (course.ceu_credits > 0)) &&
                            <div className="lb2">
                                < BsStarFill className="icon"/> {course.ceu_credits} BACB CEU credit(s)
                            </div>
                        }
                        <div className="lb1">
                            <BsClockFill className="icon"/> {course.time} 
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}



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
        bacb_credits_label,
        not_found,
    } = pageContent
    const categoryOptions = pageContent.categories.map((el, i) => ({'value': i, 'label': el.category}));         
    const ageOptions = pageContent.ages.map((el, i) => ({'value': i, 'label': el.age}));          
    const ageDefaultValue = {'value': 0, 'label': pageContent.ages[0].age}
    const levelOptions = pageContent.levels.map((el, i) => ({'value': i, 'label': el.level}));
    const extrasOptions = [{'value': 0, 'label': bacb_credits_label}, {'value': 1, 'label': availiable_in_french_label}]
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
        credits: false,
        levels: [],
        extrasOptions: []
    })

    const courses = coursesList
        .filter(({ data: course }) => {
            //if (state.video && !course.with_video) return false
            if (state.credits && !course.ceu_credits) return false
            //console.log(course)
            if (state.french && !course.french) return false
            if (ageOptions[state.age].label !== course.ag && state.age !== 0) return false
            if (state.categories.length > 0) {
                var ex = state.categories.map((item) => item.value)
                var cats = [course.category__autism ? 0 : null, course.category__mental_health ? 1 : null, course.category__neurodiversity ? 2 : null]
                if (ex.some(el => cats.includes(el)) === false) return false
            }
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
        var newOptions = {'french': false, 'credits': false}
        options.forEach((option)=> {
            if (option.value === 1) {
                newOptions['french'] = true
            }
            else if (option.value === 0) {
                    newOptions['credits'] = true
            }
        })
        setState({ ...state, french: newOptions['french'], credits: newOptions['credits'], extrasOptions: options})
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
                            <input type="text" value={state.text} onChange={(e) => updateString(e)} placeholder={pageContent.quick_search_string}/>
                        </div>
                    </form>
                    <div className="content">
                        <div className="padded">
                            {courses.length === 0 && (
                                <div className="no-courses" dangerouslySetInnerHTML={{ __html: not_found.html }} />
                            )}
                            <div className="courseblocks">
                                {courses.map((course, i) => (
                                    <CourseBlock key={i} course={course} options={categoryOptions} cta={pageContent.popup_cta_text}/>
                                ))}
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
                quick_search_string
                age_label
                availiable_in_french_label
                category_label
                level_label
                other_label
                seo_description
                seo_keywords
                seo_title
                video_recordings_label
                bacb_credits_label
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
                popup_cta_text
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
                    content {
                        text
                        html
                        raw
                    }
                    french
                    lvl
                    ceu_credits
                    category
                    category__autism
                    category__mental_health
                    category__neurodiversity
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
                    thumbnail {
                        url(imgixParams: {sat: 0})
                        alt
                    }
                }
            }
        }
    }
`
