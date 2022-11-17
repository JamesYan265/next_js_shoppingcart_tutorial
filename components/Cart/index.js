import Link from "next/link";
import { useContext } from "react";
import { Badge, Button, Card, CardBody, CardTitle } from "reactstrap";
import AppContext from "../../context/AppContext";

const Cart = () => {
    const appContext = useContext(AppContext);
    const { cart } = appContext;
    let n = 0;
    return (
        <div>
            <Card style={{ padding: "10px 5px"}} color="light">
                <CardTitle style={{margin: 10, textAlign: "center", fontWeight:600, fontSize:25,}}>購物車</CardTitle>
                <hr />
                <CardBody style={{ padding: 10 }}>
                    <div style={{ marginBottom: 6 }}>
                        <small>貨物</small>
                    </div>
                    <div>
                        {cart.items ? 
                            cart.items.map((item) => {
                            if(item.quantity > 0) {
                                n = n + 1;
                                return (
                                    <div className="items-one" style={{ marginBottom: 15 }} key={n}>
                                        <div>
                                            <span id="items-price">&nbsp; {item.price} $港元</span>
                                            <span id="items-name">&nbsp; {item.name}</span>
                                        </div>
                                        <div>
                                            <Button style={{height:25, padding:0, width:15, marginRight:5, marginLeft:10, textDecoration:"none"}} color="link" onClick={() => appContext.addItem(item)}>+</Button>
                                            <Button style={{height:25, padding:0, width:15, marginRight:5, marginLeft:10, textDecoration:"none"}} color="link" onClick={() => appContext.removeItem(item)}>-</Button>
                                            <span id="item-quantity" style={{ marginLeft:5 }}>{item.quantity}</span>
                                        </div>
                                    </div>
                                )

                            }
                        }) : null
                        
                        }

                        <div>
                            <Badge style={{width:200, padding:10}} color="light">
                                <h5 style={{ fontWeight:100, color:"gray" }}>總和</h5>
                                <h3 style={{ fontWeight:100, color:"black" }}>{cart.total}</h3>
                            </Badge>
                            <div>
                                <Link href="/checkout">
                                    <div>
                                        <Button style={{ width:"100%" }} color="primary">
                                            <a>付款</a>
                                        </Button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default Cart;