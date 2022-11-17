import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import Link from "next/link"

//graphql 功能
import { gql } from "apollo-boost";
//graphql 取得資料
import { useQuery } from "@apollo/react-hooks";

const query = gql`
    {
        shops {
            id
            name
            description
            image {
                url
            }
        }
    }
`;

const ShopList = (props) => {
    //引入graphql的數據
    const {loading, error, data} = useQuery(query);

    if(error) return "讀取失敗";

    if(loading) return "讀取中...";

    if(data) {
        const searchquery = data.shops.filter((shop) => shop.name.toLowerCase().includes(props.search));
        return (

            <Row>
                {searchquery.map((res) => (
                    <Col xs="6" sm="4" key={res.id}>
                        <Card style={{margin: "0 0.5rem 20px 0.5rem"}}>
                            <CardImg src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`} top={true} style={{height: 250}}/>
                            <CardBody>
                                <CardTitle>{res.name}</CardTitle>
                                <CardTitle>{res.description}</CardTitle>
                            </CardBody>
                            <div className="card-footer">
                                <Link as={`/shops/${res.id}`} href={`/shops?id=${res.id}`}>
                                    <a className="btn btn-primary">更多</a>
                                </Link>
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
            </Row>
        );

    } else {
        return <h1>Error 404, can't find the data</h1>
    }

}

export default ShopList;