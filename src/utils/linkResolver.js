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
        return `/blog/${doc.uid}`
    }

    if (doc.type === "faq_page") {
        return `/faq`
    }

    // Backup for all other types
    //console.log("unknown type resolved")
    return "/"
}

module.exports = linkResolver
