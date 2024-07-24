import config from '../../config.cjs';

const deleteMessage = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['del', 'delete'];

    if (validCommands.includes(cmd)) {
      if (!isCreator) {
        return m.reply("*⚙️ ඔබ 𝗿𝘂𝘀𝗵 𝗯𝗼𝘁 හා 𝗰𝗼𝗻𝗲𝗰𝘁 කර සිටින්නා නොවේ*");
      }

      if (!m.quoted) {
        return m.reply('📤 𝗱𝗲𝗹𝗲𝘁𝗲 කල යුත්ත තෝරා 𝗿𝗲𝗽𝗹𝘆 කල යුතුයි');
      }

      const key = {
        remoteJid: m.from,
        id: m.quoted.key.id,
        participant: m.quoted.key.participant || m.quoted.key.remoteJid
      };

      await gss.sendMessage(m.from, { delete: key });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    m.reply('An error occurred while trying to delete the message.');
  }
};

export default deleteMessage;
