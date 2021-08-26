const { Client, Interaction, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')
const apiKey = "You API Key HERE";


module.exports = {
  name: "dog",
  description: "Random Dog Picks",
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */ 
  // just for telling that u can also add options 
  execute: async (client, interaction) => {
    try {
      await interaction.deferReply().catch(_ => {});

      const fetchAPI = async () => {
        const response = await fetch(`https://api.thedogapi.com/v1/images/search`, {
          method: "GET",
          headers: {"x-api-key": apiKey}
        })

        const jsonresp = await response.json();
        return await jsonresp[0].url;
      } 

      const embed = new MessageEmbed().setColor("WHITE");


      embed.setImage(await fetchAPI())
      await interaction.editReply({embeds: [embed]})

    } catch (err) {
      console.log("Something Went Wrong => ",err);
    }
  },
};