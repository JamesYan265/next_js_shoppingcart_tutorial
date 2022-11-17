import React, { useContext } from "react";
import App from "next/app";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "../context/AppContext";

const Layout = (props) => {

    const {user, setUser} = useContext(AppContext);
    return (
        <div>
            <Head>
                <title> Shopping Application Service</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            </Head>
            <header>
                <style jsx>
                    {`
                        a {
                            color: white;
                        }

                        h5 {
                            color: white;
                            font-weight: 800;
                        }
                    `}
                </style>
                <Nav className="navbar navbar-dark bg-dark">
                    <NavItem className="ms-2">
                        <Link href="/">
                            <a className="navbar-brand">首頁</a>
                        </Link>
                    </NavItem>

                    <NavItem className="ms-auto">
                        {user ? (
                            <Link href='/'>
                                <a className="nav-link" onClick={() => {setUser(null);}}>登出</a>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <a className="nav-link">登入</a>
                            </Link>
                        )}
                    </NavItem>

                    <NavItem>
                        {user ? (
                            <h5>{user.username}</h5>
                        ) : (
                        <Link href="/register">
                            <a className="nav-link">註冊</a>
                        </Link>
                        )}
                    </NavItem>

                </Nav>
            </header>
            {/* Container 導入 _app.js 的 {...pageProps} */}
            {/* {props.children} 就係指該頁的所有內容 */}
            <Container>{props.children}</Container>
        </div>
    );
}

export default Layout;