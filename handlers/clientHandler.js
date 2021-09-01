const {Collection} = require("discord.js")

module.exports = (client) => {
  client.commands = new Collection();
  client.slashCommands = new Collection();
  client.events = new Collection();

  // Functions
  String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.slice(1)
  }
};
