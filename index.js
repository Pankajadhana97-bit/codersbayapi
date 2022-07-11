const express = require('express');
require('dotenv').config()
const  cors = require('cors');
const compiler = require("compilex");
const app = express();

app.use('*',cors());
app.use(express.json());

const PORT = process.env.PORT;

let option = { stats: true };
compiler.init(option)


app.post('/compile', (req, res) => {

    compiler.flush( () => {
        console.log("All temporary files flushed !");
    });

    const {code,language,input} = req.body;

    if(language === 'cpp' || language === 'c') {
    var envData = { OS: "linux" , cmd: "gcc" , options: {timeout : 10000 } };
    var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
    compiler.compileCPPWithInput(envData, code, input,  (data)  => {
        console.log(JSON.stringify(data.error));
        res.send(data);
    });
   }
  
   if(language === 'py'){
    var envData = { OS : "windows"}; 
    var envData = { OS : "linux" }; 
    compiler.compilePythonWithInput( envData , code , input , (data) => {
        console.log(JSON.stringify(data.error));
        res.send(data);        
    });
   }

   if(language === 'java'){
    var envData = { OS : "windows"}; 
    var envData = { OS : "linux" }; 
    compiler.compileJavaWithInput( envData , code , input ,  (data) => {
        console.log(JSON.stringify(data.error));
        res.send(data);
    });
   }

});

app.listen(PORT, () => {
    console.log(`server is listening on port ${ PORT }`);
});
