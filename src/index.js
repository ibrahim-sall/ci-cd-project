const { program } = require("@caporal/core")

program
  .command("list-vehicle", "Add a vehicle to the database")
  .option("-p, --port <port>", "Port to use", {
    default: "3000",
  })
  .action(({ logger, options }) => {
    const url = 'http://localhost:'+options.port+'/create-vehicle';
    logger.info(url)
    //Faire un fetch
  })

// always run the program at the end
program.run()
