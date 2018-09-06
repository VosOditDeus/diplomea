import React, { Component } from 'react';
import './App.css';
import Sidebar from "react-sidebar";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const styles = {
    sidebar: {
        width: 256,
        height: "100%"
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
        padding: "16px",
        height: "100%",
        backgroundColor: "white"
    }
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: true,
            results:{
                "inputData":0,
            },
            data:[
                {"failed":[]},
                {"success":[]}
            ],
            inputValue:0
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sieveOfEratosthenes = this.sieveOfEratosthenes.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }
    handleClick() {
        this.sieveOfEratosthenes(this.state.inputValue)
    }
    handleChange(e) {
        this.setState({inputValue:e.target.value})
    }



    sieveOfEratosthenes(n) {
        let primes = [];
        for (let i = 2; i <= n; i++) {
            primes[i] = true;
        }
        let p = 2;
        do {
            for (let i = 2 * p; i <= n; i += p) {
                primes[i] = false;
            }
            for (let i = p; i <= n; i++) {
                if (primes[i] && i > p) {
                    p = i;
                    break;
                }
            }
        } while (p * p < n);
        let primesValues = [];
        let primesFailes = [];
        for (let i = 2; i <= n; i++) {
            if (primes[i]) {
                primesValues.push(i);
            }else{
                primesFailes.push(i);
            }
        }
        this.setState({"data":[{'success':primesValues},{'failed':primesFailes}]});
        console.log(this.state.data)
    }
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
              docked = {true}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              styles={{ sidebar: { background: "white" } }}
          >
          </Sidebar>
          <h1>Решето Эратосфена</h1>
          <p>Для нахождения всех простых чисел не больше заданного числа n, следуя методу Эратосфена, нужно выполнить следующие шаги:
<ul>
    <li> Выписать подряд все целые числа от двух до n (2, 3, 4, …, n).</li>
                 <li> Пусть переменная p изначально равна двум — первому простому числу.</li>
                     <li>Зачеркнуть в списке числа от 2p до n считая шагами по p (это будут числа кратные p: 2p, 3p, 4p, …).</li>
                         <li> Найти первое незачёркнутое число в списке, большее чем p, и присвоить значению переменной p это число.</li>
                             <li>Повторять шаги 3 и 4, пока возможно.</li>
                                 <li>Теперь все незачёркнутые числа в списке — это все простые числа от 2 до n.</li>
</ul>
              На практике, алгоритм можно улучшить следующим образом. На шаге № 3 числа можно зачеркивать начиная сразу с числа p2, потому что все составные числа меньше него уже будут зачеркнуты к этому времени. И, соответственно, останавливать алгоритм можно, когда p2 станет больше, чем n.[2]
              Также, все простые числа (кроме 2) — нечётные числа, и поэтому для них можно считать шагами по 2p, начиная с p2.</p>
          <h1>Алгорит решения на языке Python:</h1>
            <pre>
                {`
                if (n < 1):
                raise ValueError(n must be a positive integer)
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

                  return [x for x in range(n) if booleanSieve[x]]
                    `}
            </pre>
          <input
              type="number"
              value={this.state.inputValue}
              onChange={ this.handleChange.bind(this) }
              placeholder="Input number" />

          <button
              className=""
              onClick={ this.handleClick.bind(this, this.state.results.inputValue)}>Запустить</button>
          {/*<BootstrapTable keyField='id' data={ this.state.data } columns={ columns } />*/}
          <div>
              Not prime :
              {this.state.data.success.map((succ)=>{

              })}
          </div>
      </div>
    );
  }
}

export default App;
