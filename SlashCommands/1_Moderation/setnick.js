const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "setnick",
  description: "Sets a Nickname to user",
  type: 'CHAT_INPUT',
  options: [
    {
      name: "user",
      description: "User to change nickname",
      type: 6,
      required: true,
    },
    {
      name: "nickname",
      description: "New nickname",
      type: 3,
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  botPerms: ["MANAGE_NICKNAMES"],
  permissions: ["MANAGE_NICKNAMES"],
  execute: async (client, interaction) => {
    try {
      const args = interaction.options._hoistedOptions;

      // now extract values
      const user = args.find((x) => x.name === "user");
      const nickname = args.find((x) => x.name === "nickname");

      // create a default embed
      // red for error
      const embed = new MessageEmbed().setColor("RED");

      // if dont have permission to manage user
      if (!user.member.manageable && user.member.id !== client.user.id) {
        // lets create a embed
        // https://discordjs.guide/popular-topics/embeds.html#embed-preview
        // checkout this website for best details about embeds
        embed.setDescription(`:x: I Cant Change ${user.member.toString()}'s Nickname`);
        return interaction.reply({ embeds: [embed] });
      }

      const oldNick = user.member.nickname ? user.member.nickname : user.member.user.username;

      await user.member.setNickname(nickname.value);

      embed.setColor("GREEN").setDescription(`:white_check_mark: ${user.member.toString()}'s Nickname Changed`).setFooter(`From ${oldNick} to ${nickname.value}`);
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};

// thanks for watching :)
// https://discord.com/developers/docs/interactions/application-commands
// must checkout this page to get so many help related to slash commands
// for source code go to
// https://www.codingwala.in/SourceCode/Discord.js/6
