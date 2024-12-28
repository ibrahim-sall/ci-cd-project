import { program, Logger, ParsedOptions } from '@caporal/core';
const apiHost = process.env.API_HOST || 'localhost';
const baseUrl = `http://${apiHost}:`;

program
  .command("add", "Add a vehicle to the database")
  .option("--shortcode <shortcode>", "4 character long code to name the vehicle",{ validator: program.STRING })
  .option("--battery <battery>", "Level of battery of the vehicle", { validator: program.NUMBER })
  .option("--longitude <longitude>", "Longitude of the coordinate of the vehicle", { validator: program.NUMBER })
  .option("--latitude <latitude>", "Latitude of the coordinate of the vehicle", { validator: program.NUMBER })
  .option("-p, --port <port>", "Port to use", { validator: program.NUMBER})
  .action(async ({ logger, options }:{ logger: Logger; options: ParsedOptions }) => {
    if (!options.shortcode || !options.battery || !options.longitude || !options.latitude || !options.port) {
      logger.error("Error: Missing required options.");
      return;
    }
    const url = `${baseUrl}${options.port}/vehicles`;
    const data = {
      shortcode: options.shortcode,
      battery: options.battery,
      longitude: options.longitude,
      latitude: options.latitude
    };
    logger.info(url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      logger.info('Vehicle added successfully:', result);
    } catch (error) {
      logger.error('Error:', error);
    }
  })

  .command("list-vehicle", "List all vehicles")
  .option("-p, --port <port>", "Port to use", { validator: program.NUMBER })
  .action(async ({ logger, options }: { logger: Logger; options: ParsedOptions }) => {
    const apiPort = options.port;
    const url = `${baseUrl}${apiPort}/vehicles`;
    logger.info(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const vehicles = await response.json();
      if (vehicles.vehicles.length === 0) {
        logger.info('No vehicles found.');
      } else {
        logger.info('Vehicles:', vehicles);
      }
    } catch (error) {
      logger.error('Error:', error);
    }
  });

program.run();