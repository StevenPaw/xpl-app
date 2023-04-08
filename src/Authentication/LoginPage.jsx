import React, { useState } from 'react';

const login = (url, payload) => {
    var _headers = {
        headers: {
            "Content-type" : "application/json;charset=utf-8"
        },
        body: JSON.stringify(payload)
    };

    let result = fetch(url, _headers);
    console.log(result);
    if(result.status === 200) {
        return result;
    }
}

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            uname: email,
            password: password
        }
        const result = login('http://localhost/experiencelogger/public/app-api/login', payload);
        if(result.status === 200) {
            console.log(result);
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
