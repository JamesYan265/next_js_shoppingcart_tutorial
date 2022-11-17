import { Col, Row } from "reactstrap";
import Cart from "../components/Cart";
import CheckOutForm from "../components/Checkout/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const checkout = () => {
    //付費插件(stripe)的公開匙
    const stripePromise = loadStripe(
        'pk_test_51M4lIDA41Fhwf1D5OtAb5ASdUhu8MnPwUa9576Uwi2rch8LavBvdIHkGyUTvPefDAf3KoKo8M8zGQFwCuyyX4uSx00rBrybQNq',{ locale: 'en'}
    );
    return (
        <Row>
            <Col style={{paddingRight:0}} sm={{size:3, order:1, offset:2}}>
                <h1 style={{margin:20, fontSize:20, textAlign: "center"}}>訂單</h1>
                <Cart   />
            </Col>

            <Col style={{paddingLeft: 5}} sm={{size:6, order:2}}>
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </Col>
        </Row>
    );
}

export default checkout;