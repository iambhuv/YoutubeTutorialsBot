module.exports = {
  name: "ban",
  descrption: "bans The User!",
  execute: async (client, message, args, PREFIX) => {
    if (!args[0]) {
      return message.channel.send(":x: Must Provide a User");
    }

    const userId = message.mentions.users.first().id;
    const userToKick = message.guild.members.cache.get(userId);

    if (!userToKick) {
      return message.channel.send(":x: Invalid User");
    }

    userToKick
      .ban({ reason: "Banned by " + message.member.displayName })
      .then(() => {
        return message.channel.send(":white_check_mark: User Banned Succesfully");
      })
      .catch((err) => {
        console.log(`Error => ${err}`);
        return message.channel.send(":x: Unable to ban the user");
      });
  },
};
