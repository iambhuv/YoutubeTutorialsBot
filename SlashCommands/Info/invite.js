const { Client, Interaction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get Links To Invite Me :D",
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  execute: async (client, interaction) => {
    try {
      const embed = new MessageEmbed().setColor("WHITE");

      // So Message Buttons is Somehow like embeds
      // but we need to collect the clicks on the button which looks hard but its not
      // so lets create our first MessageButton but its actually a Link Button
      // we will create interaction button some other day :D

      // for creating button we need to make a action row to hold those components like MessageButtons and MessageSelectMenu
      const row = new MessageActionRow().addComponents(
        // here we add our buttons
        // you cant use LINK style with interaction buttons or normal style with link buttons
        // its temp url for showing xD
        new MessageButton().setLabel("Invite Me!").setURL("https://www.codingwala.in/SourceCode").setStyle("LINK"),
        new MessageButton().setLabel("Support Server!").setURL("https://www.codingwala.in/SourceCode/Discord.js/11").setStyle("LINK"),
      );
      // u can add 4 buttons in a row 

      embed.setDescription(`Take Your Links`);
      await interaction.reply({ embeds: [embed], components: [row] });
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};
