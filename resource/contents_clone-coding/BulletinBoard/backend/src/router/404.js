const errorpage = (req, res)=>{
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.write('아무것도 없습니다.');
    res.end();
}

export default errorpage