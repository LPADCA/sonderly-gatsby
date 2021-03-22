import { useEffect, useState } from "react"
import { ReactComponent as ArrowLeft } from "@assets/icons/arrow-left.svg"
import AnimateHeight from "react-animate-height"

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
                    <ArrowLeft className={`faq-arrow ${stateOpen ? "faq-arrow-down" : "faq-arrow-up"}`} />
                </h4>
            </button>
            <AnimateHeight height={stateOpen ? "auto" : 0} duration={500}>
                <div className="faq-item-body" dangerouslySetInnerHTML={{ __html: description }} />
            </AnimateHeight>
        </div>
    )
}

export default FaqItem
