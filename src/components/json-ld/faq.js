export const faqJsonLD = (faq_list) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq_list.map(({ faq_title, faq_description }) => ({
        "@type": "Question",

        name: faq_title,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq_description.text,
        },
    })),
})
