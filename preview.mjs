import http from 'node:http';
import {stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Readable} from 'node:stream';
import worker from './app/dist/server/server.js';
const port=Number(process.env.PORT)||4187;
const root=resolve(fileURLToPath(new URL('.',import.meta.url)),'app/dist/client');
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{try{
const url=new URL(req.url,'http://127.0.0.1:'+port),file=resolve(root,'.'+decodeURIComponent(url.pathname));
let info;try{if(file.startsWith(root+sep))info=await stat(file)}catch{}
if(info?.isFile()){res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');res.setHeader('Accept-Ranges','bytes');res.setHeader('Cache-Control','no-cache');
const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');let start=0,end=info.size-1;if(range){start=Number(range[1]);end=range[2]?Math.min(Number(range[2]),end):end;if(start>end){res.writeHead(416,{'Content-Range':'bytes */'+info.size});res.end();return}res.statusCode=206;res.setHeader('Content-Range','bytes '+start+'-'+end+'/'+info.size)}
res.setHeader('Content-Length',end-start+1);if(req.method==='HEAD'){res.end();return}createReadStream(file,{start,end}).pipe(res);return}
const response=await worker.fetch(new Request(url,{method:req.method,headers:req.headers}),{}, {waitUntil:()=>{}});res.writeHead(response.status,Object.fromEntries(response.headers));if(req.method==='HEAD'||!response.body)res.end();else Readable.fromWeb(response.body).pipe(res);
}catch(error){console.error(error);res.writeHead(500);res.end('Preview server error')}}).listen(port,'127.0.0.1',()=>console.log('Muu preview: http://127.0.0.1:'+port));
