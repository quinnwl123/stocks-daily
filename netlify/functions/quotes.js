const SYMBOLS=['^AXJO','^AORD','BHP.AX','CBA.AX','RIO.AX','FMG.AX','NAB.AX','GC=F','SI=F','HG=F','BZ=F','NG=F','ZW=F','AUDUSD=X','^GSPC','TIO=F'].join(',');
exports.handler=async()=>{
try{
const r=await fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols='+encodeURIComponent(SYMBOLS),{headers:{'User-Agent':'Mozilla/5.0','Accept':'application/json'}});
const d=await r.json();
const q=(d?.quoteResponse?.result||[]).map(x=>({symbol:x.symbol,price:x.regularMarketPrice,change:x.regularMarketChange,changePct:x.regularMarketChangePercent}));
return{statusCode:200,headers:{'Content-Type':'application/json','Cache-Control':'public,s-maxage=60','Access-Control-Allow-Origin':'*'},body:JSON.stringify(q)};
}catch(e){return{statusCode:500,body:JSON.stringify({error:e.message})};}
};