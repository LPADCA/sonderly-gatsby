import React from "react"
import { Helmet } from "react-helmet";
import { CgArrowRight } from "react-icons/cg"
import VizSensor from 'react-visibility-sensor';

class Stats extends React.Component {
	constructor(props) {
        super(props);
        this.blocks = props.blocks;
        this.state = {
            nowVisible: false,
        }
    }

    componentDidMount() {
        //console.log("Mounted");
    }

    render() {
        const blocks = this.blocks;
        return (
            <>
            <VizSensor
                onChange={(isVisible) => {
                    this.setState({nowVisible: isVisible})
                    }}
                >
                <div className="stats"
                          style={{
                            opacity: this.state.nowVisible ? 1 : 0.25,
                            transition: 'opacity 500ms linear'
                          }}
                >
                    <div className="container">
                        <div className="grid">
                            {blocks.map((item, i) => (
                                <div key={`stats-${i}`}>
                                    <h2>{item.number}+</h2>
                                    <h5>{item.description}</h5>
                                </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </VizSensor>
            </>
        )
    }
}
export default Stats
