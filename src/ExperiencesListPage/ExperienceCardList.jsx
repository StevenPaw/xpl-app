import React from "react";

function ExperienceCardList( {starturl, experienceCards, filterSettings, locationID, userPos, baseurl} ) {



    return (
        <div className="experience_list">
            {experienceCards}
        </div>
    )
}

export default ExperienceCardList;
