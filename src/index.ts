import {program, Logger, ParsedOptions } from '@caporal/core';

program
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

program.run();