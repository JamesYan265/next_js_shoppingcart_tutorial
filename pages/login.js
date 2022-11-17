import { useContext, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import AppContext from "../context/AppContext";
import { login } from "../lib/auth";

const Login = () => {
    const [data, setData] = useState({identifier:"", password: ""})
    const appContext = useContext(AppContext);

    const handleLogin = () => {
        login(data.identifier, data.password)
            .then((res) => {
                appContext.setUser(res.data.user);
                console.log(res.data.user);
        })
        .catch((err) => console.log(err));
    }

    const handleChange = (e) => {
        //[e.target.name] 會拎目標HTML tag 中的 name
        setData({...data, [e.target.name]: e.target.value})
    }
    return (
    <Container>
        <Row>
            <Col>
                <div className="paper">
                    <div className="header">
                        <h2>登入</h2>
                    </div>

                    <section className="wrapper">
                        <Form>
                            <fieldset>
                                <FormGroup>
                                    <Label>電子郵件</Label>
                                    <Input type="email" name="identifier" style={{height:50, fontsize: "1.2rem"}} onChange={(e) => handleChange(e)}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>密碼</Label>
                                    <Input type="password" name="password" style={{height:50, fontsize: "1.2rem"}} onChange={(e) => handleChange(e)}/>
                                </FormGroup>
                                <span className="forget">
                                    <a href="">
                                        <small>是否忘記密碼?</small>
                                    </a>
                                </span>
                                <Button style={{float: "right", width:120}} color="primary" onClick={() => {handleLogin();}}>登入</Button>
                            </fieldset>
                        </Form>
                    </section>
                </div>
            </Col>
        </Row>
        <style jsx>
            {`
                .paper {
                    text-align : center;
                    margin-top: 50px;
                }

                .header {
                    width:100%;
                    margin-bottom:30px
                }

                .wrapper {
                    padding: 10px 30px 20px 30px;
                }

                .forget {
                    float : left;
                }
            `}
        </style>
    </Container>
    );
}

export default Login;