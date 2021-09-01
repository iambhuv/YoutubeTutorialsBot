const { Client, Interaction, MessageEmbed } = require("discord.js");
const Schema = require("../../../../Sensor/models/GuildConfig");

module.exports = {
  name: "unmute",
  description: "Unmute Someone",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "User To Unmute",
      type: 6,
      required: true,
    },
  ],
  permissions: ["MANAGE_ROLES"],
  botPerms: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  execute: async (client, interaction) => {
    try {
      const options = interaction.options._hoistedOptions;

      const user = options.find((e) => e.name === "user");

      const embed = new MessageEmbed().setColor("GREEN");

      const GuildConfig = await Schema.findOne({
        GuildId: guild.id,
      });

      let MutedRole = interaction.guild.roles.cache.get(GuildConfig?.MutedRole);

      if (!GuildConfig?.MutedRole || !MutedRole) {
        embed.setColor(client.colors.error).setDescription(`<:sensorerror:874956574760767538> No Muted Role Found, Use Mute to Create One`);
        await Schema.findOneAndUpdate({ GuildId: guild.id }, { MutedRole: null }, { upsert: true });
        return await interaction.reply({ embeds: [embed] });
      }

      if (!user.member.roles.cache.find((e) => e.name === "Muted")) {
        embed.setColor(client.colors.error).setDescription(`<:sensorerror:874956574760767538> User Is Not Muted`);
        return await interaction.reply({ embeds: [embed] });
      }

      await user.member.roles.remove(MutedRole);
      embed.setDescription(`:white_check_mark: ${user.member.toString()} ***Unmuted Successfully***`);
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log(`Error => `, err);
    }
  },
};
