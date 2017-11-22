- [redux](#redux)
  - [基础](#%E5%9F%BA%E7%A1%80)
    - [Action](#action)
    - [Action创建函数](#action%E5%88%9B%E5%BB%BA%E5%87%BD%E6%95%B0)
    - [Reducer](#reducer)
    - [Store](#store)
    - [数据流](#%E6%95%B0%E6%8D%AE%E6%B5%81)
    - [搭配react](#%E6%90%AD%E9%85%8Dreact)
  - [高级](#%E9%AB%98%E7%BA%A7)
    - [异步Action](#%E5%BC%82%E6%AD%A5action)
    
# redux

三大原则：
 
1. 单一数据源：整个应用的state被存储在一棵object tree中，并且这个object tree只存在于唯一的store中。
1. state是只读的：唯一改变state的方法是出发action，action是一个用于描述已发生事件的普通对象。
1. 使用纯函数来执行修改：为了描述action如何改变state tree，需要编写reducer

## 基础

### Action

action是把数据从应用传递到store的有效荷载，是store数据的唯一来源。一般通过`store.dispatch()`将action传到store。

action本质上是一个JavaScript普通对象。约定action内部必须使用一个字符串类型的`type`来表示将要执行的动作。

**应该尽量减少在action中传递的数据**

### Action创建函数

action创建函数是生成action的方法，只是简单的返回一个action对象。

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  };
}
```

redux中只需要把action创建函数的结果传给`dispatch()`方法即可发起一起dispatch过程。

```js
dispatch(addTodo(text))
```

或者创建一个**被绑定的action创建函数**来自动dispatch

```js
const boundAddTodo = text => dispatch(addTodo(text));
```

然后直接调用

```js
boundAddTodo(text);
```

store里能直接通过`store.dispatch()`调用`dispatch()`方法，但是大多数情况下会使用react-redux提供的`connect`帮助器来调用。`bindActionCreators()`可以把多个action创建函数绑定到`dispatch()`方法上。

### Reducer

Action只是描述了**有事情发生了**这个事实，并没有说明应用如何更新state，而这正式reducer要做的事情。

reducer是一个纯函数，接收旧的state和action，返回新的state。

**永远不要**在reducer里做这些操作：

- 修改传入的参数；
- 执行有副作用的操作，如API请求和路由跳转；
- 调用非纯函数，如`Date.now()`或`Math.random()`

**只要传入的参数相同，返回计算得到的下一个state一定相同。没有特殊情况，没有副作用，没有API请求，没有变量修改，单纯的执行计算。**

**注意：每个reducer只负责管理全局state中的它负责的一部分，每个reducer的state参数都不同，分别对应他管理的那部分state数据。**

### Store

Store是把action和reducer联系在一起的对象，store有以下职责：

- 维持应用的state；
- 提供`getState()`方法获取state；
- 提供`dispatch(action)`方法更新state；
- 提供`subscribe(listener)`注册监听器；
- 通过`subscribe(listener)`返回的函数注销监听器。

创建store：

```js
import { createStore } from 'redux';
import todoApp from './reducers';
let store = createStore(todoApp);
```

`createStore()`的第二个参数是可选的，用于设置state的初始状态。这对开发同构应用是非常有用，服务器端redux应用的state结构可以与客户端保持一致，那么客户端可以将从网络接受的服务器端的state直接用于本地数据初始化。

### 数据流

redux应用中数据的生命周期遵循以下4个步骤：
1. 调用`store.dispatch(action)`。可以在任何地方调用`store.dispatch(action)`，包括组件中，xhr回调中，甚至定时器中。
1. Redux store调用传入的reducer函数。store会把两个参数传入reducer：当前的state树和action。
1. 根reducer应该把多个子reducer输出合并成一个单一的state树。
1. Redux store保存了跟reducer返回的完整state树。

### 搭配react

**容器组件和展示组件的区别：**

|             |展示组件              |容器组件                     |
|:-----------:|:-------------------:|:--------------------------:|
|作用          |描述如何展现(骨架，样式) |描述如何运行(数据获取，状态更新)|
|直接使用redux  |否                   |是                          |
|数据来源       |props                |监听redux state             |
|数据修改       |从props调用回调函数     |向redux派发actions          |
|调用方式       |手动                  |通常由react reduce生成       |

技术上将可以之间使用`store.subscribe()`来编写容器组件，但是不建议这么做，因为这样无法使用react redux带来的性能优化，使用react redux的`connect()`方法来生成容器组件。

容器组件就是使用`store.sunscribe()`从Redux state树种读取部分数据，并通过props来吧这些数据提供给要渲染的组件。

使用`connect()`前，需要先定义`mapStateToProps`这个函数来指定如何把当前redux store state映射到展示组件的props中。

```js
const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

除了读取state，容器组件还能分发action。类似的方式，可以定义`mapDispatchToProps()`方法接收`dispatch()`方法并返回期望注入到展示组件的props中的回调方法。

```js
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => { dispatch(toggleTodo(id)) }
  }
}
```

最后使用`connect()`创建VisibleToDoList，并传入这两个函数。

```js
import { connect } from 'react-redux';
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default VisibleTodoList;
```

## 高级

### 异步Action

当调用异步API时，有两个非常关键的时刻：发起请求的时刻，和接收到响应的时刻。这两种时刻都可能会更改应用的state，一般情况下，需要dispatch至少三中action：

1. 一种通知reducer请求开始的action；
1. 一种通知reducer请求成功的action；
1. 一种通知reducer请求失败的action。