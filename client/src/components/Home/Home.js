import React from 'react';
import Navbar from '../Navbar/Navbar';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            {/* Owl Carousel */}
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g==" crossOrigin="anonymous" referrerPolicy="no-referrer" /> */}
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" integrity="sha512-sMXtMNL1zRzolHYKEujM2AqCLUR9F2C4/05cdbxjjLSRvMQIciEPCQZo++nk7go3BtSuK9kfa/s+a4f4i5pLkw==" crossOrigin="anonymous" referrerPolicy="no-referrer" /> */}


            <div className="page-wrapper">
                {/* header */}
                <header className="header">
                    <Navbar />

                    <div className="element-one">
                        <img src="assets/images/element-img-1.png" alt="" />
                    </div>

                    <div className="banner">
                        <div className="container">
                            <div className="banner-content">
                                <div className="banner-left">
                                    <div className="content-wrapper">
                                        <h1 className="banner-title">You may be Fit<br />but is your Mind?</h1>
                                        <p className="text text-white">Mental health conditions, such as depression or anxiety, are real, common and treatable, and recovery is possible.</p>
                                        <Link to="/quiz" className="btn btn-secondary">Get Started</Link>
                                    </div>
                                </div>

                                <div className="banner-right d-flex align-items-center justify-content-end">
                                    <img src="assets/images/banner-image.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* end of header */}

                <main>
                    <section className="sc-services">
                        <div className="services-shape">
                            <img src="assets/images/curve-shape-1.png" alt="" />
                        </div>
                        <div className="container">
                            <div className="services-content">
                                <div className="title-box text-center">
                                    <div className="content-wrapper">
                                        <h3 className="title-box-name">Our Services</h3>
                                        <div className="title-separator mx-auto"></div>
                                        <p className="text title-box-text">We are here to help you prioritize your health and well-being. Whether you're seeking information, advice, or services, our goal is to support you in achieving optimal mental health and relaxation. Let us guide you towards a healthier mind and lifestyle, and remember that taking care of yourself is always worth it.</p>
                                    </div>
                                </div>

                                <div className="services-list">
                                    <div className="services-item">
                                        <div className="item-icon">
                                            <img src="assets/images/service-icon-3.png" alt="service icon" />
                                        </div>
                                        <h5 className="item-title fw-7">Assess your Mental Health</h5>
                                        <p className="text">Online screening is one of the quickest and easiest ways to determine whether you are experiencing symptoms of a mental health condition.</p>
                                    </div>

                                    <div className="services-item">
                                        <div className="item-icon">
                                            <img src="assets/images/service-icon-2.png" alt="service icon" />
                                        </div>
                                        <h5 className="item-title fw-7">Consult Experts</h5>
                                        <p className="text">A mental health expert (such as a doctor or a therapist) can give you a full assessment and talk to you about options for how to feel better.</p>
                                    </div>

                                    <div className="services-item">
                                        <div className="item-icon">
                                            <img src="assets/images/service-icon-3.png" alt="service icon" />
                                        </div>
                                        <h5 className="item-title fw-7">Discuss with them who overcame it</h5>
                                        <p className="text">When it comes to helping someone who is struggling with depression, having a conversation with someone who has already faced and overcome it can be very helpful.</p>
                                    </div>

                                    <div className="services-item">
                                        <div className="item-icon">
                                            <img src="assets/images/service-icon-4.png" alt="service icon" />
                                        </div>
                                        <h5 className="item-title fw-7">Find Nearby Health centres</h5>
                                        <p className="text">Mental health centers can provide a range of services and support to help people who are suffering from mental health problems.</p>
                                    </div>

                                    <div className="services-item">
                                        <div className="item-icon">
                                            <img src="assets/images/service-icon-5.png" alt="service icon" />
                                        </div>
                                        <h5 className="item-title fw-7">Relax your Mind</h5>
                                        <p className="text">Relaxing and chilling your mind can help you reduce stress, anxiety, and promote better mental health.</p>
                                    </div>

                                    <div className="services-item">
                                        <div className="item-icon">
                                            <img src="assets/images/service-icon-6.png" alt="service icon" />
                                        </div>
                                        <h5 className="item-title fw-7">Some Tips From Our Side</h5>
                                        <p className="text">Life can be hectic at times hence it is necessary to take a break and look after your health.Yoga,Calisthenics,Hobbies etc can be a good way to relax.</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </section>





                    <section className="sc-feedback">
                        <div className="container">
                            <div className="feedback-content">
                                <div className="feedback-element">
                                    <img src="assets/images/element-img-3.png" />
                                </div>
                                <div className="feedback-element-2">
                                    <img src="assets/images/element-img-5.png" />
                                </div>
                                <div className="title-box text-center">
                                    <div className="content-wrapper">
                                        <h3 className="title-box-name text-white">Feeling troubled? Here are some Helpline Numbers</h3>
                                        <div className="title-separator mx-auto"></div>
                                    </div>
                                </div>
                                <div className="feedback-list feedback-slider owl-carousel owl-theme">
                                    <div className="feedback-item d-grid">
                                        <div className="item-left d-flex align-items-center">

                                            <div className="item-info text-white">
                                                <p className="fw-7 name">National Institute of Mental Health and Neuro-Sciences (NIMHANS)</p>
                                                <span className="designation fw-4">Helpline - 080-4611 0007</span>
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            <p className="text text-white">"It was established in 1925 as a mental hospital, and later evolved into a comprehensive center for patient care, academic training, and research in the fields of mental health and neuroscience."</p>
                                        </div>
                                    </div>

                                    <div className="feedback-item d-grid">
                                        <div className="item-left d-flex align-items-center">

                                            <div className="item-info text-white">
                                                <p className="fw-7 name">Vandrevala Foundation Helpline</p>
                                                <span className="designation fw-4">Helpline - 1800-2333-330</span>
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            <p className="text text-white">"The helpline provides free and confidential telephonic counseling services to individuals who are struggling with mental health issues, such as anxiety, depression, stress, and relationship problems."</p>
                                        </div>
                                    </div>

                                    <div className="feedback-item d-grid">
                                        <div className="item-left d-flex align-items-center">

                                            <div className="item-info text-white">
                                                <p className="fw-7 name">Sneha Foundation India</p>
                                                <span className="designation fw-4">Helpline - +91-44-2464-0050</span>
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            <p className="text text-white">"The helpline is staffed by trained volunteers who provide emotional support and crisis intervention to callers who are experiencing distress, loneliness, or suicidal thoughts."</p>
                                        </div>
                                    </div>

                                    <div className="feedback-item d-grid">
                                        <div className="item-left d-flex align-items-center">

                                            <div className="item-info text-white">
                                                <p className="fw-7 name">The International Association for Suicide Prevention (IASP)</p>
                                                <span className="designation fw-4"><Link to="https://www.iasp.info/resources/Crisis_Centres/" target="_blank">Visit their Site</Link></span>
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            <p className="text text-white">"The International Association for Suicide Prevention (IASP) is a global organization dedicated to preventing suicide and promoting mental health. It was founded in 1960 and is the only international organization of its kind, with members from over 70 countries."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                <footer className="footer">
                    <div className="container">
                        <div className="footer-content">
                            <div className="footer-list d-grid text-white">
                                <div className="footer-item">
                                    <Link to="#" className="navbar-brand d-flex align-items-center">
                                        {/* <span className="brand-shape d-inline-block text-white">M</span> */}
                                        <span className="brand-text fw-7">DrMind</span>
                                    </Link>
                                    <p className="text-white">DrMind provides a calm and relaxed way to free people from mental issues plaguing them.</p>

                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="footer-element-1">
                        <img src="assets/images/element-img-4.png" alt="" />
                    </div>
                    <div className="footer-element-2">
                        <img src="assets/images/element-img-5.png" alt="" />
                    </div>
                </footer>
            </div>





            {/* jquery cdn */}
            {/* <script src="https://code.jquery.com/jquery-3.6.4.js" integrity="sha256-a9jBBRygX1Bh5lt8GZjXDzyOB+bWve9EiO7tROUtj/E=" crossOrigin="anonymous"></script> */}
            {/* owl carousel */}
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script> */}
            {/* custom js */}
            {/* <script src="./script.js"></script> */}
        </>
    );
}

export default Home;