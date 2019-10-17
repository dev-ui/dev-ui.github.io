---
title: React Component Wrapping
date: "2019-04-25T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/react-component-wrapping/"
category: "react"
tags:
  - "react"
  - "component"
  - "ui"
description: "리액트 컴포넌트 랩핑"
---

리액트 부모컴포넌트로 자식컴포넌트 컨텐츠 랩핑

리액트에서 해당 컴포넌트를 다른 컴포넌트로 감싸는 형태의 구조로 작성해보자.

React.Children는 불투명(Opaque) 자료 구조인 this.props.children를 다루는 유틸리티 함수들을 제공한다.



[react component wrapping](https://reactjs.org/docs/composition-vs-inheritance.html#children)

## export class component

constructor 생성 후 `this.props.children`으로 전달한다.

## parent component

```js
import React, { Component } from 'react'

export class Parent extends Component {

constructor(props){ 
  super(props); 
}

render() {

  return (
    <div>
      tests
      {this.props.children}

    </div>
  )
export default Parent
```

## child component

부모 컴포넌트로 랩핑 후 컨텐츠 작성, 해당 내용이 부모 컴포넌트 안으로 들어간다.
`this.props.children`은 특별한 prop으로 일반적인 태그가 아닌 JSX 표현으로 작성된 자식 태그로 정의되는 경우가 많다.

각 자식에 key가 할당된 배열을 children 불투명(opaque) 자료 구조로 반환한다. render() 메서드에서 children의 집합을 다루고 싶을 때, 특히 this.props.children을 하부로 전달하기 전에 다시 정렬하거나 일부만 잘라내고 싶을 때에 유용하다.


```js
<Parent>
inner content
</Parent>
```

## index.js

컴포넌트 export 

```js
export { Test } from './Test';
```

## export functional Component

함수형 컴포넌트 export 

`props.children`으로 전달

```js
function Parent(props){
    return (
      <div>
        tests
        {props.children}

      </div>
    )
}
export default Parent
```

## index.js

export default 는 한번만 사용 가능

```js
export { default as Parent } from './Parent';
```

