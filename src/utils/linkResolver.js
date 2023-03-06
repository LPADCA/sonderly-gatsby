const linkResolver = (doc) => {
    if (doc.link_type === "Web") {
        return `${doc.url}`
    }
    
    if (doc.type === "homepage2022") {
        return `/hp2022`
    }

    if (doc.type === "page") {
        return `/${doc.uid}`
    }

    if (doc.type === "blogs") {
        return `/resources/blogs/`
    }

    if (doc.type === "videos") {
        return `/resources/videos/`
    }

    if (doc.type === "blog_post") {
        return `/resources/blogs/${doc.uid}`
    }

    if (doc.type === "video") {
        return `/resources/videos/${doc.uid}`
    }

    if (doc.type === "about_page_2022") {
        return `/about`
    }

    if (doc.type === "group_training") {
        return `/services/corporate`
    }

    if (doc.type === "course_map_2022") {
        return `/services/catalogue`
    }

    if (doc.type === "faq_page") {
        return `/faq`
    }

    if (doc.type === "contact_page") {
        return `/contact`
    }

    // Backup for all other types
    return "/others"
}

module.exports = linkResolver
