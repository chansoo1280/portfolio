
// import {test} from "./test.js"
// import {init} from "./init.js"
import errorpage from "./404.js";
import notice from "../notice/index.js"

export const router = function (req, res){
    const { url } = req;
    const pathStr = url.split('/')[1];
    switch (pathStr){
      case '': {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.write('Hello, World!\n');
        res.end();
        break;
      }
      case "notice": {
        notice(req, res, errorpage);
        break;
      }
      default: {
        errorpage(req, res);
        break;
      }
    }
    
  }