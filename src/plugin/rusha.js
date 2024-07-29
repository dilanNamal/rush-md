import ytSearch from 'yt-search';
import axios from 'axios';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const searchResultsMap = new Map();
let searchIndex = 1;

const songcommand = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;

  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
    }
  }

  const selectedId = selectedListId || selectedButtonId;
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['song'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply('*Please provide a search query*');
    }

    try {
      await m.React("🕘");

      const searchResults = await ytSearch(text);
      const videos = searchResults.videos.slice(0, 5);

      if (videos.length === 0) {
        m.reply('No results found.');
        await m.React("❌");
        return;
      }

      videos.forEach((video, index) => {
        const uniqueId = searchIndex + index;
        searchResultsMap.set(uniqueId, video);
      });

      const currentResult = searchResultsMap.get(searchIndex);
      const buttons = [
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🎶 RUSH SEVER1", id: `media_audio_${searchIndex}` }) },
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🎶RUSH SEVER2", id: `media_video_${searchIndex}` }) },
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🎵 AUDIO DOCUMENT", id: `media_videodoc_${searchIndex}` }) },
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🔍NOT AVAILABLE ", id: `media_audiodoc_${searchIndex}` }) },
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🐥 ඊලඟ ", id: `next_${searchIndex + 1}` }) }
      ];

      const thumbnailUrl = currentResult.thumbnail;
      const url = `https://www.youtube.com/watch?v=${currentResult.videoId}`;

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `*RUSH-MD YOUTUBE SEARCH*\n\n> *TITLE:* ${currentResult.title}\n> *AUTHOR:* ${currentResult.author.name}\n> *VIEWS:* ${currentResult.views}\n> *DURATION:* ${currentResult.timestamp}\n> *YTLINK:* ${url}\n`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({ text: "© Powered By YOU-CAN-VIEW-NEW-BOT-ASHU-ACADEMY-YOUTUBE-CHANEL" }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer })),
                title: "",
                gifsongback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
      await m.React("✅");

      searchIndex += 1;
    } catch (error) {
      console.error("Error processing your request:", error);
      m.reply('Error processing your request.');
      await m.React("❌");
    }
  } else if (selectedId) {
    if (selectedId.startsWith('next_')) {
      const nextIndex = parseInt(selectedId.replace('next_', ''));
      const currentResult = searchResultsMap.get(nextIndex);

      if (!currentResult) {
        return m.reply('No more results.');
      }
      const buttons = [
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🎶 RUSH SEVER1", id: `media_audio_${nextIndex}` }) },
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🎶RUSH SEVER2", id: `media_videodoc_${nextIndex}` }) },
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🎵 AUDIO DOCUMENT", id: `media_audiodoc_${nextIndex}` }) },
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🔍NOT AVAILABLE ", id: `media_videodoc_${nextIndex}` }) },
        { "name": "quick_reply", "buttonParamsJson": JSON.stringify({ dissong_text: "🐥 ඊලඟ ", id: `next_${nextIndex + 1}` }) }
      ];

      const thumbnailUrl = currentResult.thumbnail;
      const url = `https://www.youtube.com/watch?v=${currentResult.videoId}`;

      const msg = generateWAMessageFromContent(m.from, {
        viewOnceMessage: {
          message: {
            messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `*RUSH-MD YOUTUBE SEARCH*\n\n> *🔍TITLE:* ${currentResult.title}\n> *AUTHOR:* ${currentResult.author.name}\n> *VIEWS:* ${currentResult.views}\n> *DURATION:* ${currentResult.timestamp}\n> *YTLINK:* ${url}`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({ text: "© Powered By YOU-CAN-VIEW-NEW-BOT-ASHU-ACADEMY-YOUTUBE-CHANEL" }),
              header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl } }, { upload: Matrix.waUploadToServer })),
                title: "",
                gifsongback: true,
                subtitle: "",
                hasMediaAttachment: false 
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ buttons }),
              contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 9999,
                isForwarded: true,
              }
            }),
          },
        },
      }, {});

      await Matrix.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
    } else if (selectedId.startsWith('media_')) {
      const parts = selectedId.split('_');
      const type = parts[1];
      const key = parseInt(parts[2]);
      const selectedMedia = searchResultsMap.get(key);

      if (selectedMedia) {
        try {
          const mediaType = type.includes('audio') ? 'audio' : 'video';
          const apiUrl = `https://matrix-serverless-api.vercel.app/api/ytdl?url=${encodeURIComponent(selectedMedia.url)}&type=${mediaType}`;

          const { data: mediaData } = await axios.get(apiUrl);

          if (mediaData.videoURL || mediaData.audioURL) {
            const mediaUrl = mediaData.videoURL || mediaData.audioURL;
            const { data: buffer } = await axios.get(mediaUrl, { responseType: 'arraybuffer' });

            let content;

            if (type === 'audio') {
              content = {
                audio: buffer,
                mimetype: 'audio/mpeg',
                ptt: false,
                fileName: `${selectedMedia.title}.mp3`,
                contextInfo: {
                  mentionedJid: [m.sender],
                  externalAdReply: {
                    title: "↺ |◁   II   ▷|   ♡",
                    body: `Now songing: ${selectedMedia.title}`,
                    thumbnailUrl: selectedMedia.thumbnail,
                    sourceUrl: selectedMedia.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                  }
                }
              };
              await Matrix.sendMessage(m.from, content, { quoted: m });
            } else if (type === 'video') {
              content = {
                video: buffer,
                mimetype: 'video/mp4',
                caption: `> TITLE: ${selectedMedia.title}\n\n*Downloaded by YOU-CAN-VIEW-NEW-BOT-ASHU-ACADEMY-YOUTUBE-CHANEL*`
              };
              await Matrix.sendMessage(m.from, content, { quoted: m });
            } else if (type === 'audiodoc' || type === 'videodoc') {
              content = {
                document: buffer,
                mimetype: type === 'audiodoc' ? 'audio/mpeg' : 'video/mp4',
                fileName: `${selectedMedia.title}.${type === 'audiodoc' ? 'mp3' : 'mp4'}`,
                caption: `*Downloaded by YOU-CAN-VIEW-NEW-BOT-ASHU-ACADEMY-YOUTUBE-CHANEL*`,
                contextInfo: {
                  externalAdReply: {
                    showAdAttribution: true,
                    title: selectedMedia.title,
                    body: 'RUSH-MD',
                    thumbnailUrl: selectedMedia.thumbnail,
                    sourceUrl: selectedMedia.url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                  }
                }
              };
              await Matrix.sendMessage(m.from, content, { quoted: m });
              await m.React("✅");
            } else {
              m.reply('Error fetching media.');
              await m.React("❌");
            }
          } else {
            m.reply('Error fetching media.');
            await m.React("❌");
          }
        } catch (error) {
          console.error("Error processing your request:", error);
          m.reply('Error processing your request.');
          await m.React("❌");
        }
      } else {
        // m.reply('Invalid media selection.'); // Uncomment if needed
      }
    }
  }
};

export default songcommand;

