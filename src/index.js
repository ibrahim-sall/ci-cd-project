const { program } = require("@caporal/core")

program
  .command("list-vehicle", "List all vehicles")
  .option("-p, --port <port>", "Port to use", {
    default: "3000",
  })
  .action(({ logger, options }) => {
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
