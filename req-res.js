

//sending request and respond


const http=require('http');
const fs =require('fs');
const server = http.createServer((req,res)=>{

    const url= req.url;
    const method=req.method;
    if(url==='/'){
       
        res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title>form details</title></head>')
    res.write('<body><form action="/message" method="POST"> <input type="text" name="message" ><input type="submit" value="send">  </form></body>')
    res.write('<html>');
    return res.end();


    }


    if( url==='/message' && method == 'POST'){
        //how to register the incoming chunk data
        const body =[];
    //getting data from request(is data coming)
        req.on('data',(chunk)=>{
            //its divied the big data onto the small segments called memory chunk
            // console.log('chunk');
            //console.log(chunk);
     //to join the divided data from the memory       
        body.push(chunk)
        console.log(chunk);
        })
     //while finishing the upload, we dont know when it finish.so we use req.on method to end   
            //asynchrous code(on)event drive
            req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            //console.log(parsedBody);

            //split is the function that is used to split the fn while seeing '=' split two value
            const message= parsedBody.split('=');
            fs.writeFileSync('hello.txt',message[1]);


        })

        
        //filesystem
        fs.writeFileSync('hello.txt ','DUMMY');
        //redirection
       res.setHeader('location','/');
       res.statusCode = 302;
        return res.end();
    }



    res.setHeader('content-type','text/html');
    res.write('<html>');
    res.write('<head><title>web page</title></head>')
    res.write('<body><h1>hello from sona</h1></body>')
    res.write('<html>');
    res.end();


     //console.log(req);
    //process.exit();
});

server.listen(3000);