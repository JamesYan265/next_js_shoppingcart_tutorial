//用於設定url
import { HttpLink } from "apollo-link-http"; 
//用於把資料export出去 傳送到_app.js
import { withData } from "next-apollo";

// 連接backend中Graphql,取得其資料
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:1337";

//指定backend中的網址位置
const config = {
    link: new HttpLink({
        uri: `${API_URL}/graphql`,
    })
}

export default withData(config);