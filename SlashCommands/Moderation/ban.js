const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban Someone",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "User To Ban",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "Reason To Ban",
      type: 3,
      required: false,
    },
  ],
  permissions: ["BAN_MEMBERS"],
  botPerms: ["BAN_MEMBERS"],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  execute: async (client, interaction) => {
    try {
      // NOW lets get the user from options
      const options = interaction.options._hoistedOptions;

      // now user cant use that command without providing a valid user so we dont even
      // need to handle wrong user or no args thing
      // which is a plus point with slash commands
      const user = options.find((e) => e.name === "user");
      const reason = options.find((e) => e.name === "reason").value || `Banned by ${interaction.member.displayName}`;

      // default embed
      const embed = new MessageEmbed().setColor("RED");

      // we are going to do something special here
      const userRank = user.member.roles.highest.rawPosition;
      const memberRank = interaction.member.roles.highest.rawPosition;
      // but still we will make sure if user exists
      if (!user.member) {
        embed.setDescription(`:x: Cant Find That User`);
        await interaction.reply({ embeds: [embed] });
      } else if (userRank >= memberRank) {
        embed.setDescription(`:x: You Cant Ban That User`);
        await interaction.reply({ embeds: [embed] });
      } else if (!user.member.bannable) {
        embed.setDescription(`:x: I Cant Ban That User`);
        await interaction.reply({ embeds: [embed] });
      } else {
        await user.member.ban({ reason });
        embed.setColor("GREEN").setDescription(`:white_check_mark: User Banned Successfully`);
        await interaction.reply({ embeds: [embed] });
      }

      // now time to fix error xD
      // interaction.reply({ content: "Ban Command is Not Ready Yet", ephemeral: true });
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};
