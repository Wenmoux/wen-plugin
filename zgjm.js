import plugin from '../../lib/plugins/plugin.js'
import axios from 'axios'
import cheerio from 'cheerio'
export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '周公解梦',
            /** 功能描述 */
            dsc: '简单开发示例',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 5000,
            rule: [{
                /** 命令正则匹配 */
                reg: '^#解梦*',
                /** 执行方法 */
                fnc: 'zgjm'
            }]
        })
    }

    /**
     * #今日油价
     * @param e oicq传递的事件参数e
     */
    zgjm(e) {
        return new Promise(async (resolve) => {
            try {
                logger.info('[用户命令]', e.msg)
                let key = e.msg.split("解梦")[1]
                let url = 'https://m.zgjm.org/search/'
                let data = `wd=${key}`
                let res = await axios.post(url, data)
                if (!res) {
                    logger.error('[周公解梦] 接口请求失败')
                    return await this.reply('周公解梦接口请求失败')
                }
                let jmurl = res.data.match(/<ul class="lib_text">.+?<li><a href=\"(.+?)\" title=.+?\">/s)
                let mres = await axios.get(`https://m.zgjm.org${jmurl[1]}`)
                const $ = cheerio.load(mres.data)
                let msg = $(".read-content").text()
                await this.reply(msg.split("的详细解说吧。")[1])
            } catch (err) {
                resolve()
                await this.reply("解梦失败～")
            }
            resolve();
        });
    }
}