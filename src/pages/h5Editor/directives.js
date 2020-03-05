import clickoutside from "element-ui/src/utils/clickoutside";
import store from "./store"

let activeViewZidx = 4

const directives = {
    //阻止默认的右键菜单
    preventRightClick: {
        inserted(el) {
            el.oncontextmenu = function (e) {
                e.preventDefault();
            };
        }
    },
    //在元素之外点击
    clickoutside,
    stick: {
        bind(el) {
            el.onmousedown = function (e) {
                el.style.zIndex = activeViewZidx++;
            }
        }
    },
    drag: {
        bind(el, binding) {
            el.onmousedown = function (e) {
                let parent_el = document.querySelector(String(binding.arg));
                if (!parent_el) return;
                //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
                var divx = e.clientX - parent_el.offsetLeft;
                var divy = e.clientY - parent_el.offsetTop;
                let minLeft = store.state.ownerTemplateShow ? 200 : 0;
                let maxLeft = window.innerWidth - 300;
                let minTop = 50;
                //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
                document.onmousemove = function (e) {
                    //获取移动后div的位置：鼠标位置-divx/divy
                    // var l = Math.max(e.clientX - divx, 200);
                    var l = Math.min(Math.max(e.clientX - divx, minLeft), maxLeft);
                    var t = Math.max(e.clientY - divy, minTop);
                    if (t - minTop <= 20) {
                        t = minTop;
                    }
                    if (l - minLeft <= 20) {
                        l = minLeft;
                    } else if (maxLeft - l <= 20) {
                        l = maxLeft;
                    }

                    parent_el.style.left = l + "px";
                    parent_el.style.top = t + "px";
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    }

}

export default directives