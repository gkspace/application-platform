import React, { useState } from 'react';
import './JobCard.css';

const JobCard = ({ job, handleApply }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="job-card MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 card-body css-9zecu3">
            <div className="MuiBox-root css-103zer2">
                <div className="MuiBox-root css-ntgrxp">
                    <div className="MuiBox-root css-1ewacfc">
                        <p className="MuiTypography-root MuiTypography-body1 css-9spv16">⏳ Posted 4 days ago</p>
                    </div>
                </div>
            </div>
            <div className="MuiCardContent-root css-1go74o8">
                <div className="MuiBox-root css-1mrd89u">
                    <img className="MuiBox-root css-bj12qo" src={job.logoUrl} alt="logo" />
                    <div className="info-container">
                        <h2 className="MuiBox-root css-rulwqv">{job.companyName}</h2>
                        <h3>{job.jobRole}</h3>
                        <p className="cards-sub-text">{job.location} | Exp: {job.minExp}-{job.maxExp} years</p>
                    </div>
                </div>
                <p className="MuiTypography-root MuiTypography-body2 card-salary css-361mbm">Estimated Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}<span aria-label="Offered salary range" className=""> ✅</span><br /></p>
                <div className="jd-link-container">
                    <div className="hard-lang-container"></div>
                </div>
                <div className="MuiBox-root css-56jvne">
                    <div className="MuiBox-root css-0">
                        <p className="MuiTypography-root MuiTypography-body1 css-1hw7dw8"><strong>About Company:</strong></p>
                        <div className="MuiBox-root css-1m7bgf1">
                            <p><strong>About us</strong></p>

                            <p>
                                {showFullDescription ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.substring(0, 300)}
                                {!showFullDescription && (
                                    <div className="MuiBox-root css-11repv5">
                                        <a className="view job" onClick={toggleDescription}>View job</a>
                                    </div>
                                )}
                            </p>
                        </div>
                        <div className="MuiBox-root css-1m7bgf1">
                            <span><strong>Minimum Experience:</strong> {job.minExp} years</span>
                        </div>
                    </div>
                </div>
                <div className="MuiBox-root css-11repv5">
                    <button className="apply-button" >⚡Apply</button>
                </div>
            </div>
        </div>

    );
};

export default JobCard;
