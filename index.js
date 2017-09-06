var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express()

app.get('/find', function(req, res){

// the url to scrape, this should be dynamic on user input

  url = 'https://www.rallysportdirect.com/part/spoilers-and-wings/apr-as-106766-apr-gtc-300-carbon-fiber-wing'

  // now request that url and get back error, response, and the html of the page

  request(url, function(error, response, html){
    // check to make sure there were no errors

    if(!error){

      // load returned html onto cheerio fo easy parsing

      var $ = cheerio.load(html)

      // define variables to capture

      var title, price, image, link

      var json = { title : "", price : "", image : "", link : url }

      // find something to target the title with, using h1 for now

      $('h1').filter(function(){

        // store filtered data in variable

        var data = $(this)

        title = data.children().first().text();

        json.title = title

        console.log(json);


      })

      $('h2.price').filter(function(){

        var data = $(this)

        price = data.children().first().text();

        json.price = price

        console.log(json);

      })

      $('img.mainImg').filter(function(){

        var data = $(this)

        image = data.attr().src;

        json.image = image

        console.log(json);
      })

    }


  })


})

app.listen('3030')

console.log('listening on port 3030');

exports = module.exports = app
