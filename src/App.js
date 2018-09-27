import React, {Component} from 'react';
import './App.css';
import Sidebar from "react-sidebar";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const styles = {
    sidebar: {
        width: 256,
        height: "100%",
        position:"relative"
    },
    sidebarLink: {
        display: "block",
        padding: "20px 20px",
        color: "#757575",
        textDecoration: "none"
    },
    divider: {
        margin: "10px 0",
        height: 1,
        backgroundColor: "#757575"
    },
    content: {
        height: "100%",
        backgroundColor: "white",
    }
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true,
            results: {
                "inputData": 0,
            },
            data: [
                {"failed": []},
                {"success": []}
            ],
            inputValue: 0
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.sieveOfEratosthenes = this.sieveOfEratosthenes.bind(this);
        // this.runit = this.runit.bind(this);
        // this.builtinRead = this.builtinRead.bind(this);
        // this.outf = this.outf.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    // handleClick() {
    //     this.sieveOfEratosthenes(this.state.inputValue)
    // }
    //
    // handleChange(e) {
    //     this.setState({inputValue: e.target.value})
    // }
    //
    // outf(text) {
    //     var mypre = document.getElementById("output");
    //     mypre.innerHTML = mypre.innerHTML + text;
    // }
    //
    // builtinRead(x) {
    //     if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles["files"][x] === undefined)
    //         throw "File not found: '" + x + "'";
    //     return window.Sk.builtinFiles["files"][x];
    // }
    //
    // runit() {
    //     var prog = document.getElementById("yourcode").value;
    //     var mypre = document.getElementById("output");
    //     mypre.innerHTML = '';
    //     window.Sk.pre = "output";
    //     window.Sk.configure({output: this.outf, read: this.builtinRead});
    //     (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas';
    //     var myPromise = window.Sk.misceval.asyncToPromise(function () {
    //         return window.Sk.importMainWithBody("<stdin>", false, prog, true);
    //     });
    //     myPromise.then(function (mod) {
    //             console.log('success');
    //         },
    //         function (err) {
    //             console.log(err.toString());
    //         });
    // }
    //
    //
    // sieveOfEratosthenes(n) {
    //     let primes = [];
    //     for (let i = 2; i <= n; i++) {
    //         primes[i] = true;
    //     }
    //     let p = 2;
    //     do {
    //         for (let i = 2 * p; i <= n; i += p) {
    //             primes[i] = false;
    //         }
    //         for (let i = p; i <= n; i++) {
    //             if (primes[i] && i > p) {
    //                 p = i;
    //                 break;
    //             }
    //         }
    //     } while (p * p < n);
    //     let primesValues = [];
    //     let primesFailes = [];
    //     for (let i = 2; i <= n; i++) {
    //         if (primes[i]) {
    //             primesValues.push(i);
    //         } else {
    //             primesFailes.push(i);
    //         }
    //     }
    //     this.setState({"data": [{'success': primesValues}, {'failed': primesFailes}]});
    //     console.log(this.state.data)
    // }

    render() {
        const links = [];
        const columns = [{
            dataField: 'failed',
            text: 'Product Name'
        }, {
            dataField: 'success',
            text: 'Product Price'
        }];
        for (let ind = 0; ind < 10; ind++) {
            links.push(
                <a key={ind} href="#" style={styles.sidebarLink}>
                    Решето Эратосфена
                </a>
            );
        }
        return (
            <div className="App">
                <Sidebar
                    sidebar={links}
                    docked={true}
                    // open={this.state.sidebarOpen}
                    // onSetOpen={this.onSetSidebarOpen}
                    styles={styles}
                >
                    <h1>Решето Эратосфена</h1>
                    <p>Для нахождения всех простых чисел не больше заданного числа n, следуя методу Эратосфена, нужно
                        выполнить следующие шаги:
                        <ul>
                            <li> Выписать подряд все целые числа от двух до n (2, 3, 4, …, n).</li>
                            <li> Пусть переменная p изначально равна двум — первому простому числу.</li>
                            <li>Зачеркнуть в списке числа от 2p до n считая шагами по p (это будут числа кратные p: 2p, 3p,
                                4p, …).
                            </li>
                            <li> Найти первое незачёркнутое число в списке, большее чем p, и присвоить значению переменной p
                                это число.
                            </li>
                            <li>Повторять шаги 3 и 4, пока возможно.</li>
                            <li>Теперь все незачёркнутые числа в списке — это все простые числа от 2 до n.</li>
                        </ul>
                        На практике, алгоритм можно улучшить следующим образом. На шаге № 3 числа можно зачеркивать начиная
                        сразу с числа p2, потому что все составные числа меньше него уже будут зачеркнуты к этому времени.
                        И, соответственно, останавливать алгоритм можно, когда p2 станет больше, чем n.[2]
                        Также, все простые числа (кроме 2) — нечётные числа, и поэтому для них можно считать шагами по 2p,
                        начиная с p2.
                    </p>
                    <h1>Алгорит решения на языке Python:</h1>
                    <pre>
                {`
def solve(n):
  if (n < 1):
    raise ValueError("n must be a positive integer")
  elif (n == 1):
    return []

  booleanSieve = [True for i in range(n)]

  booleanSieve[0] = False
  booleanSieve[1] = False

  for prime in range(2, n):
    if (booleanSieve[prime]):
      sieveNum = prime + prime

      while (sieveNum < n):
        booleanSieve[sieveNum] = False
        sieveNum += prime
  print([x for x in range(n) if booleanSieve[x]])
  return [x for x in range(n) if booleanSieve[x]]
solve(10000)
                    `}
            </pre>
                    <iframe height="400px" width="100%" src="https://repl.it/repls/SpottedExcitableProgram?lite=true"
                            scrolling="no" frameBorder="no" allowTransparency="true" allowFullScreen="true"
                            sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

                </Sidebar>
            </div>
        );
    }
}

export default App;
