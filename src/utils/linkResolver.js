const linkResolver = (doc) => {
    if (doc.link_type === "Web") {
        return `${doc.url}`
    }
    
    if (doc.type === "homepage") {
        return `/`
    }

    if (doc.type === "page") {
        return `/${doc.uid}`
    }

    if (doc.type === "blog_post") {
        return `/resources/blogs/${doc.uid}`
    }

    if (doc.type === "video") {
        return `/resources/videos/${doc.uid}`
    }
    
    if (doc.type === "funded_training") {
        return `/services/funded-training`
    }

    if (doc.type === "professional_training") {
        return `/services/professional-training`
    }

    if (doc.type === "services_corporate") {
        return `/services/corporate`
    }

    if (doc.type === "course_map") {
        return `/services/courses`
    }

    if (doc.type === "about_page") {
        return `/about`
    }

    if (doc.type === "faq_page") {
        return `/faq`
    }

    if (doc.type === "contact_page") {
        return `/contact`
    }

    // Backup for all other types
    return "/"
}

module.exports = linkResolver
