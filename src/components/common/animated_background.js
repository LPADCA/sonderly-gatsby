import ReactDOM from 'react-dom'
import { React, Component, createRef} from 'react';
//import _debounce from 'lodash.debounce'
import "@styles/animated_background.scss"



class AnimatedBackground extends Component {
    constructor() {
        super();
        this.state = {
            parent: null
        }
        this.backgroundVideoWrapper = createRef();
    }
    handleWindowResize = this.handleWindowResize.bind(this)

    componentDidMount() {
        const parentNode = ReactDOM.findDOMNode(this).parentNode
        this.setState({
          parent: parentNode 
        });
        parentNode.style.position = "relative";
        window.addEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        var w = this.state.parent.offsetWidth;
        var h = this.state.parent.offsetHeight;
        var ratio = w / h 
        var nw = ratio >= 1280/720 ? w : h * 1280 / 720
        var nh = ratio >= 1280/720 ? w * 720 / 1280 : h
        this.backgroundVideoWrapper.current.style.width = nw + 'px'
        this.backgroundVideoWrapper.current.style.height = nh + 'px'
    }

    render() {
        if (!this.state.parent) {
            return <span />;
          } else {
                return (
                    <div className='animated-video-wrapper'>
                        <div ref={this.backgroundVideoWrapper} className="bg-video-wrapper">
                            <video muted={true} loop autoPlay style={{ height: "100%", width: "100%", objectFit: "cover" }}>
                                <source src='/videos/sbg.mp4' type="video/mp4" />
                            </video>
                        </div>
                    </div>
                )
            }
        }
}

export default AnimatedBackground

/*useEffect(() => {
    const handleResize = _debounce(() => {
        var w = parent.current.offsetWidth;
        var h = parent.current.offsetHeight;
        var ratio = w / h 
        var nw = ratio >= 1280/720 ? w : h * 1280 / 720
        var nh = ratio >= 1280/720 ? w * 720 / 1280 : h
        backgroundVideoWrapper.current.style.width = nw + 'px'
        backgroundVideoWrapper.current.style.height = nh + 'px'
    })
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    }
  }, []
)*/