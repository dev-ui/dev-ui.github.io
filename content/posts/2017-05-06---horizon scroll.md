---
title: horizon scroll
date: "2017-05-19T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/horizon-scroll/"
category: "scroll"
tags:
  - "horizon scroll"
description: "마우스 휠 가로 스크롤 이동"
---

## 마우스 휠 가로 스크롤 이동

### Horizontal scrolling conversion


```js
/* We define our function 🕹 */
function replaceVerticalScrollByHorizontal(event) {
    if (event.deltaY != 0) {
    // manually scroll horizonally instead
    window.scroll(window.scrollX + event.deltaY * 5, window.scrollY);

    // prevent vertical scroll
    event.preventDefault();
    }
    return;
}

/* Listener on window once we start scrolling, we run our function 💨 */
window.addEventListener('wheel', replaceVerticalScrollByHorizontal);
```