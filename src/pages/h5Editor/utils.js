


export function getRandomStr() {
    return Math.random().toString(32).substr(2);
}

/**
 * 根据nodeObj生成htmlString
 * @param {Object} nodeObj 
 *  @type nodeObj 
 *      {
 *          tag : string,
 *          style : {
 *              [propertyName:string] : string
 *          },
 *          attrs : {
 *              [propertyName:string] : string
 *          },
 *          children:[nodeObj]
 *      }
 * @return {Object}
 */

export function createDom(obj) {
    let dom = null;
    try {
        let { tag = "div", style = [], attrs = [], children, text } = obj;
        dom = document.createElement(tag);
        Object.keys(style).forEach(key => {
            dom.style[key] = style[key];
        })
        Object.keys(attrs).forEach(key => {
            dom.setAttribute(key, attrs[key]);
        })
        if (text) {
            dom.innerText = text
        }
        if (children && children.length > 0) {
            children.forEach(item => {
                dom.appendChild(createDom(item));
            })
        }
    } catch (e) { }
    return dom;
}

export function createHtmlStr(nodeObj) {
    let result = document.createElement("div");
    result.appendChild(createDom(nodeObj));
    return {
        id: getRandomStr(),
        htmlStr: result.innerHTML
    }
}

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

export function getTime(val) {
    let date = new Date(val);
    let trans = n => `${n < 10 ? "0" : ""}${n}`;
    return `${trans(date.getHours())}:${trans(date.getMinutes())}`;
}
