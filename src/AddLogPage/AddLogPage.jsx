import { useState } from "react";
import { useParams } from 'react-router-dom';
import { ReactComponent as XPLLoadingIcon } from "../icons/XPLLoadingIcon.svg";

const AddLogForm = ( {starturl, baseurl, linkTitle} ) => {
    

    const [conditions, setConditions] = useState({
        "sunny": false,
        "cloudy": false,
        "rainy": false,
        "foggy": false,
        "snowy": false,
        "windy": false,
        "night": false,
        "breakdown": false,
    });
    const [seat, setSeat] = useState('');
    const [error, setError] = useState('');
    const [variant, setVariant] = useState('');
    const [score, setScore] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    async function addlog (url, payload) 
    {
        var options = {
            method: "POST",
            body: JSON.stringify(payload)
        };

        const response = await fetch(url, options);
        const content = await response.json();
        return content;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Link", linkTitle);

        const payload = {
            Conditions: conditions,
            Seat: seat,
            Variant: variant,
            Score: score,
            Comment: comment,
            Date : new Date(),
        }
        const result = addlog('http://localhost/experiencelogger/public/app-api/addLog/' + linkTitle, payload)
            .then(
                (result) => {
                    if (result["Status"]) {
                        console.log(result);
                        setError("Log finished");
                    } else {
                        let response = result["Content"];
                        if(response) {
                            setError("ERROR: " . response);
                        } else {
                            setError("ERROR: Unknown error");
                        }
                    }
                }
            );
    }

    const RenderXPLLogo = () => {
        if(loading){
            return (
                <div className="xpl_logo" data-behaviour="addlog_loading">
                    <XPLLoadingIcon />
                </div>
            );
        }
    }

    const RenderSeat = () => {
        return (
            <div className="group_entry">
                <p>Seat</p>
                <select id="seat" value={seat} onChange={e => setSeat(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
            </div>
        )
    }

    const RenderConditions = () => {
        return (
            <form-group class="logging_group">
                <div className="group_entry">
                    <label htmlFor="sunny">
                        <svg width="100%" height="100%" viewBox="0 0 48 48"><path fill="currentColor" d="M22.5 9.5V2h3v7.5Zm12.8 5.3-2.1-2.1 5.3-5.35 2.1 2.15Zm3.2 10.7v-3H46v3ZM22.5 46v-7.5h3V46Zm-9.85-31.25L7.4 9.5l2.1-2.1 5.3 5.3Zm25.9 25.85-5.35-5.3 2.05-2.05 5.4 5.2ZM2 25.5v-3h7.5v3Zm7.55 15.1L7.4 38.5l5.25-5.25 1.1 1 1.1 1.05ZM24 36q-5 0-8.5-3.5T12 24q0-5 3.5-8.5T24 12q5 0 8.5 3.5T36 24q0 5-3.5 8.5T24 36Z"/></svg>
                        <p>Sunny</p>
                    </label>
                    <input type="checkbox" id="sunny" name="weather[]" checked={conditions["sunny"]} onChange={e => {setConditions({...conditions, "sunny": e.target.checked});}}/>
                </div>
                <div className="group_entry">
                    <label htmlFor="cloudy">
                        <svg width="100%" height="100%" viewBox="0 0 48 48"><path fill="currentColor" d="M12.55 40q-4.4 0-7.475-3.075Q2 33.85 2 29.45q0-3.9 2.5-6.85 2.5-2.95 6.35-3.55 1-4.85 4.7-7.925T24.1 8.05q5.6 0 9.45 4.075Q37.4 16.2 37.4 21.9v1.2q3.6-.1 6.1 2.325Q46 27.85 46 31.55q0 3.45-2.5 5.95T37.55 40Z"/></svg>
                        <p>Cloudy</p>
                    </label>
                    <input type="checkbox" id="cloudy" name="weather[]" checked={conditions["cloudy"]} onChange={e => {setConditions({...conditions, "cloudy": e.target.checked});}}/>
                </div>
                <div className="group_entry">
                    <label htmlFor="rainy">
                        <svg width="100%" height="100%" viewBox="0 0 48 48"><path fill="currentColor" d="M27.9 43.85q-.55.25-1.175.05t-.875-.75l-3.45-6.9q-.25-.55-.075-1.175t.725-.875q.55-.25 1.175-.05t.875.75l3.45 6.9q.25.55.075 1.175t-.725.875Zm12-.05q-.55.25-1.175.05t-.875-.75l-3.45-6.9q-.25-.55-.075-1.175t.725-.875q.55-.25 1.175-.05t.875.75l3.45 6.9q.25.55.075 1.175t-.725.875Zm-24 0q-.55.25-1.175.075t-.875-.725l-3.45-6.9q-.25-.55-.05-1.175t.75-.875q.55-.25 1.175-.075t.875.725l3.45 6.95q.25.55.05 1.15-.2.6-.75.85ZM14.5 31q-4.35 0-7.425-3.075T4 20.5q0-3.95 2.825-7.05 2.825-3.1 7.025-3.4 1.6-2.8 4.225-4.425Q20.7 4 24 4q4.55 0 7.625 2.875T35.4 14q3.95.2 6.275 2.675Q44 19.15 44 22.5q0 3.5-2.475 6T35.5 31Z"/></svg>
                        <p>Rainy</p>
                    </label>
                    <input type="checkbox" id="rainy" name="weather[]" checked={conditions["rainy"]} onChange={e => {setConditions({...conditions, "rainy": e.target.checked});}}/>
                </div>
                <div className="group_entry">
                    <label htmlFor="foggy">
                        <svg width="100%" height="100%" viewBox="0 0 48 48"><path fill="currentColor" d="M36 37.75q-.7 0-1.225-.525Q34.25 36.7 34.25 36q0-.7.525-1.225.525-.525 1.225-.525.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225-.525.525-1.225.525ZM14 44q-.7 0-1.225-.525-.525-.525-.525-1.225 0-.7.525-1.225Q13.3 40.5 14 40.5q.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225Q14.7 44 14 44Zm-2-6.25q-.7 0-1.225-.525Q10.25 36.7 10.25 36q0-.7.525-1.225.525-.525 1.225-.525h18q.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225-.525.525-1.225.525ZM20 44q-.7 0-1.225-.525-.525-.525-.525-1.225 0-.7.525-1.225Q19.3 40.5 20 40.5h14q.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225Q34.7 44 34 44Zm-5.5-13q-4.35 0-7.425-3.075T4 20.5q0-3.95 2.825-7.05 2.825-3.1 7.025-3.4 1.6-2.8 4.225-4.425Q20.7 4 24 4q4.55 0 7.625 2.875T35.4 14q3.95.2 6.275 2.675Q44 19.15 44 22.5q0 3.5-2.475 6T35.5 31Z"/></svg>
                        <p>Foggy</p>
                    </label>
                    <input type="checkbox" id="foggy" name="weather[]" checked={conditions["foggy"]} onChange={e => {setConditions({...conditions, "foggy": e.target.checked});}}/>
                </div>
                <div className="group_entry">
                    <label htmlFor="snowy">
                        <svg width="100%" height="100%" viewBox="0 0 48 48"><path fill="currentColor" d="M12 38q-.7 0-1.225-.525-.525-.525-.525-1.225 0-.7.525-1.225Q11.3 34.5 12 34.5q.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225Q12.7 38 12 38Zm24 0q-.7 0-1.225-.525-.525-.525-.525-1.225 0-.7.525-1.225Q35.3 34.5 36 34.5q.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225Q36.7 38 36 38Zm-18 8q-.7 0-1.225-.525-.525-.525-.525-1.225 0-.7.525-1.225Q17.3 42.5 18 42.5q.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225Q18.7 46 18 46Zm6-8q-.7 0-1.225-.525-.525-.525-.525-1.225 0-.7.525-1.225Q23.3 34.5 24 34.5q.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225Q24.7 38 24 38Zm6 8q-.7 0-1.225-.525-.525-.525-.525-1.225 0-.7.525-1.225Q29.3 42.5 30 42.5q.7 0 1.225.525.525.525.525 1.225 0 .7-.525 1.225Q30.7 46 30 46ZM14.5 31q-4.35 0-7.425-3.075T4 20.5q0-3.95 2.825-7.05 2.825-3.1 7.025-3.4 1.6-2.8 4.225-4.425Q20.7 4 24 4q4.55 0 7.625 2.875T35.4 14q3.95.2 6.275 2.675Q44 19.15 44 22.5q0 3.5-2.475 6T35.5 31Z"/></svg>
                        <p>Snowy</p>
                    </label>
                    <input type="checkbox" id="snowy" name="weather[]" checked={conditions["snowy"]} onChange={e => {setConditions({...conditions, "snowy": e.target.checked});}}/>
                </div>
                <div className="group_entry">
                    <label htmlFor="windy">
                        <svg width="100%" height="100%" viewBox="0 0 48 48"><path fill="currentColor" d="M23.25 40q-2.7 0-4.275-1.4-1.575-1.4-1.575-4.25h3.4q0 1.3.575 1.975T23.25 37q1.35 0 1.925-.6t.575-2.05q0-1.45-.575-2.125t-1.925-.675H4v-3h19.25q2.7 0 4.1 1.4 1.4 1.4 1.4 4.4 0 2.85-1.4 4.25t-4.1 1.4ZM4 19.6v-3h27.4q1.85 0 2.7-.875.85-.875.85-2.925t-.85-2.925Q33.25 9 31.4 9q-1.9 0-2.75 1.025-.85 1.025-.85 2.575h-3q0-2.9 1.75-4.75T31.4 6q3.05 0 4.8 1.775t1.75 5.025q0 3.25-1.75 5.025-1.75 1.775-4.8 1.775Zm33.6 16.5v-3q1.75 0 2.575-.975Q41 31.15 41 29.3q0-1.9-.925-2.75-.925-.85-2.675-.85H4v-3h33.4q3.1 0 4.85 1.75Q44 26.2 44 29.3q0 3.2-1.65 5-1.65 1.8-4.75 1.8Z"/></svg>
                        <p>Windy</p>
                    </label>
                    <input type="checkbox" id="windy" name="weather[]" checked={conditions["windy"]} onChange={e => {setConditions({...conditions, "windy": e.target.checked});}}/>
                </div>
                <div className="group_entry">
                    <label htmlFor="night">
                    <svg height="100%" width="100%" viewBox="0 0 48 48"><path fill="currentColor" d="M12 27.5q2.55 0 4.675 1.375T19.8 32.65l.35.85h.95q2.25 0 3.825 1.6Q26.5 36.7 26.5 39t-1.625 3.9Q23.25 44.5 21 44.5h-9q-3.5 0-6-2.5t-2.5-6q0-3.55 2.5-6.025Q8.5 27.5 12 27.5ZM22.5 6q-.9 4.9.55 9.625 1.45 4.725 5 8.275 3.55 3.55 8.275 5.025Q41.05 30.4 46 29.5q-1.3 7.2-6.9 11.85Q33.5 46 26.2 46h-.4q1.75-1.2 2.725-3.05.975-1.85.975-3.95 0-3.3-2.1-5.65-2.1-2.35-5.25-2.75-1.5-2.8-4.2-4.45-2.7-1.65-5.95-1.65-1.6 0-3.125.425T6 26.2v-.4q0-7.3 4.65-12.875T22.5 6Z"/></svg>
                        <p>Night</p>
                    </label>
                    <input type="checkbox" id="night" name="weather[]" checked={conditions["night"]} onChange={e => {setConditions({...conditions, "night": e.target.checked});}}/>
                </div>
                <div className="group_entry">
                    <label htmlFor="breakdown">
                    <svg height="100%" width="100%" viewBox="0 0 48 48"><path fill="currentColor" d="M18 24.15V16H8q0-4.15 2.925-7.075T18 6h12v7.1L37 6h3v17.2h-3l-7-7.1v8.05ZM19.7 42q-.8 0-1.25-.675Q18 40.65 18 39.8V27.15h12V39.8q0 .9-.65 1.55T27.8 42Z"/></svg>
                        <p>Breakdown</p>
                    </label>
                    <input type="checkbox" id="breakdown" name="weather[]" checked={conditions["breakdown"]} onChange={e => {setConditions({...conditions, "breakdown": e.target.checked});}}/>
                </div>
            </form-group>
        );
    }

    const RenderVariant = () => {
        return (
            <select name="variant" id="variant" onChange={e => setVariant(e.target.value)}>
                <option value="-1">Select a Variant</option>
                <option value="Variant A">Variant A</option>
                <option value="Variant B">Variant B</option>
            </select>
        );
    }

    const RenderVersion = () => {

        return (
            <select name="version" id="version">
                <option value="-1">Select a Version</option>
                <option value="Version 1">Version 1</option>
                <option value="Version 2">Version 2</option>
            </select>
        );
    }


    return (
        <form onSubmit={handleSubmit} className="logging_form">
            <h2>Weather Condition</h2>
            <RenderConditions/>
            <h2>Seat</h2>
            <RenderSeat />

            <h2>Variant</h2>
            <form-group class="logging_group">
                <RenderVariant/>
                <RenderVersion/>
            </form-group>

            <h2>Score</h2>
            <form-group class="logging_group">
                <p>Score</p>
            </form-group>
            <h2>Notes</h2>
            <form-group class="logging_group">
                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes"></textarea>
            </form-group>

            <input data-behaviour="addlog_button" type="submit"/>
            <RenderXPLLogo/>
            <p>{error}</p>
        </form>
    );
}

const AddLogPage = ( {baseurl, starturl } ) => {
    const { linkTitle } = useParams();

    return (
        <div className="section section--loggingform">
            <div className="section_content">
                <h1>Adding Log for {linkTitle}!</h1>
                <AddLogForm linkTitle={linkTitle}/>
            </div>
        </div>
    );
}

export default AddLogPage;
