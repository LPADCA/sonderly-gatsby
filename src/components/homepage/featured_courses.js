import { getImageProps } from "@utils/getImageProps"
import { useState } from "react"
import AnimateHeight from "react-animate-height"

const FeaturedCourses = ({ featured_title, featured_description, featured_anchor, featured_courses }) => {
    return (
        <div id={featured_anchor} className="featured container">
            {featured_title.html && (
                <div className="featured-title" dangerouslySetInnerHTML={{ __html: featured_title.html }} />
            )}
            {featured_title.html && (
                <div className="featured-description" dangerouslySetInnerHTML={{ __html: featured_description.html }} />
            )}
            <div className="featured-courses">
                {featured_courses.map((c) => {
                    const [isOpen, setOpen] = useState(c.course_link_url ? true : false)
                    const onClick = () => {
                        window.pintrk("track", "pagevisit", {
                            property: featured_title,
                        })

                        if (!c.course_link_url) {
                            setOpen(!isOpen)
                        }
                    }
                    return (
                        <div key={c.course_title.html} className="featured-course">
                            <div className="featured-header">
                                {c.course_icon && (
                                    <img className="featured-course-icon" {...getImageProps(c.course_icon)} />
                                )}
                            </div>
                            <div className="featured-content">
                                <AnimateHeight duration={500} height={isOpen ? "auto" : 140}>
                                    <div dangerouslySetInnerHTML={{ __html: c.course_title.html }} />
                                    <div dangerouslySetInnerHTML={{ __html: c.course_description.html }} />
                                </AnimateHeight>
                                <div className="button-wrapper">
                                    <a className="button" onClick={onClick} href={c.course_link_url}>
                                        {c.course_link_text}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default FeaturedCourses
