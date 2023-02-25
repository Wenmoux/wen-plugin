import plugin from '../../lib/plugins/plugin.js'
import axios from 'axios'
const api = {
    "joke": "http://www.yidianzixun.com/home/q/news_list_for_channel?channel_id=13509555264&cstart=0&cend=10&infinite=true&refresh=1&__from__=wap&_spt=yz~eaod%3B9%3F%3A3%3F%3F%3F8%3C%3E%3A%3B%3A&appid=web_yidian&_=",
    "zn": "https://api.lovelive.tools/api/SweetNothings/Serialization/Json",
    "djt":"https://cloud.qqshabi.cn/api/poison/api.php",
    "wyyrp":"https://cloud.qqshabi.cn/api/comments/api.php?format=text",
    "chp":"https://cloud.qqshabi.cn/api/rainbow/api.php",
  "sh":"https://api.pmay.cn/api/saohua", 
 "tdog":"https://api.pmay.cn/api/tiangou",  
}
const headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Referer": "http://www.yidianzixun.com/",
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; Redmi K30 Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.162 Mobile Safari/537.36",
    "cookie": "wuid=196418039036179; wuid_createAt=2020-04-22 22:38:54; Hm_lvt_15fafbae2b9b11d280c79eff3b840e45=1587393535; fingerprint=ukT6yTUztwSBP2gfmA281587393535237; Hm_lpvt_15fafbae2b9b11d280c79eff3b840e45=1587853359; JSESSIONID=2ac9f629350d022a177a7c49ac3e80fbd48e1bbed678e6cf14be5ff153ab7b01"
}


export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '语录大杂烩',
            /** 功能描述 */
            dsc: '语录',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 5000,
            rule: [{
                /** 命令正则匹配 */
                reg: '^#来点*',
                /** 执行方法 */
                fnc: 'wenyl'
            }]
        })
    }




    wenyl(e) {
        return new Promise(async (resolve) => {
            try {
                logger.info('[用户命令]', e.msg)
                let msg = e.msg.split("来点")[1]
                switch (msg) {        
                    case '段子':
                        var res = await get(api.joke, {headers})
                        var data = res ? res.result[0].summary : null
                        break
                    case '渣男':
                        var res = await get(api.zn)
                        var data = res ? res.returnObj[0] : null
                        break
                    case '毒鸡汤':
                        var res = await get(api.djt)
                        var data = res ? res.data : null
                        break                                   
                    case '热评':
                        var res = await get(api.wyyrp)
                        var data = res ?res : null
                        break      
                    case '彩虹屁':
                        var res = await get(api.chp)
                        var data = res ? res.data : null
                        break
                    case '骚话':
                        var res = await get(api.sh)
                        var data = res ?? null
                        break                        
                    case '舔狗':
                        var res = await get(api.tdog)
                        var data = res ?? null
                        break                    default:
                        await this.reply(                        `不存在该接口
接口列表如下：
        1.来点段子   
        2.来点渣男
        3.来点热评
        4.来点毒鸡汤
        5.来点彩虹屁
        6.来点骚话
        7.来点舔狗`)
                }
                if (data) await this.reply(data)
                else await this.reply("♀...※〓'É")
            } catch (err) {
                //  console.log(err);
                logger.info(err);
                await this.reply("请求出错：" + err)
            }
            resolve();
        });
    }

     



}
function get(url) {
        return new Promise(async (resolve) => {
            try {
                let res = await axios.get(url, {
                    headers
                })
                resolve(res.data)
            } catch (err) {
                resolve()
            }
            resolve();
        });
    }