import Layout from "@components/common/layout.js"
import { FiInstagram } from "react-icons/fi"
import "@styles/pages/burnout.scss"

const Burnout = ({ data, location }) => {
    return (
        <Layout location={location} className="burnout-page">
            <div className="burnout-header">
                <div className="grid">
                    <img src="/burnout/grid1.jpg"/>
                    <img src="/burnout/grid2.jpg"/>
                    <img src="/burnout/grid3.jpg"/>
                    <img src="/burnout/grid4.jpg"/>
                    <img src="/burnout/grid5.jpg"/>
                </div>
                <div class="title-wrapper">
                    <div className="title">
                        <h1>The image is artifical. The stress is real.</h1>
                    </div>
                </div>
            </div>
            <div className="section container burnout-courses">
                <h2>We provide courses to help you understand mental health.</h2>
                <p>
                    Sonderly seeks to democratize the knowledge and skills that have typically been accessible only to trained professionals. To do this, we identify and develop training materials to ensure that professionals continue to receive the most relevant and effective training available.
                </p>
                <div className="grid">
                    <div className="block block1">
                        <div className="illustration">
                            <img src="/burnout/block1.jpg"/>
                        </div>
                        <div className="content">
                            <h4>Foundations of Mental Health in the Classroom</h4>
                            <p>This course presents the information in a way that is practical and relevant for educators who are supporting students in an educational setting.</p>
                            <a target="_blank" href="https://sonderly.csod.com/LMS/LoDetails/DetailsLo.aspx?loid=69a692e1-feac-4059-8781-a34599a19926#t=1">Learn more</a>
                        </div>
                    </div>
                    <div className="block block2">
                        <div className="illustration">
                            <img src="/burnout/block2.jpg"/>
                        </div>
                        <div className="content">
                            <h4>Confronting the Mental Health Crisis in the Classroom</h4>
                            <p>A wealth of data suggests students are experiencing a persistent and pervasive mental health crisis. You as an educator or parent may be asking, “Why is this occurring?” and equally as important what you can do to improve this situation.</p>
                            <a target="_blank" href="https://sonderly.csod.com/default.aspx?p=sonderly&c=%5e%5e%5ewuCISvPDXO3LIBO3TNBHKg%3d%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d31905a91-4f10-4ac9-a58a-01ef95f1a577">Learn more</a>
                        </div>
                    </div>
                    <div className="block block3">
                        <div className="illustration">
                            <img src="/burnout/block3.jpg"/>
                        </div>
                        <div className="content">
                            <h4>Exploring Mental Health of Autistic Students</h4>
                            <p>This course will provide informative sources for assessment options, intervention strategies for the treatment of anxiety, and suggest accommodations to meet individual needs.</p>
                            <a target="_blank" href="https://sonderly.csod.com/default.aspx?p=sonderly&c=%5e%5e%5ewuCISvPDXO3LIBO3TNBHKg%3d%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d22df3b11-630d-4796-bf50-f811b2c381f1">Learn more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="burnout-posters container">
                <div className="row row1">
                    <div className="illustration">
                        <a href="https://www.instagram.com/p/Cj3PLRNtKrF/" target="_blank">
                            <img src="/burnout/poster1.png"/>
                        </a>
                    </div>
                    <div className="content">
                        <h3>Who was your favourite teacher growing up?</h3>
                        <p>
                            What made them your favourite? Did you view them as a superhuman? The one with all the answers? A teaching-machine? 
                        </p>
                        <p>
                            What if we told you they were just as stressed and anxious about that upcoming test as you were? Or that they were also experiencing anxiety and depression? 
                        </p>
                        <p>    
                            We want to show everyone that teachers are not machines, through the lens of machines themselves. We used @openaidalle to envision “classroom stress” and have been sharing the results to create a better dialogue around teacher mental health.
                        </p>
                    </div>
                </div>
                <div className="row row2">
                    <div className="illustration">
                        <a href="https://www.instagram.com/p/CjyFlFoNIwD/" target="_blank">
                            <img src="/burnout/poster2.png"/>
                        </a>
                    </div>
                    <div className="content">
                        <h3>Do #SundayScaries have you feeling anxious and overwhelmed?</h3>
                        <p>
                            This week we’re stress testing AI by asking it to visualize “classroom stress” and have been sharing them here. The result? Artificial, yet a little too real and identifiable to students and teachers.
                        </p>
                    </div>
                </div>
            </div>
            <div className="burnout-follow">
                <a href="https://www.instagram.com/sonderly.io/" target="_blank">
                <div className="grid">
                    <div className="icon">
                        <FiInstagram/>
                    </div>
                    <div className="text">
                        Follow us on Instagram for more content on Mental health
                    </div>
                </div>
                </a>
            </div>
        </Layout>
    )
}

export default Burnout