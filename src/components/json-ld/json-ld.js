import { Helmet } from "react-helmet"

const JsonLD = ({ children }) => {
    return (
        <Helmet>
            <script type="application/ld+json">{JSON.stringify(children)}</script>
        </Helmet>
    )
}

export default JsonLD
