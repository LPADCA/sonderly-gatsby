import { React, useEffect, useRef} from 'react';
import _debounce from 'lodash.debounce'

const Hero = ({ slides }) => {
    const homepage_hero = useRef(null);
    const bg_video_wrapper = useRef(null);
    useEffect(() => {
        const handleResize = _debounce(() => {
            var w = homepage_hero.current.offsetWidth;
            var h = homepage_hero.current.offsetHeight;
            var ratio = w / h 
            var nw = ratio >= 1280/720 ? w : h * 1280 / 720
            var nh = ratio >= 1280/720 ? w * 720 / 1280 : h
            bg_video_wrapper.current.style.width = nw + 'px'
            bg_video_wrapper.current.style.height = nh + 'px'
        })
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
      }, [])

      return (
        <>
            <div className="spacer-top" />
            <div ref={homepage_hero} className="homepage-hero">
                <div ref={bg_video_wrapper} className="bg-video-wrapper">
                    <video muted={true} loop autoPlay style={{ height: "100%", width: "100%", objectFit: "cover" }}>
                        <source src='/videos/sbg.mp4' type="video/mp4" />
                    </video>
                </div>
                <div className="container">
                    <div dangerouslySetInnerHTML={{__html:slides[0].title.html}}/>  
                    <div dangerouslySetInnerHTML={{__html:slides[0].description.html}}/>  
                    <div className="button-wrapper">
                        <a href={slides[0].link.url} target={slides[0].link.target} className="button black">
                            {slides[0].button_text}
                        </a>
                    </div>
                </div>
            </div>
        </>

    ) 
    /*       
        <>
            <div className="homepage-hero">
                <div className="illustration">
                    <img {...getImageProps(slides[0].image)} />
                </div>
                <div className="container">
                    <div className="content">
                        <div className="wrapper">
                            <h1>{slides[0].title.text}</h1>
                            <p>{slides[0].description}</p>
                            <div className="button-wrapper">
                                <a href={slides[0].link.url} target={slides[0].link.target} className="button">
                                    {slides[0].button_text}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bg-el3" />
                <div id="bg-el4" />
            </div>
        </>
    )
    */
}

export default Hero
