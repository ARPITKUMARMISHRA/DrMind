import { React } from 'react';
import {
    Box,
    Paper,
    Container,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

import './suggestions.css';

function Suggestions({ percentage }) {
    percentage = Number.parseInt(percentage);
    return (
        <Container component='main' style={{ width: '100%', minWidth: '100px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <section className="sc-services" id='sc-services2'>
                <div className="services-shape">
                    <img src="assets/images/curve-shape-1.png" alt="" />
                </div>
                <div className="container">
                    <div className="services-content">
                        <div className="title-box text-center">
                            <div className="content-wrapper">
                                <h3 className="title-box-name">Suggestions</h3>
                                <div id='seperator' className="title-separator mx-auto"></div>
                            </div>
                        </div>

                        <div className="services-list" style={{ marginTop: '0px', display: 'flex', justifyContent: 'space-evenly' }}>







                            {
                                (percentage >= 60) &&
                                /* Yoga page */
                                <Link to='/yoga' className="services-item">
                                    <div className="item-icon">
                                        <img src="assets/images/service-icon-6.png" alt="service icon" />
                                    </div>
                                    <h5 className="item-title fw-7">Some Tips From Our Side</h5>
                                    <p className="text">Life can be hectic at times hence it is necessary to take a break and look after your health.Yoga,Calisthenics,Hobbies etc can be a good way to relax.</p>
                                </Link>
                            }
                            {
                                (percentage >= 60) &&
                                /* Chat */
                                <Link to='/chat' className="services-item">
                                    <div className="item-icon">
                                        <img src="assets/images/service-icon-3.png" alt="service icon" />
                                    </div>
                                    <h5 className="item-title fw-7">Discuss with them who overcame it</h5>
                                    <p className="text">When it comes to helping someone who is struggling with depression, having a conversation with someone who has already faced and overcome it can be very helpful.</p>
                                </Link>
                            }
                            {
                                (percentage >= 60) &&
                                /* Relax (games) */
                                <Link to='https://www.pixelthoughts.co/' target='_blank' className="services-item">
                                    <div className="item-icon">
                                        <img src="assets/images/service-icon-5.png" alt="service icon" />
                                    </div>
                                    <h5 className="item-title fw-7">Relax your Mind</h5>
                                    <p className="text">Relaxing and chilling your mind can help you reduce stress, anxiety, and promote better mental health.</p>
                                </Link>
                            }

                            {
                                (percentage < 60) &&
                                /* Map */
                                <Link to='/map' className="services-item">
                                    <div className="item-icon">
                                        <img src="assets/images/service-icon-4.png" alt="service icon" />
                                    </div>
                                    <h5 className="item-title fw-7">Find Nearby Health centres</h5>
                                    <p className="text">Mental health centers can provide a range of services and support to help people who are suffering from mental health problems.</p>
                                </Link>
                            }
                            {
                                (percentage < 60) &&
                                /* Chat */
                                <Link to='/chat' className="services-item">
                                    <div className="item-icon">
                                        <img src="assets/images/service-icon-3.png" alt="service icon" />
                                    </div>
                                    <h5 className="item-title fw-7">Discuss with them who overcame it</h5>
                                    <p className="text">When it comes to helping someone who is struggling with depression, having a conversation with someone who has already faced and overcome it can be very helpful.</p>
                                </Link>
                            }








                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
}

export default Suggestions;