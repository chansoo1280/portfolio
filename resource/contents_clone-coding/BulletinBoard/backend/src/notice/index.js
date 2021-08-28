import connection from "../DBcon/connection.js";
import info from "./info.js"

const getRes = (req, res) =>{
    const sqlStr = `
    SELECT * FROM db_bb.notice
    WHERE deleted IS NULL;`
    connection.query(sqlStr, (error, results, fields) => {
        if (error) {
            console.log(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.write(String(error));
            res.end();
            return;
        }
        console.log(results);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.write(JSON.stringify(results));
        res.end();
    });
}
// var url = 'http://127.0.0.6/notice';

// fetch(url, {
//   method: 'POST', // or 'PUT'
//   body: JSON.stringify({
//     name: 'kim',
//     author: "관리자",
//     contents: "내용입니다."
// }), // data can be `string` or {object}!
//   headers:{
//     'Content-Type': 'application/json'
//   }
// }).then(res => res.json())
// .then(console.log)
// .catch(error => console.error('Error:', error));
const postRes = (req, res) =>{
    let jsonData = "";
    req.on('data', chunk => jsonData += chunk).on('end', function () {
        const body = JSON.parse(jsonData);
        const params = [body.name, body.author, body.contents]
        const sqlStr = `
            INSERT INTO db_bb.notice ( 
                name, 
                author, 
                contents, 
                created 
            ) VALUES ( 
                ?,  
                ?,  
                ?,  
                now()
            );
        `
        connection.query(sqlStr, params, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.write(String(error));
                res.end();
                return;
            }
            console.log(results);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/json');
            res.write(JSON.stringify(results));
            res.end();
        });
    });
}
const deleteRes = (req, res) =>{
    const sqlStr = `
            UPDATE db_bb.notice
            SET deleted = now();
        `
        connection.query(sqlStr, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.write(String(error));
                res.end();
                return;
            }
            console.log(results);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/json');
            res.write(JSON.stringify(results));
            res.end();
        });
}
const notice = (req, res, errorpage)=>{
    const { url } = req;
    const pathStr = url.split('/')[2];
    switch (pathStr){
        case '': {
            const {method} = req;
            switch (method){
                case "GET" : {
                    getRes(req, res);
                    break;
                }
                case "POST" : {
                    postRes(req, res);
                    break;
                }
                case "DELETE" : {
                    deleteRes(req, res);
                    break;
                }
            }
            break;
        }
        default: {
            const reg = /^\d+$/;
            if (reg.test(pathStr)){
                info(req, res, errorpage);
                break;
            }
            errorpage(req, res);
            break;
        }
    }
    
}
export default notice;