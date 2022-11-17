import React from "react";
import App from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppContext from  "../context/AppContext";
import Cookies from "js-cookie";
import './global.css'


class MyApp extends App {
    state = {
        user : null,
        cart : {items: [], total:0},
    };

    setUser = (user) => {
        this.setState({user});
    };

    //檢查cookie是否存在
    componentDidMount() {
        const token = Cookies.get("token"); //token中有JWT
        const cart = Cookies.get("cart"); //取得Cookies中的Cart

        if(token) {
            //http://localhost:1337/user/me 是由Strapi提供
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }).then(async (res) => {
                if(!res.ok) {
                    Cookies.remove("token");
                    this.setState({user: null})
                    return null;
                }
                const user = await res.json();
                this.setUser(user);
            })
        }

        if(cart !== "undefined" && typeof cart === "string") {
            JSON.parse(cart).forEach((item) => {
                this.setState({
                    cart:{ 
                        items: JSON.parse(cart), 
                        total: (this.state.cart.total += item.price * item.quantity)
                    },
                })
            })
        }
    }

    //購物車追加產品
    addItem = (item) => { //item變數是在pages/shops.js中加入 shop.products.map結果的變數
        let { items } = this.state.cart;
        
        //當商店中的商品與cart.items中的狀態不相等時
        const newItem = items.find((i) => i.id === item.id);
        if(!newItem) { //當購物車無同一件商品時的做法
            item.quantity = 1;
            //增加到購物車 (更新狀態)
            this.setState(
                {
                    cart: {
                        items: [...items, item],
                        total: this.state.cart.total + item.price, 
                    },
                },
                //把更新的狀態儲係Cookie
                () => Cookies.set("cart", this.state.cart.items)
            );
        } else { //有同一件的做法
            this.setState(
                {
                    cart: {
                        items: this.state.cart.items.map((item) =>
                            item.id === newItem.id ?
                            Object.assign({}, item, {quantity: item.quantity + 1})
                            : item
                        ),
                    total: this.state.cart.total + item.price,
                    }
                },
                () => Cookies.set("cart", this.state.cart.items)
            );
        }
    };

    //購物車中刪除商品
    removeItem = (item) => { //item變數是在pages/shops.js中加入 shop.products.map結果的變數
        let { items } = this.state.cart;
        
        //當商店中的商品與cart.items中的狀態不相等時
        const newItem = items.find((i) => i.id === item.id);
        if(newItem.quantity > 1) { //當購物車無同一件商品時的做法
            //增加到購物車 (更新狀態)
            this.setState(
                {
                    cart: {
                        items: this.state.cart.items.map((item) =>
                        item.id === newItem.id ?
                        Object.assign({}, item, {quantity: item.quantity - 1})
                        : item
                        ),
                        total: this.state.cart.total - item.price, 
                    },
                },
                //把更新的狀態儲係Cookie
                () => Cookies.set("cart", this.state.cart.items)
            );
        } else { //如果數量只有一件的做法

            const items = [...this.state.cart.items];
            const index = items.findIndex((i) => i.id === newItem.id);

            items.splice(index, 1);

            this.setState(

                {
                    cart: {
                        items,
                        total: this.state.cart.total - item.price
                    },
                },
                () => Cookies.set("cart", this.state.cart.items)
            );
        }
    };

    render() {
        const { Component, pageProps } = this.props;

        return (
        <AppContext.Provider value={{ user: this.state.user, setUser: this.setUser, addItem: this.addItem, removeItem: this.removeItem, cart: this.state.cart}}>
            <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            </>
        </AppContext.Provider>
        )
    }
}

//設定令到全component可以使用graphql中的設定
export default withData(MyApp);

// 15-17 引入layout後實際運作原理
// <Layout props.children>
//    <Container>
//      <Component {...pageProps} />
//    </Container>
// </Layout>