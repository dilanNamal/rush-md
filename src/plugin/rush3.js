const report = async (m, gss) => {
  const reportedMessages = {};
  const devlopernumber = '94762498519';
const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['bug', 'report', 'request']; 
  
  if (validCommands.includes(cmd)) {
    
  if (!text) return m.reply(`Example: ${prefix + cmd} hi dev play command is not working`);

    const messageId = m.key.id;

    if (reportedMessages[messageId]) {
        return m.reply("This report has already been forwarded to the owner. Please wait for a response.");
    }

    reportedMessages[messageId] = true;

    const textt = `*| Rush/chat |*`;
    const teks1 = `\n\n*User*: @${m.sender.split("@")[0]}\n*Rush/chat*: ${text}`;
    const teks2 = `\n\n*Hi ${m.pushName}, your request has been forwarded to my Owners.*\n*Please wait..
    // Send the message to the first owner in the `owner` array
    gss.sendMessage(devlopernumber + "@s.whatsapp.net", {
        text: textt + teks1,
        mentions: [m.sender],
    }, {
        quoted: m,
    });

    // Send a reply to the user
    m.reply("OBA company command බාවිතා කලෙ company සහය සදහා හො user සහය සදහා හො OBAGE ගැටලුව අපට ලැබුනා අප පරික්ශාකරාවි ඇතැම් විට");
   }
};

export default report;
