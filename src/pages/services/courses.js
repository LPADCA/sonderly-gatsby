import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "@components/common/layout"
import Hero from "@components/blocks/hero"
import { FaFilter } from "react-icons/fa"
import { RiInformationLine, RiStarFill } from "react-icons/ri"
import { FaVideo } from "react-icons/fa"
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Scroll from 'react-scroll'

import "@styles/pages/services/courses.scss"

const Ages = ['All ages', 'Children', 'Adolescents', 'Adults']
const Levels = ['Introductory Autism',
                'Electives Autism',
                'Mental Health and Autism',
                'Introductory ABA',
                'Intermediate ABA',
                'Advanced ABA']

var Element  = Scroll.Element;
var scroller = Scroll.scroller;


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

const ScrollToList = () => {
    scroller.scrollTo('courseblocks-anchor', {
        duration: 800,
        delay: 50,
        smooth: true,
        offset: -80, // Scrolls to element + 50 pixels down the page
      })
}



class CourseMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 0,
            french: false,
            funded: false,
            level: 0,
            filtered: 0
        }
        this.updateAge = this.updateAge.bind(this)
        this.updateFrench = this.updateFrench.bind(this)
        this.updateFunded = this.updateFunded.bind(this)
        this.updateLevel = this.updateLevel.bind(this)
        this.getCourses = this.getCourses.bind(this)
        this.countCourses = this.countCourses.bind(this)
        this.popupScrollTag = this.popupScrollTag.bind(this)
        this.coursesList = props.data.allPrismicCourses.nodes
        this.pageContent = props.data.prismicCourseMap.data
        //console.log(props.data)
    }

    getCourses(level) {
        var response = []
        this.coursesList.map((course, i) => (
            (!this.state.french ? true : (this.state.french*course.data.french) ) && 
            (!this.state.funded ? true : (this.state.funded*course.data.moe_funded) ) &&
            (level === Levels.indexOf(course.data.level)) && 
            course.data.age.localeCompare(Ages[this.state.age]) === 0 &&
            response.push(course.data) 
        ))
        //console.log(response);
        return response
    }

    countCourses() {
        var count = 0
        for (var i=this.state.level;i<6;i++) {
            count += this.getCourses(i).length
            //console.log("lvl:"+i+" total:"+count+" age:"+this.state.age+" fr:"+(this.state.french?"+":"-")+" fnd:"+(this.state.funded?"+":"-"))
        }
        return count
    }

    popupScrollTag() {
        var count = this.countCourses()
        this.setState({
            filtered: count 
        })
    }

    /* this.setState is async */
    updateLevel(level) {
        this.setState({level: level-1}, () => {
            this.popupScrollTag()
        })
    }

    updateAge(newAge) {
        if (this.state.age !== newAge) {
            this.setState({age: newAge}, () => {
                this.popupScrollTag()
            })
        }
    }
    updateFrench() {
        let newState = !this.state.french
        this.setState({french: newState}, () => {
            this.popupScrollTag()
        })
    }
    updateFunded() {
        let newState = !this.state.funded
        this.setState({funded: newState}, () => {
            this.popupScrollTag()
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
                            <div className={`counterPopup ${this.state.filtered>0?'visible':''}`} onClick={ScrollToList}>
                                <h3>{this.state.filtered}</h3>
                                <p>course(s) found</p>                                
                            </div>
                            <h5>Age <RiInformationLine/></h5>
                            <p>
                                <input type="radio" id="age0" name="age" value="age0" onClick={() => this.updateAge(0)} defaultChecked/>
                                <label htmlFor="age0">Universal</label>
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
                            <Slider min={1} max={6} defaultValue={1} handle={handle} onChange={this.updateLevel} />
                            {Levels.map((level, i) => (
                                <div key={i} className={`levels ${this.state.level === i ? 'current' : ''}`} id={`lvl${i}`}>{i+1} - {level}</div>
                            ))}

                            <div className="legend">
                                <div className="icon icon1"><FaVideo/></div><div>With Video</div>
                                <div className="icon icon2">FR</div> <div>Available in French</div>
                                <div className="icon icon3"><RiStarFill/></div> <div>MOE-funded Courses</div>
                            </div>

                        </form>
                    </div>
                    <div className="content">
                        <div className="image">
                            <img src={this.pageContent.image.fluid.src} srcSet={this.pageContent.image.fluid.srcSet} width="100%" height="200" alt={this.pageContent.image.alt}/>
                        </div>
                        <div className="padded">
                            <Element name="courseblocks-anchor"/>
                            <div className="courseblocks">
                            {Levels.map((level, i) => (
                                (this.getCourses(i).length > 0) && this.state.level <= i &&
                                    this.getCourses(i).map((course, i) => (
                                        <div key={i} className="courseblock">
                                            <h3>{course.course_name.text}</h3>
                                            <div className="status">
                                                {course.with_video && 
                                                    <div className="icon icon1"><FaVideo/></div>
                                                }
                                                {course.french && 
                                                    <div className="icon icon2">FR</div>
                                                }
                                                {course.moe_funded && 
                                                    <div className="icon icon3"><RiStarFill/></div>
                                                }
                                                <div className="level">L{(Levels.indexOf(course.level)+1)}</div>
                                            </div>
                                            <a className="button" href="/">Learn more</a>
                                        </div> 
                                    ))
                                ))}
                            
                            </div>
                        </div>
                    </div>
                    <div className="circle1"/>
                    <div className="circle2"/>
                </div>
                </div>

            </Layout>
        )
    }
}

export default CourseMap


/*
    {this.coursesList.map((course, i) => (
        (!this.state.french ? true : (this.state.french*course.data.french) ) && 
        (!this.state.funded ? true : (this.state.funded*course.data.moe_funded) ) &&
        (this.state.level <= Levels.indexOf(course.data.level)) && 
        course.data.age.localeCompare(Ages[this.state.age]) === 0 ? 
            <div key={i} className="courseblock">
                <h3>{course.data.course_name.text}</h3>
                <div className="status">
                    {course.data.with_video && 
                        <div className="icon icon1"><FaVideo/></div>
                    }
                    {course.data.french && 
                        <div className="icon icon2">FR</div>
                    }
                    {course.data.moe_funded && 
                        <div className="icon icon3"><RiStarFill/></div>
                    }
                    <div className="level">Level {(Levels.indexOf(course.data.level)+1)}</div>
                </div>
            </div> 
        : null
    ))}
*/


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
                    fluid(maxWidth: 1400) {
                        ...GatsbyPrismicImageFluid
                    }
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
