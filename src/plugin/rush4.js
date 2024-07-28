import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

const alive = async (m, Matrix) => {
  const uptimeSeconds = process.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
    if (['rush1', 'rus', 'ru'].includes(cmd)) {

  const uptimeMessage = `*📸 RUSH-MD Last vertion*
_________________________________________

හායි මාව හැදුවෙ rush එයාගෙ youtube එකක් නැ 
ඔයා එයාට කරන උපකාරයක් විදියට youtube එකෙ ashu academy කියන නිල් logo එකෙ chanel එක subribe කරනවනම් rush සතුටු වෙයි 😎😘
_________________________________________
`;

  const buttons = [
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "supprt",
            id: `.request`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "මෙමcommandඔබටyodaගතnohaka",
            id: `.request`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "owner",
            id: `.owner`
          })
         }
        ];

  const msg = generateWAMessageFromContent(m.from, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: uptimeMessage
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "® Powered By 𝗥𝘂𝘀𝗵-𝗠𝗗 𝗼𝗻𝗹𝘆 𝗼𝘂𝗿 𝗰𝗼𝘂𝗻𝘁𝗿𝘆 𝗮𝗻𝗱 𝘃𝗲𝗿𝘆 𝘀𝗮𝗳𝗲"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "",
            gifPlayback: true,
            subtitle: "",
            hasMediaAttachment: false 
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons
          }),
          contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedwhatsappchannelMessageInfo: {
                  whatsappchannelJid: 'https://whatsapp.com/channel/0029VajRZspB4hdTcKgyqW0g',
                  whatsappchannelName: "Rush-MD",
                  serverMessageId: 143
                }
              }
        }),
      },
    },
  }, {});

  await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
    }
};

export default alive;
