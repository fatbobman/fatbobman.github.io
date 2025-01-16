
function getOffsetTop(element) {
    var offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
}

var sidebar = document.querySelector('#sidebar');
// 获取 sidebar 在浏览器中的初始 top 值
var initialTop = getOffsetTop(sidebar);
var positioningElement = document.querySelector('#article-area'); // 定位视图的选择器
var stickyPoint = 150;
var padding = 50;
var topOffset = 0;

function adjustSidebarPosition() {
    var sidebarOffsetTop = sidebar.getBoundingClientRect().top;
    if (sidebarOffsetTop <= stickyPoint) {
        // 获取 positioningElement 的右侧与浏览器右侧之间的距离
        var positioningElementRight = (window.innerWidth - positioningElement.getBoundingClientRect().width) / 2;
        sidebar.style.position = 'fixed';
        sidebar.style.top = stickyPoint + 'px';
        sidebar.style.right = positioningElementRight - padding + 'px';
    }

    if (window.scrollY <= initialTop - stickyPoint) {
        sidebar.style.position = 'absolute';
        sidebar.style.top = topOffset + 'px';
        sidebar.style.right = '-' + padding + 'px';
    }
}

document.addEventListener('scroll', adjustSidebarPosition);
window.addEventListener('resize', adjustSidebarPosition);