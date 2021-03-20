import { useEffect, useState } from "react"
import { ReactComponent as ArrowLeft } from "@assets/icons/arrow-left.svg"

const FAQ_OPEN_STATE = {
    paddingTop: "20px",
    maxHeight: "100px",
    opacity: 1,
}

const FAQ_CLOSED_STATE = {
    paddingTop: 0,
    maxHeight: 0,
    opacity: 0,
}

const FaqItem = ({ isOpen, title, description }) => {
    const [stateOpen, setOpen] = useState(isOpen)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    return (
        <div className="faq-item">
            <button onClick={() => setOpen(!stateOpen)} className="faq-button">
                <h4 className="faq-item-title">
                    {title}
                    <ArrowLeft
                        className={`faq-arrow ${
                            stateOpen ? "faq-arrow-down" : "faq-arrow-up"
                        }`}
                    />
                </h4>
            </button>
            <div
                className="faq-item-body"
                style={stateOpen ? FAQ_OPEN_STATE : FAQ_CLOSED_STATE}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    )
}

export default FaqItem
