const regexList = {
    email: {
        regx: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
        regxMsg: '邮箱格式有误，请重新输入'
    },     // E-mail地址
    phone: {
        regx: /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
        regxMsg: '手机号码格式有误，请重新输入'
    },   // 手机号码
    integer: {
        regx: /^-?\d+$/,
        regxMsg: '只能输入整数噢'
    },     // 整数
    chinese: {
        regx: /^[\u0391-\uFFE5]+$/,
        regxMsg: '只能输入中文噢'
    },      // 中文
    postalCode: {
        regx: /^[1-9]\d{5}$/,
        regxMsg: '邮政编码格式有误，请重新输入'
    },    // 邮政编码
    tel: {
        regx: /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
        regxMsg: '座机号码格式有误，请重新输入'
    },  // 座机号码
    url: {
        regx: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
        regxMsg: 'URL格式有误，请重新输入'
    },   // URL
    ip: {
        regx: /(\d+)\.(\d+)\.(\d+)\.(\d+)/,
        regxMsg: 'IP格式有误，请重新输入'
    },   // IP
    areaCode: {
        regx: /^0\d{2,3}$/,
        regxMsg: '电话区号格式有误，请重新输入'
    },     // 电话区号
    qq: {
        regx: /^[1-9]*[1-9][0-9]*$/,
        regxMsg: 'QQ账号格式有误，请重新输入'
    },   // 腾讯QQ号
    account: {
        regx: /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/,
        regxMsg: '账号只能以字母开头，6-16字节，允许字母数字下划线'
    },    // 帐号(字母开头，允许5-16字节，允许字母数字下划线)
    cenu : {
        regx: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
        regxMsg: '输入字符不合规(只能为中文、英文、数字及下划线)'
    },  // 中文、英文、数字及下划线 
    sql: {
        regx: /^(select|drop|delete|create|update|insert).*$/,
        regxMsg: 'SQL语句输入有误，请重新输入'
    },   // sql语句
    eng: {
        regx: /^[A-Za-z]+$/,
        regxMsg: '字符输入有误，请重新输入'
    },  // 英文字符串
    engNum: {
        regx: /^[A-Za-z0-9]+$/,
        regxMsg: '字符输入有误，请重新输入'
    },    // 英文字符数字串
    identity: {
        regx: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        regxMsg: '身份证号码输入有误，请重新输入'
    },   // 身份证
    name: {
        regx: /^[\u4e00-\u9fa5]{2,4}$/,
        regxMsg: '姓名输入有误，请重新输入（只支持中文）'
    },     // 中文姓名
    strengthen: {
        regx: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
        regxMsg: '字符格式为字母+数字+特殊字符'
    },   // 强：字母+数字+特殊字符
    commonly: {
        regx: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
        regxMsg: '字符格式为(字母+数字)或(字母+特殊字符)或(数字+特殊字符)'
    },  // 中：字母+数字，字母+特殊字符，数字+特殊字符
    simple: {
        regx: /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/,
        regxMsg: '字符格式为纯数字或纯字母或纯特殊字符'
    },   // 弱：纯数字，纯字母，纯特殊字符
    nonnegativeInt: {
        regx: /^\d+$/,
        regxMsg: '请输入>=0的整数'
    },   //非负整数
    positiveInt: {
        regx: /^[0-9]*[1-9][0-9]*$/,
        regxMsg: '请输入>0的整数'
    },   // 正整数(大于0)
    nonpositiveInt: {
        regx: /^((-\d+)|(0+))$/,
        regxMsg: '请输入<=0的整数'
    },    // 非正整数 
    negtiveInt: {
        regx: /^-[0-9]*[1-9][0-9]*$/,
        regxMsg: '请输入<0的整数'
    },   // 负整数
    nonnegative: {
        regx: /^\d+(\.\d+)?$/,
        regxMsg: '请输入>=0的数'
    },    // 非负数
    nonpositive: {
        regx: /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*|[1-9]\d*))|0?.0+|0$/,
        regxMsg: '请输入<=0的数'
    },      // 非正数
    positive: {
        regx: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
        regxMsg: '请输入>0的数'
    },   // 正数
    negative: {
        regx: /^(-([0-9]+\.[0-9]*[1-9][0-9]*)|-([0-9]*[1-9][0-9]*\.[0-9]+)|-([0-9]*[1-9][0-9]*))$/,
        regxMsg: '请输入<0的数'
    },  // 负数
    float: {
        regx: /^([+-]?)\d*\.\d{$min,$max}$/,
        regxMsg: '请输入不为0的小数'
    },  // 不为0的浮点数
    positiveFloat: {
        regx: /^[1-9]\d*.\d{$min,$max}|0.\d{$min,$max}$/,     // /^[1-9]\d*.\d{1,}|0.\d*[1-9]\d*$/,
        regxMsg: '请输入>0的小数'
    },  // 正浮点数
    negativeFloat: {
        regx: /^-([1-9]\d*.\d{$min,$max}|0.\d{$min,$max})$/,      // /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/
        regxMsg: '请输入<0的小数'
    },  // 负浮点数
    containZeroFloat: {
        regx: /^-?([1-9]\d*.\d{$min,$max}|0.\d{$min,$max}|0)$/,   // /^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$/
        regxMsg: '请输入小数或0'
    },  // 浮点数或者0
    nonnegativeFloat: {
        regx: /^([1-9]\d*.\d{$min,$max}|0.\d{$min,$max}|0)$/,     // /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/
        regxMsg: '请输入>=0的小数'
    },  // 非负浮点数
    nonpositiveFloat: {
        regx: /^(-([1-9]\d*.\d{$min,$max}|0.\d{$min,$max})|0)$/,      // /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/
        regxMsg: '请输入<=0的小数'
    },  // 非正浮点数
    capital: {
        regx: /^[A-Z]+$/,
        regxMsg: '只能输入大写的英文字母'
    },     // 英文大写串
    lowercase: {
        regx: /^[a-z]+$/,
        regxMsg: '只能输入小写的英文字母'
    },    // 英文小写串  
    doubleByteCharacter: {
        regx: /^\x00-\xff/,
        regxMsg: '只能输入双字节字符(包括汉字在内)'
    },    // 双字节字符(包括汉字在内)

    
    // headTailSpaces: /(^\s*)|(\s*$)/,  // 匹配首尾空格（像vbscript那样的trim函数）
    // htmlTags: /<(.*)>.*<\/\1>|<(.*) \/>/,   // 匹配HTML标记
    // blankLine: /\n[\s| ]*\r/,   // 匹配空行
    // extractNetworkLink: /(h|H)(r|R)(e|E)(f|F)  *=  *('|")?(\w|\\|\/|\.)+('|"|  *|>)?/,     // 提取信息中的网络链接
    // extractEmailLink: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,    // 提取信息中的邮件地址
    // extractImageLink: /(s|S)(r|R)(c|C)  *=  *('|")?(\w|\\|\/|\.)+('|"|  *|>)?/,   // 提取信息中的图片链接
    // extractIpLink: /(\d+)\.(\d+)\.(\d+)\.(\d+)/,    // 提取信息中的IP地址
    // extractChinaMobile: /(86)*0*13\d{9}/,   // 提取信息中的中国手机号码
    // extractChinaLandline: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/,    // 提取信息中的中国固定电话号码
    // extractChinaTelephone: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/,    // 提取信息中的中国电话号码（包括移动和固定电话）
    // extractChinaPostalCode: /[1-9]{1}(\d+){5}/,     // 提取信息中的中国邮政编码
    // extractFloat: /(-?\d*)\.?\d+/,      // 提取信息中的浮点数（即小数）
    // extractNumber: /(-?\d*)(\.\d+)?/,   // 提取信息中的任何数字
    
    // matchChineseCharactersRegex: /[\u4e00-\u9fa5]/,     // 匹配中文字符的正则表达式
    // matchDoubleByteCharacter: /[^\x00-\xff]/,   // 匹配双字节字符(包括汉字在内)
    // matchBlankLineRegex: /\n[\s| ]*\r/,     // 匹配空行的正则表达式
    // matchHtmlTagsRegex: /<(.*)>.*<\/\1>|<(.*) \/>/,     // 匹配HTML标记的正则表达式
    // matchHeadTailSpacesRegex: /(^\s*)|(\s*$)/,  // 匹配首尾空格的正则表达式
    // matchEmailRegex: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,     // 匹配Email地址的正则表达式  
}
const _floatList = ['float', 'positiveFloat', 'negativeFloat', 'containZeroFloat', 'nonnegativeFloat', 'nonpositiveFloat'];

const _newRegxRule = (regxRes, value) => {
    const regxName = typeof regxRes === 'object' ? regxRes.name : regxRes;
    let regxRule = regexList[regxName].regx
    if(typeof regxRes === 'object' && _floatList.includes(regxRes.name)) {
        const regxStr = String(regexList[regxRes.name].regx);
        const replace = regxRes.digit instanceof Array ? `${regxRes.digit.sort().toString()}` : `1,${regxRes.digit||""}`;
        regxRule = new RegExp(regxStr.substring(1,regxStr.length-1).replace("$min,$max", replace))
        value = Number(value)
    }
    return {regxRule, regxName, val: value}
}

const regxRules = (rule, value, callback) => {
    const {regxRule, regxName, val} = _newRegxRule(rule.regx, value)
    if(value) {
        if(regxRule.test(val)) {
            callback()
        } else {
            callback(rule.message ? new Error(rule.message) : regexList[regxName].regxMsg)
        }
    } else {
        callback()
    }
}

const regxValidator = (regx, value) => {
    const {regxRule, val} = _newRegxRule(regx, value)
    return regxRule.test(val)
}
export {
    regxRules,
    regxValidator
}