import { FormGroup, Input, Label } from "reactstrap";
import CardSection from "./CardSection";
import Cookies from "js-cookie";
import AppContext from "../../context/AppContext";
import { useContext, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckOutForm = () => {
    const appContext = useContext(AppContext);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    //將卡資料加密使用的功能
    const elements  = useElements();
    const stripe = useStripe();

    //取得address data 和 stripe_id
    const [data, setData] = useState({
        address:"",
        stripe_id:"",
    })

    const handleChange = (e) => {
        const updateItem = (data[e.target.name] = e.target.value);
        setData({...data, updateItem});
    }

    //訂單確認
    const submitOrder = async() => {

        //將卡資料加密
        const cardElement = elements.getElement(CardElement);
        const Cardtoken = await stripe.createToken(cardElement);

        const userToken = Cookies.get("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
            method:"POST",
            headers: userToken && {
                Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                amount: Number(appContext.cart.total),
                products: appContext.cart.items,
                address: data.address,
                token: Cardtoken.token.id,
            }),
        });
        if(response.ok) {
            setSuccess("已收到你的訂單")
        } else {
            let sendData = ({
                amount: Number(appContext.cart.total),
                products: appContext.cart.items,
                address: data.address,
                token: Cardtoken.token.id,
            });
            console.log(sendData);
            setError("發生錯誤,正再一次確認你的訂單")

        }
    }
    return (
        <div className="paper">
            <h5>你的個人資料</h5>
            <hr />
            <FormGroup>
                <div>
                    <Label>地址</Label>
                    <Input name="address" onChange={(e) => handleChange(e)}/>
                </div>
            </FormGroup>

            <CardSection submitOrder={submitOrder} errorMsg = {error} successMsg = {success}/>
        </div>

    );
}

export default CheckOutForm;