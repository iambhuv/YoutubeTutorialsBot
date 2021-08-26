const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Some Information About Server",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  execute: async (client, interaction) => {
    try {
      const guild = interaction.guild;

      const name = guild.name;
      const id = guild.id;
      const owner = (await guild.members.fetch(guild.ownerId)).toString();
      const fetchedMembers = await guild.members.fetch({ withPresences: true });
      const totalMembers = guild.memberCount;
      const totalBots = fetchedMembers.filter((m) => m.user.bot).size;
      const totalRoles = (await guild.roles.fetch()).size;
      const totalOnlineMembers = fetchedMembers.filter((m) => m.presence && m.presence.status !== "offline" && !m.user.bot).size;

      const d = new Date(guild.createdTimestamp);
      const prt = (p) => (p < 10 ? `0${p}` : p);
      const guildCreatedAt = `${d.getFullYear()}-${prt(d.getMonth() + 1)}-${prt(d.getDate())}`;
      const guildCreatedTimestamp = guild.createdTimestamp;

      const embed = new MessageEmbed().setColor("WHITE");

      embed
        .setAuthor(guild.name, guild.iconURL() ?? "")
        .setThumbnail(guild.iconURL())
        .addField("Name", `${name}`, true)
        .addField("Id", `${id}`, true)
        .addField("Owner", `${owner}`, true)
        .addField("Members", `\`${totalMembers}\``, true)
        .addField("Members Online", `\`${totalOnlineMembers}\``, true)
        .addField("Bots", `\`${totalBots}\``, true)
        .addField("Roles", `\`${totalRoles}\``, true)
        .addField("Created At", `\`${guildCreatedAt}\``, true)
        .addField("Created Timestamp", `\`${guildCreatedTimestamp}\``, true)
        .setFooter(`Subcribe Coding Wala!`);

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};
