import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';

const { generateWAMessageFromContent, proto } = pkg;

import axios from 'axios'; // Import axios for HTTP requests

const handlerush1Command = async (m, Matrix) => {

  const rush1Url = 'https://api.github.com/rush1s/Rush-md/Rush-MD';

  try {

    const response = await axios.get(rush1Url);

    const rush1Data = response.data;

    const { full_name, name, forks_count, stargazers_count, created_at, updated_at, owner } = rush1Data;

    const messageText = `📊 rush1sitory Information:

හලො මම rush ගෙ ai එක ඔයා එයාලගෙ chanel එකට subribe කරලද ඔය දැම් chat එකෙන් අයිම් වෙන්නෙ https://youtube.com/shorts/eGzCQdYrivg?si=amzz61OzWfr8dVtu
🐥🐥

    \n👤 *Owner:* ${owner.login}`;

    const rush1Message = generateWAMessageFromContent(m.from, {

      viewOnceMessage: {

        message: {

          messageContextInfo: {

            deviceListMetadata: {},

            deviceListMetadataVersion: 2

          },

          interactiveMessage: proto.Message.InteractiveMessage.create({

            body: proto.Message.InteractiveMessage.Body.create({

              text: messageText

            }),

            footer: proto.Message.InteractiveMessage.Footer.create({

              text: "® Powered By Rush-MD"

            }),

            header: proto.Message.InteractiveMessage.Header.create({

             ...(await prepareWAMessageMedia({ image: { url: `https://telegra.ph/file/e1fd8689e69a7baa4920d.jpg` } }, { upload: Matrix.waUploadToServer })),

              title: "",

              gifPlayback: true,

              subtitle: "",

              hasMediaAttachment: false 

            }),

            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({

              buttons: [

                {

                  name: "quick_reply",

                  buttonParamsJson: JSON.stringify({

                    display_text: "Contact Owner",

                    id: ".owner"

                  })

                },

                {

                  name: "cta_url",

                  buttonParamsJson: JSON.stringify({

                    display_text: "Click Here To Fork",

                    url: `https://github.com/closed-md/closed-MD/fork`

                  })

                },

                {

                  name: "cta_url",

                  buttonParamsJson: JSON.stringify({

                    display_text: "Join Our Community",

                    url: `https://whatsapp.com/channel/0029VajRZspB4hdTcKgyqW0g`

                  })

                }

              ],

            }),

            contextInfo: {

              mentionedJid: [m.sender],

              forwardingScore: 9999,

              isForwarded: true,

            }

          }),

        },

      },

    }, {});

    await Matrix.relayMessage(rush1Message.key.remoteJid, rush1Message.message, {

      messageId: rush1Message.key.id

    });

    await m.React("✅");

  } catch (error) {

    console.error("Error processing your request:", error);

    m.reply('Error processing your request.');

    await m.React("❌");

  }

};

const searchrush1 = async (m, Matrix) => {

  const prefixMatch = m.body.match(/^[\\/!#.]/);

  const prefix = prefixMatch ? prefixMatch[0] : '/';

  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['rush1', 'sc', 'script'];

  if (validCommands.includes(cmd)) {

    await handlerush1Command(m, Matrix);

  }

};

export default searchrush1;
           

   
              
              
            
   
