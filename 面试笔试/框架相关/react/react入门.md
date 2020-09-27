# 学习 React.js 比你想象的要简单

https://juejin.im/post/599156cc6fb9a03c3a25db08#heading-2

#### 1 React 全部都是组件化的

React 是围绕可重用组件的概念设计的。你定义小组件并将它们组合在一起形成更大的组件。

无论大小，所有组件都是可重用的，甚至在不同的项目中也是如此。

React 组件最简单的形式，就是一个普通的 JavaScript 函数：

```react
function Button (props) {
  // 这里返回一个 DOM 元素，例如：
  return <button type="submit">{props.label}</button>;
}
// 将按钮组件呈现给浏览器
ReactDOM.render(<Button label="Save" />, mountNode)
```

用函数来定义一个组件，然后直接用对应组件名来挂载对应的节点就行，这上面是jsx语法来写，如果用纯js，那就是用一个对象的属性来描述这个组件的html信息

```react
function Button (props) {
  return React.createElement(
    "button",
    { type: "submit" },
    props.label
  );
}

// 要使用 Button，你可以这么做
ReactDOM.render(
  React.createElement(Button, { label: "Save" }),
  mountNode
);
```

React 的 `createElement` 函数是一个高级函数，有和 `document.createElement` 同样的功能，但它也可以用于创建一个表示 React 组件的元素。当我们使用上面例 2 中的按钮组件时，我们使用的是后者。

对比上面两个能发现，上面那个是react组件，但是下面用creatElement生成的是一个react元素

所以现在使用jsx语法，可以在js代码中写类似html的语法

这就是 JSX。这是一种折中的方案，允许我们用类似 HTML 的语法来编写我们的 React 组件，这是一个很好的方法。

这是 JSX 内唯一的约束：只有表达式。例如，你不能使用 `if` 语句，但三元表达式是可以的。

React 认为 `{true}`、 `{false}`
`{undefined}` 和 `{null}` 是有效元素，不呈现任何内容。

我们也可以在 JSX 中使用所有的 JavaScript 的集合方法（`map`、`reduce` 、`filter`、 `concat` 等）。因为他们返回的也是表达式：

```react
const Doubler = ({value=[1, 2, 3]}) =>
  <div>
    {value.map(e => e * 2)}
  </div>;

// 使用下面内容 
ReactDOM.render(<Doubler />, mountNode);
```

例 9：使用 JavaScript 类创建组件

类的语法是非常简单的：定义一个扩展的 `React.Component` 类（另一个你需要学习的 React 的顶级 API）。该类定义了一个单一的实例函数 —— `render()`，并使函数返回虚拟 DOM 对象。每一次我们使用基于类的 `Button` 组件（例如，通过 `<Button ... />`）,React 将从这个基于类的组件中实例化对象，并在 DOM 树中使用该对象。

这就是为什么上面的例子中我们可以在 JSX 中使用 `this.props.label` 渲染输出的原因，因为每一个组件都有一个特殊的称为 `props` 的 **实例** 属性，这让所有的值传递给该组件时被实例化。

由于我们有一个与组件的单个使用相关联的实例，所以我们可以按照自己的意愿定制该实例。例如，我们可以通过使用常规 JavaScript 构造函数来构造它：

```react
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.id = Date.now();
  }
  render() {
    return <button id={this.id}>{this.props.label}</button>;
  }
}

// 使用
ReactDOM.render(<Button label="Save" />, mountNode);
```

这种用类的方式写的，就是能用this的原因（构造函数中的this）

#### 5 React 中的事件：两个重要的区别

当处理 React 元素中的事件时，我们与 DOM API 的处理方式有两个非常重要的区别：

- 所有 React 元素属性（包括事件）都使用 **camelCase** 命名，而不是 **lowercase**。例如是 `onClick` 而不是 `onclick`。
- 我们将实际的 JavaScript 函数引用传递给事件处理程序，而不是字符串。例如是 `onClick={handleClick}` 而不是 `onClick="handleClick"`。

**React 用自己的对象包装 DOM 对象事件以优化事件处理的性能**，但是在事件处理程序内部，我们仍然可以访问 DOM 对象上所有可以访问的方法。React 将经过包装的事件对象传递给每个调用函数。例如，为了防止表单提交默认提交操作，你可以这样做：

```react
class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// 使用
ReactDOM.render(<Form />, mountNode);
```

#### 6 每一个 React 组件都有一个故事：第 1 部分

以下仅适用于类组件（扩展 `React.Component`）。函数组件有一个稍微不同的故事。

1. 首先，我们定义了一个模板来创建组件中的元素。
2. 然后，我们在某处使用 React。例如，在 `render` 内部调用其他的组件，或者直接使用 `ReactDOM.render`。
3. 然后，React 实例化一个对象然后给它设置 **props** 然后我们可以通过 `this.props` 访问。这些属性都是我们在第 2 步传入的。
4. 因为这些全部都是 JavaScript，`constructor` 方法将会被调用（如果定义的话）。这是我们称之为的第一个：**组件生命周期方法**。
5. 接下来 React 计算渲染之后的输出方法（虚拟 DOM 节点）。
6. 因为这是 React 第一次渲染元素，React 将会与浏览器连通（代表我们使用 DOM API）来显示元素。这整个过程称为 **mounting**。
7. 接下来 React 调用另一个生命周期函数，称为 `componentDidMount`。我们可以这样使用这个方法，例如：在 DOM 上做一些我们现在知道的在浏览器中存在的东西。在此生命周期方法之前，我们使用的 DOM 都是虚拟的。
8. 一些组件的故事到此结束，其他组件得到卸载浏览器 DOM 中的各种原因。在后一种情况发生时，会调用另一个生命周期的方法，`componentWillUnmount`。
9. 任何 mounted 的元素的**状态**都可能会改变。该元素的父级可能会重新渲染。无论哪种情况，mounted 的元素都可能接收到不同的属性集。React 的魔力就是这儿，我们实际上需要的正是 React 的这一点！在这一点之前，说实话，我们并不需要 React。
10. 组价的故事还在继续，但是在此之前，我们需要理解我所说的这种**状态**。



每一个react组件都有对应的生命周期，但是和vue不一样，对于第九条不了解看不懂



#### 7 React 组件可以具有私有状态

以下只适用于类组件。我有没有提到有人叫表象而已的部件 **dumb**？

状态类是任何 React 类组件中的一个特殊字段。React 检测每一个组件状态的变化，但是为了 React 更加有效，我们必须通过 React 的另一个 API 改变状态字段，这就是我们要学习的另一个 API —— `this.setState`：

```react
class CounterButton extends React.Component {
  state = {
    clickCounter: 0,
    currentTimestamp: new Date(),
  };

  handleClick = () => {
    this.setState((prevState) => {
     return { clickCounter: prevState.clickCounter + 1 };
    });
  };

  componentDidMount() {
   setInterval(() => {
     this.setState({ currentTimestamp: new Date() })
    }, 1000);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <p>Clicked: {this.state.clickCounter}</p>
        <p>Time: {this.state.currentTimestamp.toLocaleString()}</p>
      </div>
    );
  }
}

// 使用
ReactDOM.render(<CounterButton />, mountNode);
```

react组件中的state是私有状态

我们应该怎样更新状态呢？我们返回一个有我们想要更新的的值的对象。注意，在调用 `setState` 时，我们全部都从状态中传入一个属性或者全都不。这完全是可以的因为 `setState` 实际上 **合并** 了你通过它（返回值的函数参数）与现有的状态，所以，没有指定一个属性在调用 `setState` 时意味着我们不希望改变属性（但不删除它）。


能拿到所有的state，返回一部分，是会合并而不是覆盖

10，react钩子待看

-----

# react官网入门教程---搭环境了解入门（1完成

npx和npm区别

主要特点：

1、临时安装可执行依赖包，不用全局安装，不用担心长期的污染。

2、可以执行依赖包中的命令，安装完成自动运行。

3、自动加载node_modules中依赖包，不用指定$PATH。

4、可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题。

```react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component { // 棋格
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component { //棋盘
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


```

数据通过 props 的传递，从父组件流向子组件。

父亲到孩子用props

孩子修改实例的state？？？？

这里还是需要理解下

react中是把子组件变量放到外层，让button变成受控组件

因为 Square 组件不再持有 state，因此每次它们被点击的时候，Square 组件就会从 Board 组件中接收值，并且通知 Board 组件。在 React 术语中，我们把目前的 Square 组件称做“受控组件”。在这种情况下，Board 组件完全控制了 Square 组件

> 整个数据流是这样，
>
> 子组件向外层抛出事件： onClick={() => this.props.onClick()} 
>
> <Square
>
> ​    value={this.state.squares[i]}
>
> ​    onClick={() => this.handleClick(i)}
>
>    />
>
> 父组件接受到了子组件的事件： 然后改变父组件实例的state，因为子组件里面的props变量来自state，当state发生变化之后，就会更新对应的子组件。问题： 是全部更新，还是能检测到具体的、

问题：react 为什么要只能使用setState来改变state

如果直接修改数据，那么就很难跟踪到数据的改变。跟踪数据的改变需要可变对象可以与改变之前的版本进行对比，这样整个对象树都需要被遍历一次。

跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。

不可变性最主要的优势在于它可以帮助我们在 React 中创建 *pure components*。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。

vue利于编码   react好处在哪呢？？

目前看到：那级组件要用到，就放父组件中



React 会通过 `key` 来自动判断哪些组件需要更新。组件是不能访问到它的 `key` 的。







