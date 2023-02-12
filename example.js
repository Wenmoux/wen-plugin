import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'

export class example extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: '段子',
      /** 功能描述 */
      dsc: '段子',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 5000,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#来点段子$',
          /** 执行方法 */
          fnc: 'ydjoke'
        }
      ]
    })
  }

  /**
   * #
   * @param e oicq传递的事件参数e
   */
  async ydjoke (e) {
    /** e.msg 用户的命令消息 */
    logger.info('[用户命令]', e.msg)

    /** 一接口地址 */
    let url = 'http://www.yidianzixun.com/home/q/news_list_for_channel?channel_id=13509555264&cstart=0&cend=10&infinite=true&refresh=1&__from__=wap&_spt=yz~eaod%3B9%3F%3A3%3F%3F%3F8%3C%3E%3A%3B%3A&appid=web_yidian&_='
    let headers ={
  "X-Requested-With":"XMLHttpRequest",
  "Referer":"http://www.yidianzixun.com/",
  "User-Agent":"Mozilla/5.0 (Linux; Android 10; Redmi K30 Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.162 Mobile Safari/537.36",
 "cookie":"wuid=196418039036179; wuid_createAt=2020-04-22 22:38:54; Hm_lvt_15fafbae2b9b11d280c79eff3b840e45=1587393535; fingerprint=ukT6yTUztwSBP2gfmA281587393535237; Hm_lpvt_15fafbae2b9b11d280c79eff3b840e45=1587853359; JSESSIONID=2ac9f629350d022a177a7c49ac3e80fbd48e1bbed678e6cf14be5ff153ab7b01"
}
    /** 调用接口获取数据 */
    let res = await fetch(url,{headers}).catch((err) => logger.error(err))

    /** 判断接口是否请求成功 */
    if (!res) {
      logger.error('[段子] 接口请求失败')
      return await this.reply('段子接口请求失败')
    }
logger.info(res)
    /** 接口结果，json字符串转对象 */
    res = await res.json()
        
    /** 输入日志 */
    logger.info(`[接口结果] 来点段子：${res.result[0].summary}`)

    /** 最后回复消息 */
    await this.reply(res.result[0].summary)
  }
}
