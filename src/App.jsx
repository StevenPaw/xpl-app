import React from "react";
import { useState, useEffect } from "react";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ExperiencesListPage from "./ExperiencesListPage/ExperiencesListPage";
import HomePage from "./HomePage/HomePage";
import LocationsListPage from "./LocationsListPage/LocationsListPage";
import ExperiencesDetailPage from "./ExperiencesDetailPage/ExperiencesDetailPage";
import Header from "./Structure/Header";
import Footer from "./Structure/Footer";
import LoginPage from "./Authentication/LoginPage";
import AddLogPage from "./AddLogPage/AddLogPage";
import "./Scss/styles.scss";

const App = () => {

    const starturl = "/";
    const baseurl = "https://experiencelogger.sp-universe.com/";
    const isOnline = navigator.onLine;

    const [userPos, setUserPos] = useState("");
    const activeLink = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

    const updateData = () => {
        fetch(baseurl + "api/v1/App-ExperienceDatabase-ExperienceLocation.json")
        .then((response) => response.json())
        .then((data) => {

            const locations = data.items;

            locations.forEach((location) => {
                localStorage.setItem("xpl-location__" + location.LinkTitle, JSON.stringify(location));
            });
            console.log("Locations updated", locations);
        });

        fetch(baseurl + "app-api/experiences")
            .then((response) => response.json())
            .then((data) => {
                const experiences = data.items;

                experiences.forEach((experience) => {
                    localStorage.setItem("xpl-experience__" + experience.LinkTitle, JSON.stringify(experience));
                });
                console.log("Experiences updated", experiences);
        });
        localStorage.setItem("data-updated", Date.now());
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const Lat = position.coords.latitude;
                const Lon = position.coords.longitude;

                setUserPos(
                    {
                        Lat,
                        Lon
                    }
                );
                console.log("User Position set: " + position.coords.latitude + ", " + position.coords.longitude);
            });
        }

        if(isOnline) {
            //updateLogs();
            //If the user is online, check if the data is up to date
            if (localStorage.getItem("data-updated") == null || localStorage.getItem("data-updated") < Date.now() - 360000) {
                updateData();
            } else {
                console.log("Data is up to date");
            }
        }

    }, [baseurl, isOnline]);

    const router = createBrowserRouter([
        {
          path: starturl,
          element: <HomePage starturl={starturl}/>,
        },
        {
            path: starturl + "places/",
            element: <LocationsListPage starturl={starturl} userPos={userPos}/>,
        },
        {
            path: starturl + "login/",
            element: <LoginPage starturl={starturl} baseurl={baseurl}/>,
        },
        {
            path: starturl + "addLog/:linkTitle",
            element: <AddLogPage starturl={starturl} baseurl={baseurl}/>,
        },
        {
            path: starturl + "places/:linkTitle",
            element: <ExperiencesListPage starturl={starturl} userPos={userPos} baseurl={baseurl}/>,
        },
        {
            path: starturl + "experience/:linkTitle",
            element: <ExperiencesDetailPage starturl={starturl} userPos={userPos} baseurl={baseurl}/>,
        },
    ]);

    return (
        <div>
            <Header starturl={starturl} baseurl={baseurl} />
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
            <Footer starturl={starturl} baseurl={baseurl} activeLink={activeLink} />
        </div>
    );
}

export default App;
