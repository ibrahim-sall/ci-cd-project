import {program, Logger, ParsedOptions } from '@caporal/core';

program
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
  });


program.run()
