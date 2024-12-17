var http = require('http');
var https = require('https');

var retreiveDatas = function(url){
    return new Promise((resolve, reject) => {
        var proto = https;
        if (url.indexOf("http://") == 0)
            proto = http;

        var request = proto.get(url, function(response){
            response.setEncoding('utf8');

            var body = '';
            response.on('data', function(d){
                body += d;
            });

            response.on('end', function(){
                var parsed = JSON.parse(body);
                resolve(parsed);
            });
        });
    })
}


const { program } = require("@caporal/core");

program
  .command("add", "Add a vehicle to the database")
  .option("--shortcode <shortcode>", "4 character long code to name the vehicle")
  .option("--battery <battery>", "Level of battery of the vehicle", program.FLOAT)
  .option("--longitude <longitude>", "Longitude of the coordinate of the vehicle", program.FLOAT)
  .option("--latitude <latitude>", "Latitude of the coordinate of the vehicle", program.FLOAT)
  .option("-p, --port <port>", "Port to use", {
    default: "3000",
  })
  .action(({ logger, options }) => {
    if (!options.shortcode || !options.battery || !options.longitude || !options.latitude) {
      logger.error("Error: Missing required options.");
      return;
    }
    const url = 'http://localhost:'+options.port+'/vehicles';
    const data = {
      shortcode: options.shortcode,
      battery: options.battery,
      longitude: options.longitude,
      latitude: options.latitude
    };
    logger.info(url)
    logger.info(data.shortcode)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        logger.info("Vehicle added successfully:", result);
      })
      .catch(error => {
        logger.error("Error adding vehicle:", error);
      });
  })

program.run();

