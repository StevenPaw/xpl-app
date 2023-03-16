import React from 'react';
import { getStyledDistance } from '../helpers/Distance';

const ExperienceCard = ( {starturl, baseurl, experience} ) => {

    return (
        <div className="experience_card">
            <a href={starturl + "experience/" + experience.linkTitle} className="experience_entry">
                <div className="experience_entry_image">
                </div>
                <div className="experience_entry_content">
                    <h2 className="experience_title"> {experience.title} </h2>
                    <h4 className="experience_type">{experience.type}</h4>
                    <p className="experience_state">{experience.state}</p>
                    {experience.distance > 0 ? getStyledDistance(experience.distance) : ""}
                </div>
            </a>

            <div className="experience_logging">
                <a className="logging_link notnew" href={starturl + "addLog/" + experience.linkTitle}>

                </a>
                <p className="logcount">0</p>
            </div>
        </div>
    )
}

export default ExperienceCard;
