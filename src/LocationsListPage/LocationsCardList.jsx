import React from "react";
import LocationsCard from "./LocationsCard";

const LocationsCardList = ( {userPos, filterSettings} ) => {

    const cards = [];

    Object.keys(localStorage).forEach(function(key){
        if(key.startsWith("xpl-location__")) {
            var location = localStorage.getItem(key);
            cards.push(<LocationsCard key={key} userPos={userPos} location={location} filterSettings={filterSettings}/>);
        }
    })

    return (
        <div className="location_list">
            {cards}
        </div>
    )
}

export default LocationsCardList;
