
const express = require('express');
const cors = require('cors');
const dns = require('dns')
const bodyParser = require('body-parser');
const {getShortUrl,getUrlById } = require('./url');
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/shorturl/:id', async function(req, res) {
const url =  await getUrlById(req.params.id)
if (url) {
  res.statusCode = 301;
  res.redirect(url.original_url);
}
else{
  res.statusCode = 404;
  res.send(`short Url id ${req.params.id} does not exit`)
} 
});

app.post('/api/shorturl',async (req,res)=>{
  var originalUrl = req.body.url;
  try{
    const validUrl = new URL(originalUrl)
    dns.lookup(validUrl.host,async (err,addr,family)=>{
      if(err){
        console.log(`Invalid URL :${originalUrl}`);
        res.json({'error':'invalid url'});
      }
   const urlMeta = await  getShortUrl({original_url:originalUrl,ipAddress:addr,family:family})
   urlMeta ? res.json(urlMeta) : res.status(500);
    })
  }catch(e){
    console.log(`Invalid URL :${originalUrl}`);
    res.json({'error':'invalid url'});
  }
})


module.exports =  app;

