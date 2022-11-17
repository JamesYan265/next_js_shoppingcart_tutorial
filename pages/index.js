import { useState } from "react";
import { Alert, Button, Col, Input, InputGroup, InputGroupText, Row } from "reactstrap";
import ShopList from "../components/ShopList";

const index = () => {

    const [query, setQuery] = useState("");

    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <div className="search">
                        <InputGroup>
                            <InputGroupText style={{height:43.2, marginTop:10}}>搜尋</InputGroupText>
                            <Input placeholder="輸入你想搜尋的店舖" onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                        </InputGroup>
                    </div>
                    <ShopList search={query}/>
                </Col>
            </Row>
            <style jsx> {`
                    .search {
                        margin : 20px;
                        width : 500px;
                    }
                `}
            </style>
        </div>
    );
}

export default index;