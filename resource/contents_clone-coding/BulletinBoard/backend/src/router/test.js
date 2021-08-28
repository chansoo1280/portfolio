import connection from "../DBcon/connection.js"

const get = (req, res) => {
    connection.connect();
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            console.log(error);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.write(String(error));
            res.end();
            connection.end();
            return;
        }
        console.log(results);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.write(JSON.stringify(results));
        res.end();
        connection.end();
    });
}

export const test = (req, res)=>{
    const method = req.method;
    switch (method) {
        case "GET": {
            get(req, res);
            break;
        }
    }
}