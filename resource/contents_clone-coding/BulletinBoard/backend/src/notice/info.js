import connection from "../DBcon/connection.js";

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
const info = (req, res, errorpage)=>{
    const { url } = req;
    switch (url.split('/')[2]){
        case '': {
            const {method} = req;
            switch (method){
                case "GET" : {
                    getRes(req, res);
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
            errorpage(req, res);
            break;
        }
    }
    
}
export default info;