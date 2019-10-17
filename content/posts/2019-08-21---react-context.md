---
title: React Context API
date: "2019-08-21T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/react-context/"
category: "react"
tags:
  - "react"
  - "ui"
description: "컴포넌트 트리 전체에 데이터를 공유하는 방법"
---

context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있다.

일반적인 React 애플리케이션에서 데이터는 위에서 아래로 (즉, 부모로부터 자식에게) props를 통해 전달되지만, 애플리케이션 안의 여러 컴포넌트들에 전해줘야 하는 props의 경우 (예를 들면 선호 로케일, UI 테마) 이 과정이 번거로울 수 있다. context를 이용하면, 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유하도록 할 수 있다.

## context를 써야 하는 상황

context는 React 컴포넌트 트리 안에서 전역적(global)이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법이다. 그러한 데이터로는 현재 로그인한 유저, 테마, 선호하는 언어 등이 있다. 예를 들어, 아래의 코드는 버튼 컴포넌트를 꾸미기 위해 테마(theme) props를 명시적으로 넘겨주고 있다.

```js
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar 컴포넌트는 불필요한 테마 prop를 받아서
  // ThemeButton에 전달해야 한다.
  // 앱 안의 모든 버튼이 테마를 알아야 한다면
  // 이 정보를 일일이 넘기는 과정은 매우 곤혹스러울 수 있다.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
```

context를 사용하면 중간에 있는 엘리먼트들에게 props를 넘겨주지 않아도 된다.

## React.createContext

```js
const MyContext = React.createContext(defaultValue);
```

Context 객체를 만든다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽는다.

defaultValue 매개변수는 트리 안에서 적절한 Provider를 찾지 못햇을 때에만 쓰이는 값이다. 컴포넌트를 독립적으로 테스트할 때 유용한 값이다. 


## Context.Provider
```js
<MyContext.Provider value={/* 어떤 값 */}>
```

Context 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.

Provider 는 value prop를 받아서 이 값을 하위에 있는 컴포넌트에게 전달한다. 값을 전달받을 수 있는 컴포넌트의 수에 제한은 없다. Provider 하위에 또 다른 Provider를 배치하는 것도 가능하며, 이 경우 하위 Provider의 값이 우선시된다.

Provider 하위에서 context를 구독하는 모든 컴포넌트는 Provider의 value prop가 바뀔 때마다 다시 렌더링 된다. 이러한 전파는 shouldComponentUpdate의 영향을 받지 않기 때문에 중간에 있는 컴포넌트가 업데이트를 중지한다고 해도 트리 끝에 있는 컴포넌트까지 전달된다.

context 값의 바뀌었는지 여부는 Object.is와 동일한 알고리즘을 사용해 이전 값과 새로운 값을 비교해 측정된다.


## Context.Consumer
```js
<MyContext.Consumer>
  {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

context 변화를 구독하는 React 컴포넌트다. 함수 컴포넌트안에서 context를 읽기 위해서 쓸 수 있다.

Context.Consumer의 자식은 함수여야한다. 이 함수는 context의 현재값을 받고 React 노드를 반환한다. 이 함수가 받는 value 매개변수 값은 해당 context의 Provider 중 상위 트리에서 가장 가까운 Provider의 value prop과 동일하다. 


## 주의할 점

다시 렌더링할지 여부를 정할 때 참조(reference)를 확인하기 때문에, Provider의 부모가 렌더링 될 때마다 불필요하게 하위 컴포넌트가 다시 렌더링 되는 문제가 생길 수도 있다. 예를 들어 아래 코드는 value가 바뀔 때마다 매번 새로운 객체가 생성되므로 Provider가 렌더링 될 때마다 그 하위에서 구독하고 있는 컴포넌트 모두가 다시 렌더링 될 것이다.

```js
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
```

이를 피하기 위해 값을 부모의 state로 끌어올려야 한다.

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

