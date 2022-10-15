const Stats = ({ blocks }) => {
    return (
            <div
                className="stats" style={{backgroundImage: "url('images/counter_bg.jpg')"}}>
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
    )
}
export default Stats
