const axios = require("axios");
const fs = require('fs')
const baseApiUrl = async () => {
  const base = await axios.get(
`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.api;
};
module.exports = {
  config: {
    name: "sing",
    version: "1.1.5",
    aliases: [ "music", "play"],
    author: "dipto",
    countDown: 5,
    role: 0,
    description: {
      en: "Download audio from YouTube"
    },
    category: "media",
    guide: {
      en: "{pn} [<song name>|<song link>]:"+ "\n   Example:"+"\n{pn} chipi chipi chapa chapa"
    }
  },
  onStart: async ({api,args, event,commandName, message }) =>{
    const checkurl = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})(?:\S+)?$/;
    let videoID;
    const urlYtb = checkurl.test(args[0]);
     
if (urlYtb) {
  const match = args[0].match(checkurl);
  videoID = match ? match[1] : null;
        const { data: { title, downloadLink } } = await axios.get(
          `${await baseApiUrl()}/ytDl3?link=${videoID}&format=mp3`
        );
    return  api.sendMessage({
      body: title,
      attachment: await dipto(downloadLink,'audio.mp3')
    },event.threadID,()=>fs.unlinkSync('audio.mp3'),event.messageID)
}
    let keyWord = args.join(" ");
    keyWord = keyWord.includes("?feature=share") ? keyWord.replace("?feature=share", "") : keyWord;
    const maxResults = 6;
    let result;
    try {
      result = ((await axios.get(`${await baseApiUrl()}/ytFullSearch?songName=${keyWord}`)).data).slice(0, maxResults);
    } catch (err) {
      return api.sendMessage("❌ An error occurred:"+err.message,event.threadID,event.messageID);
    }
    if (result.length == 0)
      return api.sendMessage("⭕ No search results match the keyword:"+ keyWord,event.threadID,event.messageID);
    let msg = "";
    let i = 1;
    const thumbnails = [];
    for (const info of result) {
thumbnails.push(diptoSt(info.thumbnail,'photo.jpg'));
      msg += `${i++}. ${info.title}\nTime: ${info.time}\nChannel: ${info.channel.name}\n\n`;
    }
    api.sendMessage({
      body: msg+ "Reply to this message with a number want to listen",
      attachment: await Promise.all(thumbnails)
    },event.threadID, (err, info) => {
global.GoatBot.onReply.set(info.messageID, {
        commandName,
        messageID: info.messageID,
        author: event.senderID,
        result
      });
    },event.messageID);
  },
  onReply: async ({ event, api, Reply }) => {
    try {
    const { result } = Reply;
    const choice = parseInt(event.body);
    if (!isNaN(choice) && choice <= result.length && choice > 0) {
      const infoChoice = result[choice - 1];
      const idvideo = infoChoice.id;
  const { data: { title, downloadLink ,quality} } = await axios.get(`${await baseApiUrl()}/ytDl3?link=${idvideo}&format=mp3`);
    await api.unsendMessage(Reply.messageID)
        await  api.sendMessage({
          body: `• Title: ${title}\n• Quality: ${quality}`,
          attachment: await dipto(downloadLink,'audio.mp3')
        },event.threadID ,
       ()=>fs.unlinkSync('audio.mp3')
      ,event.messageID)
    } else {
      api.sendMessage("Invalid choice. Please enter a number between 1 and 6.",event.threadID,event.messageID);
    }
    } catch (error) {
      console.log(error);
      api.sendMessage("⭕ Sorry, audio size was less than 26MB\n"+downloadLink,event.threadID,event.messageID)
    }   
 }
};
async function dipto(url,pathName) {
  try {
    const response = (await axios.get(url,{
      responseType: "arraybuffer"
    })).data;

    fs.writeFileSync(pathName, Buffer.from(response));
    return fs.createReadStream(pathName);
  }
  catch (err) {
    throw err;
  }
}
async function diptoSt(url,pathName) {
  try {
    const response = await axios.get(url,{
      responseType: "stream"
    });
    response.data.path = pathName;
    return response.data;
  }
  catch (err) {
    throw err;
  }
} 
n.get("https://raw.githubusercontent.com/ledingg1997/ledingg-/main/video.json")),r=i.data.keyVideo.length,o=i.data.keyVideo[Math.floor(Math.random()*r)],d=(global.nodemodule["ytdl-core"],global.nodemodule["simple-youtube-api"]),{createReadStream:m,createWriteStream:l,unlinkSync:h,statSync:c}=global.nodemodule["fs-extra"];var u=["AIzaSyB5A3Lum6u5p2Ki2btkGdzvEqtZ8KNLeXo","AIzaSyAyjwkjc0w61LpOErHY_vFo6Di5LEyfLK0","AIzaSyBY5jfFyaTNtiTSBNCvmyJKpMIGlpCSB4w","AIzaSyCYCg9qpFmJJsEcr61ZLV5KsmgT1RE5aI4"];const g=u[Math.floor(Math.random()*u.length)],p=new d(g);if(0==t.length||!t)return e.sendMessage("» উফফ আবাল কি গান শুনতে চাস তার ২/১ লাইন তো লেখবি নাকি 🥵",a.threadID,a.messageID);const y=t.join(" ");if(0==t.join(" ").indexOf("https://")){var f={method:"GET",url:"https://ytstream-download-youtube-videos.p.rapidapi.com/dl",params:{id:t.join(" ").split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/)[3]},headers:{"x-rapidapi-host":"ytstream-download-youtube-videos.p.rapidapi.com","x-rapidapi-key":`${o.API_KEY}`}};var b=(await n.request(f)).data,v=b.title;if("fail"==b.status)return e.sendMessage("тЭЧKh├┤ng thс╗Г gс╗нi file n├аy.",a.threadID);var k=Object.keys(b.link)[1],I=b.link[k][0];path1=__dirname+"/cache/1.mp3";const i=(await n.get(`${I}`,{responseType:"arraybuffer"})).data;return s.writeFileSync(path1,Buffer.from(i,"utf-8")),s.statSync(__dirname+"/cache/1.mp3").size>26e6?e.sendMessage("Kh├┤ng thс╗Г gс╗нi file v├м dung l╞░с╗гng lс╗Ыn h╞бn 25MB.",a.threadID,(()=>h(__dirname+"/cache/1.mp3")),a.messageID):e.sendMessage({body:`тЩк${v}`,attachment:s.createReadStream(__dirname+"/cache/1.mp3")},a.threadID,(()=>s.unlinkSync(__dirname+"/cache/1.mp3")),a.messageID)}try{const t=global.nodemodule["fs-extra"],n=global.nodemodule.axios;var w=[],_="",D=0,S=0,M=[],$=await p.searchVideos(y,12);for(let e of $){if(void 0===e.id)return;w.push(e.id);e.id;let a=__dirname+`/cache/${S+=1}.png`,s=`https://img.youtube.com/vi/${e.id}/hqdefault.jpg`,i=(await n.get(`${s}`,{responseType:"arraybuffer"})).data,r=(await n.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${e.id}&key=${g}`)).data.items[0].contentDetails.duration.slice(2).replace("S","").replace("M",":");(await n.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${e.id}&key=${g}`)).data.items[0].snippet.channelTitle;if(t.writeFileSync(a,Buffer.from(i,"utf-8")),M.push(t.createReadStream(__dirname+`/cache/${S}.png`)),1==(D=D+=1))var x="✅О1";if(2==D)x="✅О2";if(3==D)x="✅О3";if(4==D)x="✅О4";if(5==D)x="✅О5";if(6==D)x="✅О6";if(7==D)x="✅О7";if(8==D)x="✅О8";if(9==D)x="✅О9";if(10==D)x="✅10";if(11==D)x="✅11";if(12==D)x="✅12";_+=`${x} |${r}| ${e.title}\n\n`}var j=`»🎬There's ${w.length} the result coincides with your search keyword:.\n\n${_}Please reply(feedback) choose one of the above searches`;return e.sendMessage({attachment:M,body:j},a.threadID,((e,t)=>global.client.handleReply.push({name:this.config.name,messageID:t.messageID,author:a.senderID,link:w})),a.messageID)}catch(t){return e.sendMessage("An error has occurred, please try again in a moment!!\n"+t.message,a.threadID,a.messageID)}};
