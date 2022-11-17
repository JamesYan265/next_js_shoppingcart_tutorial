import { Button, Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import { useRouter } from "next/router";

//graphql 功能
import { gql } from "apollo-boost";
//graphql 取得資料
import { useQuery } from "@apollo/react-hooks";
import Cart from "../components/Cart";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const GET_SHOP_PRODUCT = gql`
        query ($id: ID!) {
            shop(id: $id) {
                id
                name
                products {
                    id
                    name
                    description
                    price
                    image {
                        url
                    }
                }
            }
        }
`;

const Shops = (props) => {
    //取得shopping cart的現狀態
    const appContext = useContext(AppContext);
    //取得路徑中的query值
    const router = useRouter();
    //引入graphql的數據
    const {loading, error, data} = useQuery(GET_SHOP_PRODUCT, {
        variables : {id: router.query.id}
    });

    if(error) return "讀取失敗";

    if(loading) return "讀取中...";

    if(data) {
        const { shop } = data;
        return (
            <>
            <h1 style={{fontWeight:800}}>{ shop.name }</h1>
            <Row>
                {shop.products.map((product) => (
                    <Col xs="6" sm="4" key={product.id} style={{padding:0}}>
                        <Card style={{margin: "0 10px"}}>
                            <CardImg src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`} top={true} style={{height: 250}}/>
                            <CardBody>
                                <CardTitle>{product.name}</CardTitle>
                                <CardTitle>{product.description}</CardTitle>
                            </CardBody>
                            <div className="card-footer">
                                <Button outline color="primary" onClick={() => appContext.addItem(product)}>
                                    + 購物車
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}

                <style jsx>{`
                        a {
                            color: white;
                        }
                        a:link {
                            text-decoration: none;
                            color: white;
                        }
                        a:hover {
                            color:white;
                        }
                        .card-colums {
                            colrumn-count: 3;
                        }
                    `}
                </style>
                <Col xs="3" style={{padding: 0}}>
                    <div>
                        <Cart />
                    </div>
                </Col>
            </Row>
            </>

        );

    } else {
        return <h1>Error 404, can't find the data</h1>
    }

}

export default Shops;