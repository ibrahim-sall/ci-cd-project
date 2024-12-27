import {program, Logger, ParsedOptions } from '@caporal/core';

program
  .command("add", "Add a vehicle to the database")
  .option("--shortcode <shortcode>", "4 character long code to name the vehicle",{ validator: program.STRING })
  .option("--battery <battery>", "Level of battery of the vehicle", { validator: program.NUMBER })
  .option("--longitude <longitude>", "Longitude of the coordinate of the vehicle", { validator: program.NUMBER })
  .option("--latitude <latitude>", "Latitude of the coordinate of the vehicle", { validator: program.NUMBER })
  .option("-p, --port <port>", "Port to use", { validator: program.NUMBER})
  .action(({ logger, options }:{ logger: Logger; options: ParsedOptions }) => {
    if (!options.shortcode || !options.battery || !options.longitude || !options.latitude || !options.port) {
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

  
  .command("list-vehicle", "List all vehicles")
  .option("-p, --port <port>", "Port to use",{ validator: program.NUMBER})
  .action(({ logger, options }:{ logger: Logger; options: ParsedOptions }) => {
    const url = 'http://localhost:'+options.port+'/vehicles';
    logger.info(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        logger.info('Vehicles:', data);
      })
      .catch(error => {
        logger.error('Error:', error);
      });
  })

  .command("remove", "Remove a vehicle from the database by id")
  .option("--id <id>", "ID of the vehicle you want to remove", { validator: program.NUMBER})
  .option("-p, --port <port>", "Port to use", { validator: program.NUMBER})
  .action(({ logger, options }:{ logger: Logger; options: ParsedOptions }) => {

    if (!options.id) {
      logger.error("Vehicle ID is required");
      return;
    }

    const url = `http://localhost:${options.port}/vehicles/${options.id}`;
    logger.info(url);

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 404) {
        throw new Error('Vehicle not found');
      }
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .then(result => {
      logger.info("Vehicle removed successfully:", result);
    })
    .catch(error => {
      logger.error("Error removing vehicle:", error.message);
    });
  });


program.run()

  
