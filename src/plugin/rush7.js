import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';

import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}
// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const test = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;
  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
     // console.log(selectedListId);
    }
  }
  const selectedId = selectedListId || selectedButtonId;
  
  const prefix = /^[\\/!#.]/gi.test(m.body) ? m.body.match(/^[\\/!#.]/gi)[0] : '.';
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).toLowerCase() : '';
        let rush = {
    public: true // or false
};

let mode = rush.public ? 'public' : 'private';

        const validCommands = ['rushh'];

  if (validCommands.includes(cmd)) {
    let msg = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `╭─────────────━┈⊷
│📸 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: *RUSH-MD*
│📸 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: 2.0.1
│📸 𝗢𝗪𝗡𝗘𝗥 : *RUSH*      
│📸 𝗡𝗨𝗠𝗕𝗘𝗥: 94761111111
│📸 ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
│🌈 ᴍᴏᴅᴇ: *${mode}*
│🌈 ᴘʀᴇғɪx: *[Multi-Prefix]*
╰─────────────━┈⊷ `
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "® Powered By Rush-MD"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./src/rusi.jpg')}, { upload: Matrix.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false  
                }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  "name": "single_select",
                  "buttonParamsJson": `{"title":"🌈 rush other menu",
                 "sections":
                   [{
                    "title":"❄️ 𝛯Rush md all menu",
                    "highlight_label":"🦄 all𝛯menu",
                    "rows":[
                      {
                       "header":"",
                       "title":"🦄subcribe",
                       "description":"all menu powerd by rush sever",
                       "id":"view all rushhh"
                      },
                  {
                        "header":"",
                        "title":" Back",
                        "description":"🐥rush",
                        "id":".rush1"
                      }
                    ]}
                  ]}`
                },
              ],
            }),
            contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '111247135789999999@newsletter',
                  newsletterName: "Rush-MD",
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
      if (selectedId == "view all rushhh") {
        const mode = process.env.MODE;
        const str = `hey ${m.pushName} ${pushwish}
╭─────────────━┈⊷
│📸 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: *RUSH-MD*
│📸 𝗩𝗘𝗥𝗦𝗜𝗢𝗡: 2.0.1
│📸 𝗢𝗪𝗡𝗘𝗥 : *RUSH*      
│📸 𝗡𝗨𝗠𝗕𝗘𝗥: 94761111111
│📸ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
│🦄 ᴍᴏᴅᴇ: *${mode}*
│🦄 ᴘʀᴇғɪx: *[Multi-Prefix]*
╰─────────────━┈⊷ 
╭━❮ Rush-md other menu  ❯━╮
┃❄️ rush හායි මම 
 රශ් හදපු ai එකක්
 රශ් youtube එකක් නැත
 ashu academy කියන නිල් logo youtube 
chanel එක subribe කරලා නැද්ද
දැන්ම සබ්ස්ක්‍රයිබ් කරලා එකතු වෙන්නවෙන්න
rush md ඔයාලගෙන් ඉල්ලන දේ එක
╰━━━━━━━━━━━━━━━⪼
   `;
        let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `Rush-MD`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'Rush-MD'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/rusi.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '111247135789999999@newsletter',
                  newsletterName: "Rush-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: fgg
});
}
};

export default test;
