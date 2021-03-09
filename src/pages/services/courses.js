import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "@components/common/layout"
import Hero from "@components/blocks/hero"
import { FaFilter } from "react-icons/fa"
import { RiInformationLine } from "react-icons/ri"
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';


import "@styles/pages/services/courses.scss"

const Ages = ['All ages', 'Children', 'Adolescents', 'Adults']
const Levels = ['Introductory Autism',
                'Electives Autism',
                'Mental Health and Autism',
                'Introductory ABA',
                'Intermediate ABA',
                'Advanced ABA']

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
    <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
    >
        <Handle value={value} {...restProps} />
    </SliderTooltip>
    );
};

class CourseMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 0,
            french: false,
            funded: false,
            level: 0
        }
        this.updateAge = this.updateAge.bind(this)
        this.updateFrench = this.updateFrench.bind(this)
        this.updateFunded = this.updateFunded.bind(this)
        this.updateLevel = this.updateLevel.bind(this)
        this.coursesList = props.data.allPrismicCourses.nodes
        this.pageContent = props.data.prismicCourseMap.data
        console.log(props.data)
    }

    updateLevel(level) {
        this.setState(
            {
                level: level-1
            })
    }

    updateAge(newAge) {
        if (this.state.age !== newAge) {
            this.setState(
                {
                    age: newAge
                })
        }
    }
    updateFrench() {
        let newState = !this.state.french
            this.setState(
                {
                    french: newState
                })
    }
    updateFunded() {
        let newState = !this.state.funded
            this.setState(
                {
                    funded: newState
                })
    }

    render() {
        return (
            <Layout>
                {/* Hero */}
                <div className="spacer-top" />
                <Hero title={this.pageContent.title.text} subheading={this.pageContent.subheading} />
                
                <div className="container">
                <div className="courses">  
                    <div className="filters">
                        <form>
                            <h4><FaFilter/> Filters</h4>
                            <h5>Age <RiInformationLine/></h5>
                            <p>
                                <input type="radio" id="age0" name="age" value="age0" onClick={() => this.updateAge(0)} defaultChecked/>
                                <label htmlFor="age0">All ages</label>
                            </p>
                            <p>
                                <input type="radio" id="age1" name="age" onClick={() => this.updateAge(1)} value="age1"/>
                                <label htmlFor="age1">Children</label>
                            </p>
                            <p>
                                <input type="radio" id="age2" name="age" onClick={() => this.updateAge(2)} value="age2"/>
                                <label htmlFor="age2">Adolescents</label>
                            </p>
                            <p>
                                <input type="radio" id="age3" name="age" onClick={() => this.updateAge(3)} value="age3"/>
                                <label htmlFor="age3">Adults</label>
                            </p>
                            <h5>Avaliable in French</h5>
                            <p>
                                <input type="checkbox" id="language" name="language" value="language" onChange={()=>this.setState({french:!this.state.french})} onClick={() => this.updateFrench()} checked={this.state.french}/>
                                <label htmlFor="language">Yes</label>
                            </p>    
                            <h5>MOE Funded</h5>
                            <p>
                                <input type="checkbox" id="funded" name="funded" value="funded" onChange={()=>this.setState({funded:!this.state.funded})} onClick={() => this.updateFunded()} checked={this.state.funded}/>
                                <label htmlFor="funded">Yes</label>
                            </p> 
                            <h5>Minimum level of education</h5>
                            <p>
                                <Slider min={1} max={6} defaultValue={1} handle={handle} onChange={this.updateLevel} />
                            </p>    
                            {Levels.map((level, i) => (
                                <div className={`levels ${this.state.level === i ? 'current' : ''}`} id={`lvl${i}`}>{i+1} - {level}</div>
                            ))}

                            <div className="legend">
                                with video<br/>
                                Available in French<br/>
                                MOE-funded courses <br/>
                            </div>
                        </form>
                    </div>
                    <div className="content">
                        Age: {Ages[this.state.age]}<br/>
                        French: {this.state.french ? 'yes' : 'no'}<br/>
                        MOE Funded: {this.state.funded ? 'yes' : 'no'}<br/>
                        Min. level: {Levels[this.state.level]}<br/>
                        {this.coursesList.map((course, i) => (
                            course.data.french === this.state.french && 
                            course.data.moe_funded === this.state.funded && 
                            course.data.age.localeCompare(Ages[this.state.age]) === 0 ? 
                                <div key={i} style={{border: '1px solid black'}}>
                                    <h3>{course.data.course_name.text}</h3>
                                    Age: {course.data.age}<br/>
                                    French: {course.data.french ? 'true' : 'false'}<br/>
                                    MOE Funded: {course.data.moe_funded ? 'true' : 'false'}<br/>
                                    Min. level: {course.data.level}<br/>
                                </div> 
                            : null
                        ))}
                    </div>
                </div>
                </div>

            </Layout>
        )
    }
}

export default CourseMap


export const courseMapQuery = graphql`
    query CourseMap {
        prismicCourseMap {
            data {
                title {
                    text
                }
                subheading {
                    html
                }
                image {
                    alt
                }
                keywords
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
