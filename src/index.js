import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//         return (
//             <button className="square" onClick={() => {this.props.onClick()}}>
//             {this.props.value}
//             </button>
//         );
//     }
// }
function Square (props) {       // 函数组件
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    // constructor () {         // 组件状态提升至父组件，由props传入
    //     super();
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     }
    // }
    renderSquare(i) {
        return (<Square value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                />);
    }
    render() {
        return (
        <div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}
  
class Game extends React.Component {
    constructor () {
        super();
        this.state = {
            history: [
                {
                     squares : Array(9).fill(null),
                }
            ],
            stepNumber: 0,
            xIsNext: true,
        }
    }
    handelClick (i) {
        // 如果是悔棋则可以保证history数组保持指定长度
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'Y';
        this.setState({
            history: history.concat([{squares: squares}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo (index) {
        this.setState({
            xIsNext: (index % 2) ? false : true,
            stepNumber: index,
            history: this.state.history.slice(0, index + 1)
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // 创建历史记录列表
        const moves = history.map((value, index) => {
            const desc = index ? 'Move #' + index : 'Game start';
            return (
                <li key={index}>
                    <a href="javascript:;" 
                        onClick={() => this.jumpTo(index)}>
                        {desc}
                    </a>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'Y');
        }

        return (
            <div className="game">
            <div className="game-board">
                <Board 
                    squares = {current.squares}
                    onClick = {(i) => this.handelClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
  }
/*
*   计算winner
*/
function calculateWinner (squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
