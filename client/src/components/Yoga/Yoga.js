import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import './yoga.css';
import Navbar from '../Navbar/Navbar';

// Component that bring something into view
const AlwaysScrollToTop = () => {
    const ref = useRef();
    useEffect(() => ref.current.scrollIntoView({ behavior: 'instant' }));
    return <div ref={ref} />;
};

function Yoga() {
    return (
        <>
            <AlwaysScrollToTop />
            <Navbar />
            <YogaContainer>
                <div id="home" className="back">
                    <div className="mian-home">
                        <div className="inner-home">
                            <img src="assets/images/for bg.png" alt="" />
                        </div>

                        <div className="inner-home">
                            <div className="inner-content">
                                <h1>Some Mental Health Tips</h1>
                                <p>Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make healthy choices.Here's a quick link of the article on how to keep up good mental health. Have a look!</p>
                                <a href="https://www.cdc.gov/mentalhealth/learn/index.htm#:~:text=What%20is%20mental%20health%3F,1">Read Article</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="our-classes">

                    <h1>Yoga Asanas</h1>

                    <div className="main-class">
                        <div className="inner-class">
                            <img src="assets/images/class1.jpg" alt="" />
                            <div className="class-content">
                                <h2>Sukhasana</h2>
                                <p>It's the traditional meditative position of sitting on the floor with crossed legs and an upright spine.</p>
                                <a href="https://youtu.be/ri9B8IzLXIY">Watch Tutorial</a>
                            </div>
                        </div>

                        <div className="inner-class">
                            <img src="assets/images/class2.jpeg" alt="" />
                            <div className="class-content">
                                <h2>Balasana</h2>
                                <p>Child's pose is one of the most relaxing and soothing positions in yoga. You may relax and unwind here since you're completely grounded</p>
                                <a href="https://youtu.be/2MJGg-dUKh0">Watch Tutorial</a>
                            </div>
                        </div>

                        <div className="inner-class">
                            <img src="assets/images/class3.jpeg" alt="" />
                            <div className="class-content">
                                <h2>Salamba Sarvangasana</h2>
                                <p>Another great yoga practise for anxiety and depression relief is shoulderstand. Shoulderstand, like downward-facing dog, enhances blood flow to the brain, improving mental clarity and regulating feelings.</p>
                                <a href="https://youtu.be/g3wvIPXZ-Qo">Watch Tutorial</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="our-instructor">
                    <h1>Some More Tips</h1>
                    <br />
                    <br />
                    <div className="main-instructor">
                        <div className="inner-instructor">
                            <div className="inner-content-instructor">
                                <h2>Connect With <br /> Other People</h2>
                                <br />
                                <h3>Good relationships are important for your mental wellbeing.</h3>
                                <h3>They Can:</h3>
                                <br />
                                <ul>
                                    <li>help you to build a sense of belonging and self-worth</li>
                                    <li>give you an opportunity to share positive experiences</li>
                                    <li>provide emotional support and allow you to support others</li>
                                </ul>

                            </div>
                        </div>

                        <div className="inner-instructor">
                            <img src="assets/images/Instructer.jpeg" alt="" />
                        </div>
                    </div>
                </div>



                <div className="our-instructor">
                    <div className="main-instructor">

                        <div className="inner-instructor">
                            <img src="assets/images/new experience.jpeg" alt="" />
                        </div>

                        <div className="inner-instructor">
                            <div className="inner-content-instructor">
                                <h2>Learn <br />new skills</h2>
                                <br />
                                <h3>Research shows that learning new skills can also improve your mental wellbeing by: </h3>
                                <br />
                                <ul>
                                    <li>boosting self-confidence and raising self-esteem</li>
                                    <li>helping you to build a sense of purpose</li>
                                    <li>helping you to build a sense of purpose</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>



                <div className="our-instructor">

                    <br />
                    <br />
                    <div className="main-instructor">
                        <div className="inner-instructor">
                            <div className="inner-content-instructor">
                                <h2> Pay attention to the present moment (mindfulness)</h2>
                                <br />
                                <h3>Paying more attention to the present moment can improve your mental wellbeing. </h3>

                                <br />
                                <ul>
                                    <li> This includes your thoughts and feelings, your body and the world around you.</li>
                                    <li>Mindfulness can help you enjoy life more and understand yourself better.</li>
                                    <li>It can positively change the way you feel about life and how you approach challenges.</li>
                                </ul>

                            </div>
                        </div>

                        <div className="inner-instructor">
                            <img src="assets/images/mindfullness.jpeg" alt="" />
                        </div>
                    </div>
                </div>


                <br />
                <br />
                <br />
                <br />

                <div className="our-gallery">
                    <h1>Mental Health is not a destination, but a process. Its about how you drive, not where you're going...</h1>
                    <div className="main-gallery">
                        <div className="inner-gallery">
                            <img src="assets/images/gallery1.jpg" alt="" />
                        </div>

                        <div className="inner-gallery">
                            <img src="assets/images/gallery2.jpg" alt="" />
                        </div>

                        <div className="inner-gallery">
                            <img src="assets/images/gallery3.jpg" alt="" />
                        </div>

                        <div className="inner-gallery">
                            <img src="assets/images/gallery4.jpg" alt="" />
                        </div>

                        <div className="inner-gallery">
                            <img src="assets/images/gallery5.jpg" alt="" />
                        </div>

                        <div className="inner-gallery">
                            <img src="assets/images/gallery6.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </YogaContainer>
        </>
    );
};



const YogaContainer = styled.div`
    line-height: 1.2;
    margin: 0;
    padding: 0;
    transition: all .2s;
    text-transform: capitalize;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    outline: none;

    html {
        font-size: 62.5%;
    }

    #logo {
        color: black;
        font-size: 2.50px;
    }

    .icon div {
        margin-left: 15px;
        font-size: 20px;
        cursor: pointer;
    }

    .icon div:hover {
        color: orange;
    }

    #menubar {
        display: none;
    }

    .search-form {
        position: absolute;
        top: 100%;
        left: -100%;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        background: var(--mainclr);
        transition: .5s;
    }

    .search-form.active {
        left: 0;
    }

    .inner-form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 80%;
        input {
            padding: 15px;
            width: 100%;
            border: none;
            background: transparent;
            border-bottom: 2px solid black;
            color: white;
            margin-top: 10px;
        }
        input::placeholder {
            color: white;
        }
    }

    .searchbar {
        position: absolute;
        width: 100%;
        height: 100vh;
        left: -100%;
        right: 0;
        top: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--mainclr);
        transition: .5s;
        .active {
            left: 0;
        }
    }

    .inner-searchbar {
        width: 80%;
        input {
            border: none;
            padding: 15px;
            width: 80%;
            background: transparent;
            border-bottom: 2px solid black;
            color: white;
        }
        input::placeholder {
            color: white;
        }
    }

    .back {
        padding: 30px 7%;
    }

    .mian-home {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 6%;
    }

    .inner-home {
        flex: 1 1 425px;
        text-align: center;
        display: flex;
        justify-content: center;
        img {
            width: 100%;
        }
        @media (max-width:1025px) {
            img {
                width:60%;
            }
        }
    }

    .inner-content {
        h1 {
            color: var(--mainclr);
            font-size: 80px;
            margin-bottom: 10px;
        }

        p {
            font-size: 15px;
            color: black;
            margin-bottom: 20px;
            padding: 0 60px;
            line-height: 1.5;
        }

        a {
            padding: 10px 40px;
            background: var(--mainclr);
            color: white;
            font-size: 15px;
            border-radius: 15px;
        }
    }

    .our-classes {
        padding: 60px 7%;
        background: var(--mainclr);
        h1 {
            text-align: center;
            color: white;
            font-size: 30px;
            margin-bottom: 20px;
        }
    }

    .main-class {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 50px;

    }

    .inner-class {
        flex: 1 1 300px;
        text-align: center;
        img {
            width: 90%;
            max-width: 560px;
            margin: auto;
        }
    }


    .class-content {
        h2 {
            color: white;
            font-size: 25px;
            margin: 20px 0;
        }

        p {
            color: white;
            font-size: 15px;
            margin-bottom: 25px;
            line-height: 1.2;
            font-weight: 400;
        }

        a {
            background: white;
            font-size: 15px;
            color: black;
            border-radius: 15px;
            padding: 10px 30px;
            margin: 15px 0;
            font-weight: 400;
        }
    }

    .our-instructor {
        padding: 40px 7%;
        background-color: var(--secondclr);
        h1 {
            color: black;
            font-size: 30px;
            text-align: center;
            margin-bottom: 25px;
        }
    }

    .main-instructor {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }

    .inner-instructor {
        flex: 1 1 450px;
        img {
            width: 100%;
        }
    }

    .inner-content-instructor {
        width: 81%;
        margin: 0 auto;
        font-size: 15px;
        h2 {
            font-size: 60px;
            color: black;
        }
        p {
            color: black;
            font-size: 15px;
            margin-top: 15px;
            margin-bottom: 20px;
        }
        a {
            color: black;
            background: var(--mainclr);
            padding: 10px 30px;
            border-radius: 15px;
            font-size: 15px;
        }
        ul {
            list-style-type: unset;
        }
    }


    .our-gallery {
        padding: 40px 7%;
        background: var(--mainclr);
        h1 {
            font-size: 30px;
            text-align: center;
            color: black;
            margin-bottom: 20px;
        }
    }

    .main-gallery {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .inner-gallery {
        flex: 1 1 300px;
        img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            transition: 1s;
        }
        img:hover {
            transform: scale(1.1) rotate(20deg);
            border-radius: 15px;
        }
    }

    .our-prices {
        padding: 50px 7%;
        background: var(--secondclr);
        h1 {
            font-size: 30px;
            text-align: center;
            margin-bottom: 20px;
        }
    }

    .main-prices {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 100px;
    }

    .inner-prices {
        flex: 1 1 300px;
        padding: 40px 10px;
        background: white;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        h2 {
            font-size: 25px;
            color: var(--mainclr);
            margin-bottom: 15px;
        }
        h3 {
            font-size: 20px;
            color: var(--mainclr);
            margin-bottom: 15px;
        }
    }

    .price-icon {
        i {
            font-size: 80px;
            margin-bottom: 25px;
            color: var(--mainclr);
        }
    }

    .inner-prices {
        a {
            padding: 10px 30px;
            background: var(--mainclr);
            font-size: 1.50px;
            color: black;
            border-radius: 15px;
        }
    }

    .contact-us {
        padding: 60px 7%;
        background: var(--mainclr);
    }

    .main-contact {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
    }

    .inner-contact {
        flex: 1 1 450px;
        h1 {
            font-size: 50px;
            color: black;
        }
    }

    .inner-form-contact {
        display: flex;
        justify-content: center;
        flex-direction: column;
        input {
            padding: 10px;
            margin: 10px;
            background: transparent;
            border: 1px solid white;
        }
        textarea {
            padding: 10px;
            margin: 10px;
            background: transparent;
            border: 1px solid white;
        }
    }

    .inner-contact {
        img {
            width: 100%;
        }
    }






    @media (max-width:767px) {
        html {
            font-size: 55%;
        }

        #menubar {
            display: initial;
        }

        .inner-content {
            h1 {
                font-size: 40px;
            }
            p {
                padding: 0 10px;
            }
        }

        .mian-home {
            margin-top: 7%;
        }

        .inner-home {
            img {
                margin-top: 25px;
            }
        }

        .inner-instructor {
            img {
                margin-top: 15px;
            }
        }

        .searchbar {
            width: 100%;
        }

        .inner-searchbar {
            width: 100%;
            margin-left: 20px;
            input {
                width: 90%;
                margin: 0 auto;
            }
        }
    }
`;

export default Yoga;