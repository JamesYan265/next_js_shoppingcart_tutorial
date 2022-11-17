import { useContext, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import AppContext from "../context/AppContext";
import {registerUser} from "../lib/auth";

const register = () => {
    const [data, setData] = useState({username : "", email: "", password: ""})
    const appContext = useContext(AppContext);

    const handleRegister = () => {

        registerUser(data.username, data.email, data.password)
            .then((res) => {
                appContext.setUser(res.data.user);
                console.log(res.data.user);
            })
            .catch((err) => console.log(err));
    }
    return (
    <Container>
        <Row>
            <Col>
                <div className="paper">
                    <div className="header">
                        <h2>使用者登錄</h2>
                    </div>

                    <section className="wrapper">
                        <Form>
                            <fieldset>
                                <FormGroup>
                                    <Label>使用者名稱</Label>
                                    <Input type="text" name="username" style={{height:50, fontsize: "1.2rem"}} onChange={(e) => setData({...data, username: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>電子郵件</Label>
                                    <Input type="email" name="email" style={{height:50, fontsize: "1.2rem"}} onChange={(e) => setData({...data, email: e.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>密碼</Label>
                                    <Input type="password" name="password" style={{height:50, fontsize: "1.2rem"}} onChange={(e) => setData({...data, password: e.target.value})}/>
                                </FormGroup>
                                <span className="forget">
                                    <a href="">
                                        <small>是否忘記密碼?</small>
                                    </a>
                                </span>
                                <Button style={{float: "right", width:120}} color="primary" onClick={() => {handleRegister();}}>註冊</Button>
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

export default register;