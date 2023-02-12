import plugin from '../../lib/plugins/plugin.js'
import axios from 'axios'

export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '今日油价',
            /** 功能描述 */
            dsc: '简单开发示例',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 5000,
            rule: [{
                /** 命令正则匹配 */
                reg: '^#今日油价*',
                /** 执行方法 */
                fnc: 'youjia'
            }]
        })
    }

    /**
     * #今日油价
     * @param e oicq传递的事件参数e
     */
    async youjia(e) {
        /** e.msg 用户的命令消息 */
        logger.info('[用户命令]', e.msg)      
        let dd = e.msg.split("油价")[1]
        /** 油价接口地址 */
        let url = 'http://www.gaosubao.cn/youjia/' + dd
        /** 调用接口获取数据 */
        let res = await axios.get(url)
        if (!res) {
            logger.error('[今日油价] 接口请求失败')
            return await this.reply('今日油价接口请求失败')
        }
        if (res.data.match(/1970-01-01/)) await this.reply("地址缩写输入错误 例 河南 #今日油价henan")
        let title = res.data.match(/>(.+?今日油价查询)/)[1]
        let yj = res.data.match(/\d+#.+?油价格.+?元\/升/sg)
        let msg = ""
        for (let y of yj) {
            console.log(y)
            let yjmsg = y.match(/(.*油价格).+?;\">(.*?元\/升)/s)
            msg += `${yjmsg[1]}：${yjmsg[2]}\n`
        }
        /** 最后回复消息 */
        await this.reply(`${title}：\n${msg}`)
    }
}