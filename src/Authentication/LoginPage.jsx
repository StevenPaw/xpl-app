import React, { useState } from 'react';
import { encode } from "base-64";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (payload) => {

        let url = 'http://localhost/experiencelogger/public/app-api/login';
        let username = payload.Username;
        let password = payload.Password;

        console.log("Username", username);
        console.log("Password", password);
    
        var options = {
            method: 'POST',
            headers: new Headers ({
                'Authorization': 'Basic ' + btoa(username + ":" + password),
                'Content-Type': 'application/json'
            })
        };
    
        let result = fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                console.log("Data", data);
                return data;
            }
        );
        return result;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            Username: email,
            Password: password
        }
        const result = login(payload);
        if(result.status === 200) {
            console.log(result["Content"]);
        } else {
            setError('Login fehlgeschlagen');
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <p>{error}</p>
        </form>
    );
}

const LoginPage = () => {
    return(
        <div className="section section--Login">
            <div className="section_content">
                <div className="section_login">   
                    <p>Hier kommt der Login</p>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}


export default LoginPage;
