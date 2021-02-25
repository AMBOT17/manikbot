//Client Module
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype
} = require('@adiwajshing/baileys')

//YTDL Module
const got = require("got");
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' )
const ID3Writer = require('browser-id3-writer');

//Require Module
const os = require('os')
const util = require('util')
const gis = require('g-i-s');
const fs = require('fs-extra')
const axios = require('axios')
const canvas = require('canvacord')
const fetch = require('node-fetch')
const GIF2Video = require('gif2video')
const base64Img = require('base64-img')
const ffmpeg = require('fluent-ffmpeg')
const download = require('download-file')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const { recognize } = require('./lib/ocr')
const { fetchJson } = require('./lib/fetcher')
const { color, bgcolor } = require('./lib/color')
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')

//JSON
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'))

  let {
  	CR,
    self,
    prefix,
    ownerName,
    ownerNumber 
    } = setting

blocked = []
const timeStart = Date.now() / 1000

//Function
function kyun(seconds){
  	function pad(s){
    	return (s < 10 ? '0' : '') + s;
  		}
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

function yourSelf () {
    if(self == true) {
        return false
    }else{
        return true
        }
    } 

//Client Start
async function starts() {
	const noir = new WAConnection()
	noir.logger.level = 'warn'
	console.log(banner.string)
	noir.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Please Scan QR Code!'))
	})
	noir.on('credentials-updated', () => {
		fs.writeFileSync('./kiana.json', JSON.stringify(noir.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Login Info Updated')
		})
	fs.existsSync('./kiana.json') && noir.loadAuthInfo('./kiana.json')
	noir.on('connecting', () => {
		start('2', 'Connecting...')
	})
	noir.on('open', () => {
		success('2', 'Connected')
	})
	await noir.connect({timeoutMs: 30*1000})

	noir.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	noir.on('chat-update', async (mek) => {
		try {
      		if (!mek.hasNewMessage) return
      		mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			global.blocked
			global.prefix
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const isGroups = from.endsWith('@g.us')
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''		
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)


	//Runtime
	function waktu(seconds) {  // BY TOBZ
              seconds = Number(seconds);
              var d = Math.floor(seconds / (3600 * 24));
              var h = Math.floor(seconds % (3600 * 24) / 3600);
              var m = Math.floor(seconds % 3600 / 60);
              var s = Math.floor(seconds % 60);
              var dDisplay = d > 0 ? d + (d == 1 ? " D,":" D,") : "";
              var hDisplay = h > 0 ? h + (h == 1 ? " H,":" H,") : "";
              var mDisplay = m > 0 ? m + (m == 1 ? " Min,":" Min,") : "";
              var sDisplay = s > 0 ? s + (s == 1 ? " Sec,":" Sec") : "";
              return dDisplay + hDisplay + mDisplay + sDisplay;
          }

            const tms = (Date.now() / 1000) - (timeStart);
            const cts = waktu(tms)

//HELP Command
const helpcmd = `「 *MANIK* 」

◪ *INFO*
  ❏ Ver: Baileys
  ❏ Prefix: 「  ${prefix}  」
  ❏ Creator: Noire-XV

◪ *SYSTEM*
  │
  ├─ ❏ ${prefix}ping
  ├─ ❏ ${prefix}exec
  ├─ ❏ ${prefix}runtime
  └─ ❏ ${prefix}setprefix

◪ *MODERATOR*
  │
  ├─ ❏ ${prefix}id
  ├─ ❏ ${prefix}add 
  ├─ ❏ ${prefix}kick 
  ├─ ❏ ${prefix}getpic
  ├─ ❏ ${prefix}demote
  ├─ ❏ ${prefix}promote
  ├─ ❏ ${prefix}setname
  ├─ ❏ ${prefix}setgcpic
  └─ ❏ ${prefix}everyone

◪ *DOWNLOADER*
  │
  ├─ ❏ ${prefix}play
  ├─ ❏ ${prefix}video
  ├─ ❏ ${prefix}music
  └─ ❏ ${prefix}ytsearch

◪ *WEEBS ZONE*
  │
  ├─ ❏ ${prefix}sauce
  ├─ ❏ ${prefix}wallanime
  ├─ ❏ ${prefix}neolatest
  └─ ❏ ${prefix}neosearch

◪ *HIDDEN*
  │
  ├─ ❏ ${prefix}priv
  ├─ ❏ ${prefix}hide
  └─ ❏ ${prefix}grup  

◪ *MEDIA*
  │
  ├─ ❏ ${prefix}ttp
  ├─ ❏ ${prefix}tts
  ├─ ❏ ${prefix}ocr
  ├─ ❏ ${prefix}img
  ├─ ❏ ${prefix}toimg 
  └─ ❏ ${prefix}sticker

◩ *MANIK*`

			//Notify
			mess = {
				wait: 'Loading...',
				download: 'Downloading...',
				success: 'Sukses!',
				error: {
					stick: 'Error terjadi saat konversi ke sticker!',
					Iv: 'Link tidak valid!'
				},
				only: {
					group: 'Hanya didalam grup!',
					ownerG: 'Hanya untuk Owner grup!',
					ownerB: 'Hanya untuk Owner!',
					admin: 'Hanya untuk Admin grup!',
					Badmin: 'Hanya ketika menjadi admin!'
				}
			}

			//Validator
			const botNumber = noir.user.jid
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await noir.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const ownerSend = '6285737134572@s.whatsapp.net'
			const isGroupAFK = isGroup ? groupafk.includes(from) : false
			const isOwner = ownerNumber.includes(sender)

			//CRMessage
			const dload = {
							key: {fromMe:true, participant: '6285737134572@s.whatsapp.net'}, message: {conversation: '*DOWNLOADER*'}
							}

			const crott = {quoted: {
         					key: {fromMe:true, participant: '6285737134572@s.whatsapp.net'}, message: {conversation: `*${CR}*`}
        					}}

			const executor = {quoted: {
         					key: {fromMe:true, participant: '6285737134572@s.whatsapp.net'}, message: {conversation: '*EXECUTOR*'}
        					}}

      //Additional Function
			const sleep = async (ms) => {
    			return new Promise(resolve => setTimeout(resolve, ms));
			}
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				noir.sendMessage(from, teks, text, crott)
			}
			const sendMess = (hehe, teks) => {
				noir.sendMessage(hehe, teks, text, crott)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? noir.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : noir.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

  		const evreply = (jid, text) => {
  				noir.sendMessage(jid, text, MessageType.extendedText, executor)
  			}

			const fast = moment().milliseconds()

			//MessageType
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

			//Switch Public
			if (body == `${prefix}public`){
        	if (!isOwner) return
        	if(setting.self === false) return noir.sendMessage(from, `Public telah diaktifkan baru baru ini!` , MessageType.text, crott);        	setting.self = false
        	self = false
        	fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
        	noir.sendMessage(from, '*PUBLIC MODE!*', MessageType.text, crott)
   	 		}

		  //Command
		  if (isOwner && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(ownerName), 'in', color(groupName))
		  if (yourSelf() || isOwner){
    	switch (command) {
    	//SOUND
      case 'iri':
       		noir.sendMessage(from, fs.readFileSync("./sound/iri.mp3"), MessageType.audio, {quoted: mek, ptt:true});
            break
      case 'tapi':
			noir.sendMessage(from, fs.readFileSync("./sound/tapi.mp3"), MessageType.audio, {quoted: mek, ptt:true});
            break
            
    	//System
      case 'menu':
      case 'help':
            noir.sendMessage(from, helpcmd, MessageType.text, crott);
            break
      case 'runtime':
			      noir.sendMessage(from , `Runtime:\n❏ ${cts}`, MessageType.text, crott)
            break
      case 'self':
        	if (!isOwner) return
            if (setting.self === true) return noir.sendMessage(from, `Self telah diaktifkan baru baru ini!` , MessageType.text, crott);           
            setting.self = true
            self = true
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null, 2))
            noir.sendMessage(from, '*SELF MODE!*', MessageType.text, crott)
            break
      case 'ping':
            noir.sendMessage(from, `RAM Usage: _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB_ / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\nCPU: _${os.cpus()[0].model}_\n\nSpeed: _0.${fast}ms_` ,MessageType.text, crott);
            break
      case 'setprefix':
            if (!isOwner) return
            const pref = body.slice(11) 
            setting.prefix = `${pref}`
            prefix = `${pref}`
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2))
            noir.sendMessage(from, `Berhasil mengganti prefix ke : " ${pref} "` ,MessageType.text, crott);
            break
      case 'exec':
        	if (!isOwner) return
        	const eva = body.slice(6)
        	var user = os.userInfo().username;
        	if (args.length < 1) return reply('Tolong input kode!')
        	exec(eva, async (err, stdout, stderr) => {
        	if (err) {
            	return await noir.sendMessage(from, '❏ ' + user + '\n❏ Code: ' + eva + '\n________________________\n\n' + err, text, executor);
        	}
        		return await noir.sendMessage(from, '❏ ' + user + '\n❏ Code: ' + eva + '\n________________________\n\n' + stdout, text, executor);
      		});
        	break

    	//Admin Group
    case 'id':
    	 noir.sendMessage(ownerSend, from, MessageType.text, crott);
     break
		case 'add': //OnlyAdmin
			if (!isGroup) return reply(mess.only.group)
			if (args.length < 1) return reply('Tolong input nomor!')
			if (args[0].startsWith('08')) return reply('Tolong gunakan kode negara!')
				try {
					num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
					noir.groupAdd(from, [num])
				} catch (e) {
					console.log('Error :', e)
					reply('Error!, mungkin diprivate.')
				}
			break
		case 'kick': //OnlyAdmin
			if (!isGroup) return reply(mess.only.group)
			if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di kick!')
			mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
			if (mentioned.length > 1) {
				teks = 'Mengeluarkan :\n'
				for (let _ of mentioned) {
					teks += `@${_.split('@')[0]}\n`
				}
				mentions(teks, mentioned, true)
				noir.groupRemove(from, mentioned)
			} else {
				mentions(`Mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
				noir.groupRemove(from, mentioned)
			}
			break
		case 'promote':
			if (!isGroup) return reply(mess.only.group)
			if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin dijadikan admin!')
			mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
			if (mentioned.length > 1) {
				teks = ''
				for (let _ of mentioned) {
				teks += `Berhasil menjadikan admin grup!\n`
				teks += `@${_.split('@')[0]}`
				}
				mentions(teks, mentioned, true)
				noir.groupMakeAdmin(from, mentioned)
			} else {
				mentions(`Sukses!, @${mentioned[0].split('@')[0]} telah menjadi admin grup.`, mentioned, true)
				noir.groupMakeAdmin(from, mentioned)
			}
			break
    case 'demote':
			if (!isGroup) return reply(mess.only.group)
			if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin dihapus sebagai admin!')
			mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
			if (mentioned.length > 1) {
				teks = ''
				for (let _ of mentioned) {
				teks += `Berhasil menghapus admin grup!\n`
				teks += `@${_.split('@')[0]}`
				}
				mentions(teks, mentioned, true)
				noir.groupDemoteAdmin(from, mentioned)
			} else {
				mentions(`Sukses! @${mentioned[0].split('@')[0]} telah dihapus sebagai admin!`, mentioned, true)
				noir.groupDemoteAdmin(from, mentioned)
			}
			break
		case 'hide': //Hide-Tag
			if (!isGroup) return
			const hider = body.slice(6)
			const phide = hider.split('|')[0]
			const pgrup = hider.split('|')[1]
			var value = text.replace(text.split(' ')[0], `${phide}`)
			var group = await noir.groupMetadata(pgrup)
			var member = group['participants']
			var ids = []
			member.map( async adm => {
   				ids.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var options = {
    		text: value,
    		contextInfo: { mentionedJid: ids },
    		quoted: mek
			}
			noir.sendMessage(pgrup, options, MessageType.text)
			break
		case 'getpic':
			if (!isGroup) return reply(mess.only.group)
			if (args.length < 1) return reply('Mohon tag target!')
			if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target!')
			mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
			let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
				try {
					pp = await noir.getProfilePicture(id)
					buffer = await getBuffer(pp)
					noir.sendMessage(from, buffer, image, {quoted: mek, caption: 'Success!'})
				} catch (e) {
					reply('Error!')
					}
			break
		case 'setgcpic': 
      if (!isGroup) return reply(mess.only.group)
      await sleep(2000)
      media = await noir.downloadAndSaveMediaMessage(mek)
      await noir.updateProfilePicture (from, media)
      reply('Sukses ganti icon grup.')
      break
		case 'setname': //Only Admin
			const nameg = body.slice(9)
    		let idgrup = `${from.split("@s.whatsapp.net")[0]}`;
    		noir.groupUpdateSubject(idgrup, nameg)
			noir.sendMessage(from, `Berhasil ganti nama grup ke: ${nameg}.`, MessageType.text, crott)
			break 
		case 'everyone':
			if (!isGroup) return reply(mess.only.group)
			members_id = []
			teks = (args.length > 1) ? body.slice(10).trim() : ''
			teks += '┌ 「 Kiana Mention 」\n│\n'
			for (let mem of groupMembers) {
				teks += `├─ @${mem.jid.split('@')[0]}\n`
				members_id.push(mem.jid)
				}
			teks += '│\n'
            teks += '└── 「 ₭iana-EV2 」'
			mentions(teks, members_id, true)
			break

		//Downloader
		case 'ytsearch':
			if (args.length < 1) return reply('Tolong masukan query!')
			const srch = body.slice(10)
			reply(mess.wait)
			try {
        		var aramas = await yts(srch);
   			} catch {
        		return await noir.sendMessage(from, 'Error!', MessageType.text, dload)
    		}
    		aramat = aramas.all 
    		var tbuff = await getBuffer(aramat[0].image)
    		var ytresult = '';
    			ytresult += '「 *YOUTUBE SEARCH* 」'
    			ytresult += '\n________________________\n\n'
   			aramas.all.map((video) => {
        		ytresult += '❏ Title: ' + video.title + '\n'
            	ytresult += '❏ Link: ' + video.url + '\n________________________\n\n'
    		});
    		ytresult += '◩ *MANIK*'
    		await noir.sendMessage(from, tbuff, image, {quoted: mek, caption: ytresult})
			break
		case 'video':
			if (args.length < 1) return reply('Tolong masukan url!')
			const urlvid = body.slice(7)
		    try {
        		var aramav = await yts({videoId: ytdl.getURLVideoID(urlvid)});
    		} catch {
        		return await noir.sendMessage(from, 'Error!', MessageType.text, dload)
    		}
    		await reply(mess.download)
    		var yt = ytdl(aramav.videoId, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
  			yt.pipe(fs.createWriteStream('./' + aramav.videoId + '.mp4'));
  			yt.on('end', async () => {
  			playvid = `*「 YOUTUBE VIDEO 」*\n\n❏ *Title* : ${aramav.title}\n❏ *By* : ${aramav.author.name}\n\n◩ *MANIK*`	
        	await noir.sendMessage(from, fs.readFileSync('./' + aramav.videoId + '.mp4'), video, {mimetype: Mimetype.mp4, quoted: mek, caption: playvid});
        	fs.unlinkSync('./' + aramav.videoId + '.mp4')
        	});
			break
		case 'music':
			if (args.length < 1) return reply('Tolong masukan url!')
			const urlmsc = body.slice(7)
		    try {
        		var aramam = await yts({videoId: ytdl.getURLVideoID(urlmsc)});
    		} catch {
        		return await noir.sendMessage(from, 'Error!', MessageType.text, dload)
    		}
    		await reply(mess.download)
    		let titles = 'kianamusic'
    		let streams = ytdl(aramam.videoId, {
        				quality: 'highestaudio',
   						});
    		var mbuff = await getBuffer(aramam.image)
    		got.stream(aramam.image).pipe(fs.createWriteStream(titles + '.jpg'));
    		ffmpeg(streams)
        		.audioBitrate(320)
        		.save('./' + titles + '.mp3')
        		.on('end', async () => {
            	const writers = new ID3Writer(fs.readFileSync('./' + titles + '.mp3'));
            	writers.setFrame('TIT2', aramam.title)
                .setFrame('TPE1', [aramam.author.name])
                .setFrame('APIC', {
                    type: 3,
                    data: fs.readFileSync(titles + '.jpg'),
                    description: aramam.description
                });
            writers.addTag();
            playmsc = `*「 YOUTUBE MUSIC 」*\n\n❏ *Title* : ${aramam.title}\n❏ *By* : ${aramam.author.name}\n\n_Sending Audio..._`
            await noir.sendMessage(from, mbuff, image, {quoted: mek, caption: playmsc})
            await noir.sendMessage(from, Buffer.from(writers.arrayBuffer), audio, {mimetype: Mimetype.mp4Audio, ptt: false, quoted: mek});
        	fs.unlinkSync(titles + '.jpg')
        	fs.unlinkSync('./' + titles + '.mp3')
        	});
			break
		case 'play':
			if (args.length < 1) return reply('Tolong masukan judul!')
			const ssong = body.slice(6)
			let arama = await yts(ssong);
			arama = arama.all;
			if(arama.length < 1) return await noir.sendMessage(from, 'Error!', MessageType.text, dload)
    		await reply(mess.download)
    		var pbuff = await getBuffer(arama[0].image)
    		let title = arama[0].title.replace(' ', '+');
    		let stream = ytdl(arama[0].videoId, {
        				quality: 'highestaudio',
   						});
    	    got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
    		ffmpeg(stream)
        		.audioBitrate(320)
        		.save('./' + title + '.mp3')
        		.on('end', async () => {
            	const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
            	writer.setFrame('TIT2', arama[0].title)
                .setFrame('TPE1', [arama[0].author.name])
                .setFrame('APIC', {
                    type: 3,
                    data: fs.readFileSync(title + '.jpg'),
                    description: arama[0].description
                });
            writer.addTag();
            playres = `*「 NOW PLAYING 」*\n\n❏ *Title* : ${arama[0].title}\n❏ *By* : ${arama[0].author.name}\n\n_Sending Audio..._`
            await noir.sendMessage(from, pbuff, image, {quoted: mek, caption: playres})
            await noir.sendMessage(from, Buffer.from(writer.arrayBuffer), audio, {mimetype: Mimetype.mp4Audio, ptt: false, quoted: mek});
        	fs.unlinkSync(title + '.jpg')
        	fs.unlinkSync('./' + title + '.mp3')
        	});
			break

		//WeebsZone
		case 'sauce':
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				reply(mess.wait)
				const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
				media = await noir.downloadMediaMessage(encmedia)
				await wait(media).then(res => {
					noir.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
					}).catch(err => {
						reply(err)
					})
			} else {
				reply('Harap kirim foto/gambar adegan anime!')
				}
			break
		case 'neolatest':
			reply(mess.wait)
            dataneos = await fetchJson(`https://enznoire.herokuapp.com/neolatest`, {method: 'get'})
            dataresq = dataneos.result
            neobuff = await getBuffer(dataresq[0].thumb)
            let neoqs = `*NEONIME UPDATE*`
                for (let i = 0; i < dataresq.length; i++) {
                    if (i==5)
                    {
                    break;
                    }
                    neoqs += `\n________________________\n\n❏ *Date* : ${dataresq[i].date}\n❏ *Title* : ${dataresq[i].title}\n❏ *Link* : ${dataresq[i].link}\n❏ *Desc* : ${dataresq[i].desc}\n`
                }
            await noir.sendMessage(from, neobuff, image, {quoted: mek, caption: neoqs})
            break
		case 'neosearch':
			if (args.length < 1) return reply('Tolong masukan query anime!')
			neoquery = body.slice(11)
			reply(mess.wait)
            neodata = await fetchJson(`https://enznoire.herokuapp.com/neonime?q=${neoquery}`, {method: 'get'})
            neores = neodata.result
            neoqbuff = await getBuffer(neores[0].thumb)
            let neos = `*NEONIME*\n\nQuery : ${neoquery}`
                for (let i = 0; i < neores.length; i++) {
                    if (i==5)
                    {
                    break;
                    }
                    neos += `\n________________________\n\n❏ *Title* : ${neores[i].title}\n❏ *Link* : ${neores[i].link}\n❏ *Desc* : ${neores[i].desc}\n`
                }
            await noir.sendMessage(from, neoqbuff, image, {quoted: mek, caption: neos})
            break
        case 'wallanime' :
        	reply(mess.wait)
            walnimea = ['https://wallpaperaccess.com/full/395986.jpg','https://wallpaperaccess.com/full/21628.jpg','https://wallpaperaccess.com/full/21622.jpg','https://wallpaperaccess.com/full/21612.jpg','https://wallpaperaccess.com/full/21611.png','https://wallpaperaccess.com/full/21597.jpg','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://wallpaperaccess.com/full/21591.jpg','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            walnimer = walnimea[Math.floor(Math.random() * walnimea.length)]
            wallbuff = await getBuffer(walnimer)
            await noir.sendMessage(from, wallbuff, image, crott)
            break

		//CostumReply
		case 'grup':
			if (!isGroup) return reply(mess.only.group)
			if (args.length < 1) return reply('Ketik [ kamu|dia|tag ]')
			var split = args.join(' ').replace(/@|\d/gi, '').split('|')
			var korban = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
			const opsi = {
				contextInfo: {
					participant: korban,
					quotedMessage: {
						extendedTextMessage: {
							text: split[1]
						}
					}
				}
			}
			noir.sendMessage(from, `${split[0]}`, MessageType.text, opsi)
			break
		case 'priv': //Dilahan kosong
			if (args.length < 1) return reply('Ketik [ kamu|dia|nomordia ]')
			const textp = body.slice(6)
			const katakita2 = textp.split("|")[0]
			const kataorg2 = textp.split("|")[1]
			const noorg2 = textp.split("|")[2]
			noir.sendMessage(`${noorg2}@s.whatsapp.net`, `${katakita2}`, MessageType.text, {quoted: { key: {fromMe:false, participant:`${noorg2}@s.whatsapp.net`},
			message: { conversation: `${kataorg2}`}}
			});	
			break

		//Media
    case 'sticker':
      if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
      const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
      const media = await noir.downloadAndSaveMediaMessage(encmedia)
      ran = getRandom('.webp')
      await ffmpeg(`./${media}`)
          .input(media)
          .on('start', function (cmd) {
          console.log(`Started : ${cmd}`)
          })
          .on('error', function (err) {
          console.log(`Error : ${err}`)
          fs.unlinkSync(media)
          reply(mess.error.stick)
          })
          .on('end', function () {
          console.log('Finish')
          buff = fs.readFileSync(ran)
          noir.sendMessage(from, buff, sticker, {quoted: mek})
          fs.unlinkSync(media)
          fs.unlinkSync(ran)
          })
          .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
          .toFormat('webp')
          .save(ran)
      } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
        const media = await noir.downloadAndSaveMediaMessage(encmedia)
        ran = getRandom('.webp')
        reply(mess.wait)
        await ffmpeg(`./${media}`)
            .inputFormat(media.split('.')[1])
            .on('start', function (cmd) {
            console.log(`Started : ${cmd}`)
            })
            .on('error', function (err) {
            console.log(`Error : ${err}`)
            fs.unlinkSync(media)
            tipe = media.endsWith('.mp4') ? 'video' : 'gif'
            reply(`Error ${tipe} saat konversi ke sticker`)
            })
            .on('end', function () {
            console.log('Finish')
            buff = fs.readFileSync(ran)
            noir.sendMessage(from, buff, sticker, {quoted: mek})
            fs.unlinkSync(media)
            fs.unlinkSync(ran)
            })
            .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
            .toFormat('webp')
            .save(ran)
      } else {
        reply(`Kirim/Reply gambar dengan ${prefix}sticker`)
        }
      break
    case 'ttp':
      pngttp = './temp/ttp.png'
      webpng = './temp/ttp.webp'
      const ttptext = body.slice(5)
      fetch(`https://api.areltiyan.site/sticker_maker?text=${ttptext}`, { method: 'GET'})
        .then(async res => {
          const ttptxt = await res.json()
          console.log("SUCCESS!")
          base64Img.img(ttptxt.base64, 'temp', 'ttp', function(err, filepath) {
            if (err) return console.log(err);
              exec(`ffmpeg -i ${pngttp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${webpng}`, (err) => {
            buffer = fs.readFileSync(webpng)
            noir.sendMessage(from, buffer, sticker, {quoted: mek})
            fs.unlinkSync(webpng)
            fs.unlinkSync(pngttp)
            })
        })
        });
      break
		case 'ocr':
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
				const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
				const media = await noir.downloadAndSaveMediaMessage(encmedia)
				reply(mess.wait)
				await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
						.then(teks => {
							noir.sendMessage(from, `OCR Result:\n\n${teks.trim()}`, MessageType.text, crott)
							fs.unlinkSync(media)
							})
							.catch(err => {
							reply(err.message)
							fs.unlinkSync(media)
							})
					} else {
						reply('Kirim/Reply Gambar!')
					}
			break
		case 'toimg':
			if (!isQuotedSticker) return reply('Reply sticker!')
			reply(mess.wait)
			encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
			media = await noir.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.png')
			exec(`ffmpeg -i ${media} ${ran}`, (err) => {
			fs.unlinkSync(media)
			if (err) return reply('Error saat mengkonversi sticker ke gambar!')
				buffer = fs.readFileSync(ran)
				noir.sendMessage(from, buffer, image, {quoted: mek, caption: 'Success!'})
				fs.unlinkSync(ran)
				})
			break
		case 'tts':
			if (args.length < 1) return noir.sendMessage(from, 'Tolong Input kode bahasa!', text, crott)
			const gtts = require('./lib/gtts')(args[0])
			if (args.length < 2) return noir.sendMessage(from, 'Tolong Input teks!', text, crott)
				dtt = body.slice(8)
				ranm = getRandom('.mp3')
				rano = getRandom('.ogg')
				dtt.length > 600
				? reply('Text melebihi batas!')
				: gtts.save(ranm, dtt, function() {
				exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
					fs.unlinkSync(ranm)
					buff = fs.readFileSync(rano)
					if (err) return reply('Error!')
					noir.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
					fs.unlinkSync(rano)
				})
				})
			break
        case 'img':
        	if (args.length < 1) return reply('Masukan query!')
        	const gimg = body.slice(5)
            reply(mess.wait)        	
        	gis(gimg, async (error, result) => {
        		for (var i = 0; i < (result.length < 3 ? result.length : 3); i++) {
            		 var get = got(result[i].url);
           	 		 var stream = get.buffer();
            	stream.then(async (images) => {
                await noir.sendMessage(from, images, image, {quoted: mek});
            	});
        		}
    		});
        	break

		}
	}
	} catch (e) {
		console.log('Error : %s', color(e, 'red'))
	}
})
}
starts()