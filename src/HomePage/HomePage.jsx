const GetFavouritePlaces = (props) => {
    return (
        <div className="location_list">
            {/*LOOP-ITEM:*/}
            <div className="location_entry_wrap">
                <a href="$Link" className="location_entry">
                    {/*<div class="location_entry_image" style="background-image: url($Image.FocusFill(200,200).Url)"></div>*/}
                    <div className="location_entry_image"></div>
                    <div className="location_entry_content">
                        <h2 className="location_title">Title</h2>
                        <h4>Type</h4>
                        <p>Adress</p>
                        <p>0 Experiences</p>
                    </div>

                </a>
            </div>
            {/*LOOP-ITEM-END*/}
        </div>
    );
}

const HomePage = () => {

    const CurrentUser = {
        FirstName: "John",
        LastName: "Doe",
        Email: ""
    };

    return (
        <div className="home-page">
            <div className="section section--textimage">
                <div className="textimage_text">
                    <div className="textimage_text_content">
                        <h2 className="textimage_text_title">Welcome to ExperienceLogger!</h2>
                        <p>A new way to log your experiences</p>
                        <br/>
                        <p>This website is still in progress. There may be dragons</p>
                    </div>
                </div>
            </div>

            <div className="section section--favouriteplaces">
                <div className="section_content">
                        <div className="favouriteplaces_intro">
                            <h2 className="favouriteplaces_intro_title">{CurrentUser.FirstName}'s Favourite places</h2>
                        </div>

                        {GetFavouritePlaces()}
                </div>
            </div>

        </div>
    );
}

export default HomePage;
