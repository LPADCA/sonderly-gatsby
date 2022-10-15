// import { Link } from "gatsby"
// import { CgArrowRight } from "react-icons/cg"
// import { getImageProps } from "@utils/getImageProps"

const Hero = ({ slides }) => {
    return (
        <>
            <div className="homepage-hero" style={{backgroundImage: "url("+slides[0].background.url+")"}}>
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
