import { useState } from "react"
import VizSensor from "react-visibility-sensor"

const Stats = ({ blocks }) => {
    const [isVisible, setVisible] = useState(false)
    return (
        <VizSensor onChange={(isVisible) => setVisible(isVisible)}>
            <div
                className="stats"
                style={{
                    opacity: isVisible ? 1 : 0.25,
                    transition: "opacity 500ms linear",
                }}
            >
                <div className="container">
                    <div className="grid">
                        {blocks.map((item, i) => (
                            <div key={`stats-${i}`}>
                                <h2>{item.number}</h2>
                                <h3>{item.description}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </VizSensor>
    )
}
export default Stats
