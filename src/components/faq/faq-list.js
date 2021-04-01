import { useState, useEffect } from "react"
import FaqItem from "./faq-item"

const FaqList = ({ list, onStateChange }) => {
    const [isAllOpen, setAllOpen] = useState(false)

    useEffect(() => {
        if (onStateChange) onStateChange(isAllOpen)
    }, [isAllOpen])

    return (
        <div className="container faq-list">
            <div className="faq-list-buttons">
                <button className="link" onClick={() => setAllOpen(false)}>
                    Close All
                </button>
                <button className="link" onClick={() => setAllOpen(true)}>
                    Expand All
                </button>
            </div>
            <div className="faq-list-items">
                {list.map((i) => (
                    <FaqItem
                        isOpen={isAllOpen}
                        key={i.faq_title}
                        title={i.faq_title}
                        description={i.faq_description.html}
                    />
                ))}
            </div>
        </div>
    )
}

export default FaqList
