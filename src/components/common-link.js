import { Link } from "gatsby"

export default function CommonLink({ type, to, children, ...props }) {
    if (type === "Document") {
        return (
            <Link to={to} {...props}>
                {children}
            </Link>
        )
    }
    if (!to) {
        return <a {...props}>{children}</a>
    }
    return (
        <a href={to} {...props}>
            {children}
        </a>
    )
}
