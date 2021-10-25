import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
//import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
//import { register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import axios from "axios";

function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    //const dispatch = useDispatch();

    //const userRegister = useSelector((state) => state.userRegister);
    //const { loading, error, userInfo } = userRegister;

    const postDetails = (pics) => {
        if (
            pics ===
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        ) {
            return setPicMessage("Please Select an Image");
        }
        setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "mingleapp")
            data.append("cloud_name", "arifinsta")
            fetch("https://api.cloudinary.com/v1_1/arifinsta/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setPicMessage("Please Select an Image");
        }
    };

    //   useEffect(() => {
    //     if (userInfo) {
    //       history.push("/");
    //     }
    //   }, [history, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email)
        if (password !== confirmpassword) {
            setMessage("Passwords do not match");
        } else
            //dispatch(register(name, email, password, pic));
            //alert('wrong')
            setMessage(null)
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            setLoading(true)
            const { data } = await axios.post('/api/users', {
                email,
                password,
                name,
                pic
            },
                config
            );
            console.log(data)
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }
    };

    return (
        <MainScreen title="REGISTER">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmpassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    {picMessage && (
                        <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                    )}
                    {/* <Form.Group controlId="pic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.File
                            //onChange={(e) => postDetails(e.target.files[0])}
                            id="custom-file"
                            type="image/png"
                            label="Upload Profile Picture"
                            custom
                        />
                    </Form.Group> */}
                    <label for="pic">Profile Picture</label>
                    <div class="input-group mb-3">
                        <input type="file"
                            class="form-control"
                            placeholder="upload image"
                            id="custom-file"
                            onChange={(e) => postDetails(e.target.files[0])}
                        />
                        <div class="input-group-append">
                            <span class="input-group-text">img</span>
                        </div>
                    </div>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="/login"><span style={{color:'black'}}>Login</span></Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
}

export default RegisterScreen;
