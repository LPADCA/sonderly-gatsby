import { getImageProps } from "@utils/getImageProps"

const FeaturedCourses = ({ featured_title, featured_description, featured_courses }) => {
    const onClick = () => {
        window.pintrk("track", "pagevisit", {
            property: featured_title,
        })
    }

    return (
        <div className="featured container">
            <div className="featured-title" dangerouslySetInnerHTML={{ __html: featured_title.html }} />
            <div className="featured-description" dangerouslySetInnerHTML={{ __html: featured_description.html }} />
            <div className="featured-courses">
                {featured_courses.map((c) => (
                    <div key={c.course_title.html} className="featured-course">
                        <img className="featured-course-icon" {...getImageProps(c.course_icon)} />
                        <div dangerouslySetInnerHTML={{ __html: c.course_title.html }} />
                        <div dangerouslySetInnerHTML={{ __html: c.course_description.html }} />
                        <a className="featured-link" onClick={onClick} href={c.course_link_url}>
                            {c.course_link_text}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default FeaturedCourses
