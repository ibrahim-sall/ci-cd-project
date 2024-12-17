const { program } = require("@caporal/core")

program
  .command("add", "Add a vehicle to the database")
  .option("--id <id>","ID of the vehicle you want to remove")
  .option("-p, --port <port>", "Port to use", {
    default: "3000",
  })
  .action(({ logger, options }) => {
    const url = 'http://localhost:'+options.port+'/create-vehicle';
    const data = {
      id : options.id
    };
    logger.info(url)
    logger.info(data.shortcode)
    //Faire un fetch
  })

// always run the program at the end
program.run()
