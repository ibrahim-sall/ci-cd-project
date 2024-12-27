import { program, Logger, ParsedOptions } from '@caporal/core';

program
  .command("list-vehicle", "List all vehicles")
  .option("-p, --port <port>", "Port to use", { validator: program.NUMBER })
  .action(async ({ logger, options }: { logger: Logger; options: ParsedOptions }) => {
    const url = `http://localhost:${options.port}/vehicles`;
    logger.info(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const vehicles = await response.json();
      if (vehicles.length === 0) {
        logger.info('No vehicles found.');
      } else {
        logger.info('Vehicles:', vehicles);
      }
    } catch (error) {
      logger.error('Error:', error);
    }
  });

program.run();