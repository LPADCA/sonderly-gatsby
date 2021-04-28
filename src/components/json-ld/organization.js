export const organizationJsonLD = {
    "@id": "https://id.sonderly.io",
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    url: "https://sonderly.io/",
    logo: "https://sonderly.io/images/logo-header-2x.png",
    name: "Sonderly",
    sameAs: [
        "https://www.facebook.com/sonderly.io/",
        "https://twitter.com/sonderlyio",
        "https://www.instagram.com/sonderly.io/",
        "https://www.linkedin.com/showcase/sonderly/",
    ],
    address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M4S 2Z8",
        streetAddress: "112 Merton St",
    },
    description:
        "An educational and training platform for professionals and educators seeking to learn more about autism and mental health.",
}
