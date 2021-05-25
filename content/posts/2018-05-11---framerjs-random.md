---
title: Framer js - random	
date: "2018-05-12T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/framer-random/"
category: "framerjs"
tags:
  - "framerjs"
description: "framer_random number"
---

## framer_random number


```javascript
bg = new BackgroundLayer

for i in [0..4]
	box = new Layer
		width: 20
		height: 150
		originY: 1
		backgroundColor: "skyblue"
	box.x = (box.width + 5) * i + 300
	box.centerY()

	ani = new Animation
		layer:box
		properties:
			scaleY:Utils.randomNumber(0.2,1)
			backgroundColor:Utils.randomColor(1)
		time:0.1
	
	ani.start()
	ani.onAnimationEnd ->
		this.properties.scaleY = Utils.randomNumber(0.2,1)
		this.properties.backgroundColor = Utils.randomColor(1)
		this.start()
```