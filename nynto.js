import plugin from '../../lib/plugins/plugin.js'
import axios from 'axios'

export class example extends plugin {
    constructor() {
        super({
            /** 功能名称 */
            name: '喵特漫展搜索',
            /** 功能描述 */
            dsc: '喵特漫展搜索',
            /** https://oicqjs.github.io/oicq/#events */
            event: 'message',
            /** 优先级，数字越小等级越高 */
            priority: 5000,
            rule: [{
                /** 命令正则匹配 */
                reg: '^#喵特漫展*',
                /** 执行方法 */
                fnc: 'nyato'
            }]
        })
    }

    /**
     * #喵特漫展
     * @param e oicq传递的事件参数e
     */
    async manzhan(e) {
        /** e.msg 用户的命令消息 */
        logger.info('[用户命令]', e.msg)
        let keyword = e.msg.split("喵特漫展")[1]
        /** 油价接口地址 */
        let data = `province=0&city=0&p=1&keyword=${encodeURI(        keyword)}&expo_type=0`
        let url =
            'https://apix.nyato.com/index.php?app=android&mod=Exhibition&act=expo_list&token=a31b2144ebe2c7183d91087d13f1251a&app_version=5.6&version=5.6&acode=129&tickets=1&uid=0&app_time=1587818197002&app_device=8e9c5466-b3c0-3115-8471-1b737df7f259&app_sign=56f4e606f9bc2fd2f030d7bef8113d13&key=2a39d8fcf210d6084facad9642a94f6a&oauth_token=0&oauth_token_secret=0&provinceId=&cityId=&network_status=0'
        let res = await axios.post(url, data)
        /** 调用接口获取数据 */
        //    let res = await axios.get(url)
        if (!res) {
            logger.error('[喵特漫展] 接口请求失败')
            return await this.reply('喵特漫展接口请求失败')
        }        
        let mmsg = ""
        let i = 1
        res.data.data.map(list => {
            let b = list.is_ticket == 1 ? '可购票' : '不可购票'
            if (!list.name.match(/已结束/)) {
                mmsg += `${i++}.  ${list.name}\n${list.section_name}  ${b} ￥${list.presale_price}    ${list.love}人想去\n ${list.location}\n购票戳 https://www.nyato.com/manzhan/${list.eid}\n时间：${list.expo_time}\n\n`
            }
        })
        await this.reply(mmsg)
        if (mmsg.length == 0) await this.reply("暂未在喵特中搜到该地区展子嗷")
    }
}