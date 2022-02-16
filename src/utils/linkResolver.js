const linkResolver = (doc) => {
    if (doc.link_type === "Web") {
        return `${doc.url}`
    }
    // URL for a category type
    if (doc.type === "homepage") {
        //console.log("homepage resolved")
        return `/`
    }
    // URL for a page type
    if (doc.type === "page") {
        //console.log(`/blog/${doc.uid}`)
        return `/${doc.uid}`
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
    //console.log("unknown type resolved")
    return "/"
}

module.exports = linkResolver
