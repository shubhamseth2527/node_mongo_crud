import React, {useState} from 'react'
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            method: "post",
            url: "http://localhost:8000/api/users/login",
            data: {
              email,
              password,
            },
        };
        axios(config)
        .then((result) => {
            console.log(result);
            setLogin(true);
        })
        .catch((error) => {
            console.log(error);
            error = new Error();
        })
      }
    return (
        <>
            <h2>Login</h2>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    {/* email */}
                    <Form.Group controlId="formLoginEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"/>
                    </Form.Group>

                    {/* password */}
                    <Form.Group controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" />
                    </Form.Group>

                    {/* submit button */}
                     <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleSubmit(e)}
                        >
                        Login
                    </Button>
                    {/* display success message */}
                    {login ? (
                    <p className="text-success">You Are Logged in Successfully</p>
                    ) : (
                    <p className="text-danger">You Are Not Logged in</p>
                    )}
                </Form>  
        </>
    )
}