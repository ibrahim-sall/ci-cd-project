const { program } = require("@caporal/core")

// Simplest program ever: this program does only one thing
program.action(({ logger }) => {
  logger.info("Hello, world!")
})

// always run the program at the end
program.run()
