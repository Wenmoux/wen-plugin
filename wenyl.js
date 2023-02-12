import plugin from '../../lib/plugins/plugin.js'
import axios from 'axios'
const api = {
    "joke2": "http://www.yidianzixun.com/home/q/news_list_for_channel?channel_id=13509555264&cstart=0&cend=10&infinite=true&refresh=1&__from__=wap&_spt=yz~eaod%3B9%3F%3A3%3F%3F%3F8%3C%3E%3A%3B%3A&appid=web_yidian&_=",
    "joke1":"https://www.mxnzp.com/api/jokes/list?page=1&app_id=rgihdrm0kslojqvm&app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09",
    "zn": "https://api.lovelive.tools/api/SweetNothings/Serialization/Json"
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
                    case '段子1':
                        var res = await get(api.joke1)
                        var data = res ? res.data.list[0].content : null
                        break                
                    case '段子2':
                        var res = await get(api.joke2, {headers})
                        var data = res ? res.result[0].summary : null
                        break
                    case '渣男':
                        var res = await get(api.zn)
                        var data = res ? res.returnObj[0] : null
                        break
                    default:
                        await this.reply(                        `不存在该接口
接口列表如下：
        1.来点段子1
        2.来点段子2
        3.来点渣男`)
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