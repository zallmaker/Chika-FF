let limit = 30
let fetch = require('node-fetch')
const { servers, yta } = require('../lib/y2mate')
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) throw `contoh:\n${usedPrefix + command} https://www.youtube.com/watch?v=yxDdj_G9uRY`
  let chat = global.db.data.chats[m.chat]
  let server = (args[1] || servers[0]).toLowerCase()
  let sender = m.sender
    let pp = await conn.profilePictureUrl(sender, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  let ftrol = {
    key : {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: `Nih Audio Nya, Selamat Menikmati ๐ง`, 
    orderTitle: `โฎMenu โธ`,
    thumbnail: awaitย conn.resize(await (await fetch(pp)).buffer(), 300, 300), //Gambarnye
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
  let { dl_link, thumb, title, filesize, filesizeF } = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  m.reply(isLimit ? `Ukuran File: ${filesizeF}\nUkuran file diatas ${limit} MB, download sendiri: ${dl_link}` : global.wait)
  if (!isLimit) conn.sendFile(m.chat, dl_link, title + '.mp3', `
โโโโโโโโโโโโโโ
โ *YOUTUBE MP3*
โโโโโโโโโโโโ
โโข *Judul:* ${title}
โโข *Type:* MP3
โโข *๐ฅ Ukuran File:* ${filesizeF}
โโ
`.trim(), ftrol, null, {
    asDocument: chat.useDocument, mimetype: 'audio/mp4', ptt: false, contextInfo: {
        externalAdReply: { showAdAttribution:ย true,
            title: 'โถ๏ธ โโโโโโโโขโโโโโโโโโโโโโโโโโโ ', 
            body: 'Now Playing...',
            description: 'Now Playing...',
            mediaType: 2,
          thumbnail: await (await fetch(thumb)).buffer(),
         mediaUrl: `https://youtube.com/watch?v=uIedYGN3NQQ`
        }
     }
  })
}
handler.help = ['mp3', 'a'].map(v => 'yt' + v + ` <url>`)
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler
