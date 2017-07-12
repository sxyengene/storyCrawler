const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');

var host = 'http://www.xxbiquge.com';
var path = '/1_1378/4001123.html';
// var crid = '3644001';

// var url = host+path+crid;
var url = host+path;
catchPage(url);

// var index = 1;

function catchPage(url){
    http.get(url, function(res) {
        var html = '';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            var  $ = cheerio.load(html,{
                decodeEntities: false
            })
            handleHtml($);
        });
    });
}



function handleHtml($){

    var title = $('.bookname h1').text();
    var text = $('#content').html();
    var content = '';

    text = text.replace(/&nbsp;/g,'');
    text = text.replace(/<br>/g,'\n');
    content = title + '\n' + text + '\n';


    fs.writeFile('九鼎记1.txt',content,{
        flag:'a'
    });

    // if(crid == 3966326){
        // return;
    // }
    
    var html = $.html();
    path = $('.bottem2 a').eq(2).attr('href');
    if(typeof path == 'undefined'){
        return;
    }
    // path = html.match(/\<a href=\"(.*)\"\>下一章\<\/a\>/)[1];
    console.log(path);
    // url = host+path+crid;
    url = host+path;
    catchPage(url);
}

