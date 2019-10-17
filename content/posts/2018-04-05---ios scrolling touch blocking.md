---
title: ios scrolling touch blocking
date: "2018-04-05T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/ios-scrolling-blocking/"
category: "touch"
tags:
  - "ios"
  - "safari"
  - "touch prevent"
description: "ios safari chrome 에서 스크롤 터치 막기"
---

## ios safari chrome 에서 스크롤 터치 막기

```js
// Disable scroll
function disableScroll(){
    $('#wrapper').on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
}

// Enable scroll
function enableScroll(){
    $('#wrapper').off('scroll touchmove mousewheel');
}
```