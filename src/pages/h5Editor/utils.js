

/**
 * 获取随机字符串
 * @returns {String}
 */
export function getRandomStr() {
    return Math.random().toString(32).substr(2);
}

//style属性片段
const styleFragment = {
    button: {
        height: "36px",
        boxSizing: "border-box",
        padding: "0 8px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        border: "none"
    },
    noWrap: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        paddingTop: "1px"
    },
    _defaultStyle: {
        boxSizing: "border-box",
    }
}

/**
 * 根据nodeObj生成dom结构
 * @param {Object} nodeObj 
 *  @type {nodeObj} 
 *      {
 *          tag : string,
 *          style : {
 *              [propertyName:string] : string
 *          },
 *          styleFragment : string[]
 *          attrs : {
 *              [propertyName:string] : string
 *          },
 *          children:[nodeObj]
 *      }
 * @returns {HTMLDivElement}
 */
export function createDom(obj) {
    let dom = null;
    try {
        let { tag = "div", style = {}, styleFragment: domStyleFragment, attrs = {}, children, text } = obj;
        dom = document.createElement(tag);
        if (domStyleFragment && domStyleFragment.length > 0) {
            let _style = {};
            domStyleFragment.forEach(item => {
                Object.assign(_style, styleFragment[item] || null);
            })
            style = Object.assign({}, _style, style);
        }
        Object.keys(style).forEach(key => {
            dom.style[key] = style[key];
        })
        Object.keys(styleFragment._defaultStyle).forEach(key => {
            dom.style[key] = styleFragment._defaultStyle[key];
        })
        Object.keys(attrs).forEach(key => {
            dom.setAttribute(key, attrs[key]);
        })
        if (text) {
            dom.innerText = text;
        }
        if (children && children.length > 0) {
            children.forEach(item => {
                dom.appendChild(createDom(item));
            })
        }
    } catch (e) { }
    return dom;
}

/**
 * 生成html字符串
 * @param {nodeObj} nodeObj 
 * @returns {htmlData}
 *  @type {htmlData} 
 *      {
 *          id:string,
 *          htmlStr:string
 *      }
 */
export function createHtmlStr(nodeObj) {
    let result = document.createElement("div");
    result.appendChild(createDom(nodeObj));
    return {
        id: getRandomStr(),
        htmlStr: result.innerHTML
    }
}

/**
 * 将数组中某元素移动到0位置
 * @param {Array} arr 
 * @param {Number} index 
 * @returns {Array}
 */
export function arrMoveTop(arr, index) {
    if (index !== 0) {
        let _arr = [...arr];
        let moveItem = _arr.splice(index, 1);
        _arr.unshift(...moveItem);
        return _arr;
    } else {
        return arr;
    }
}

/**
 * 将数组中某元素向上移动1个位置
 * @param {Array} arr 
 * @param {Number} index 
 * @returns {Array}
 */
export function arrMoveUpper(arr, index) {
    if (index !== 0) {
        let _arr = [...arr];
        let curIdx = index;
        let preIdx = index - 1;
        [_arr[curIdx], _arr[preIdx]] = [_arr[preIdx], _arr[curIdx]];
        return _arr;
    } else {
        return arr;
    }
}

/**
 * 将数组中某元素向下移动一个位置
 * @param {Array} arr 
 * @param {Number} index 
 * @returns {Array}
 */
export function arrMoveLower(arr, index) {
    if (index !== arr.length - 1) {
        let _arr = [...arr];
        let curIdx = index;
        let nextIdx = index + 1;
        [_arr[curIdx], _arr[nextIdx]] = [_arr[nextIdx], _arr[curIdx]];
        return _arr;
    } else {
        return arr;
    }
}

/**
 * 将数组中某元素移动到末尾
 * @param {Array} arr 
 * @param {Number} index 
 * @returns {Array}
 */
export function arrMoveBottom(arr, index) {
    let len = arr.length - 1;
    if (index !== len) {
        let _arr = [...arr];
        let moveItem = _arr.splice(index, 1);
        _arr.push(...moveItem);
        return _arr;
    } else {
        return arr;
    }
}

/**
 * timestamp转换为几点几分
 * @param {Number} timestamp 时间戳
 * @returns {String} HH:mm
 */
export function getTime(timestamp) {
    let date = new Date(timestamp);
    let trans = n => `${n < 10 ? "0" : ""}${n}`;
    return `${trans(date.getHours())}:${trans(date.getMinutes())}`;
}

/**
 * timestamp转换为几月几号
 * @param {Number} timestamp 时间戳
 * @returns {String} mm-dd
 */
export function getDate(timestamp) {
    let date = new Date(timestamp);
    return `${date.getMonth() + 1}-${date.getDate()}`;
}

/**
 * 把style字符串转换为style对象
 * @param {String} styleStr style字符串
 * @returns {Object} styleObj
 */
export function parseStyleStr(styleStr) {
    if (!styleStr) {
        return {};
    }
    let styleArr = styleStr.split(";") || [];
    let styleObj = {};
    styleArr.forEach(item => {
        let [attr, val] = item.split(":");
        if (attr && val && val !== "undefined") { //判断一个undefined字符串是因为某些style字符串解析出来的属性为undefined字符串，所以要去除这种情况
            styleObj[attr] = val || "";
        }
    })
    return styleObj
}

/**
 * 生成guid
 * @returns {String} guid
 */
export function getUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}