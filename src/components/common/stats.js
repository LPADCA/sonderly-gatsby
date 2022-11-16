import { useStaticQuery, graphql } from "gatsby"
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const Stats = () => {
    const data = useStaticQuery(graphql`
        query Stats {
            prismicHomepage2022 {
                data {
                    stats_element {
                        number
                        description
                    }
                }
            }
        }
    `)
    return (
            <div
                className="stats" style={{backgroundImage: "url('images/counter_bg.jpg')"}}>
                <div className="container">
                    <div className="grid">
                        {data.prismicHomepage2022.data.stats_element.map((item, i) => (
                            <div key={`stats-${i}`}>
                                <h2>
                                <VisibilitySensor partialVisibility offset={{ bottom: 0 }}>
                                    {({ isVisible }) => (
                                    <div style={{ height: 50 }}>
                                        {isVisible ? <CountUp duration="3" end={Number(item.number.slice(0, -1))} suffix="+" useEasing={true}/> : null}
                                    </div>
                                    )}
                                </VisibilitySensor>
                                </h2>
                                <h3>{item.description}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}
export default Stats
