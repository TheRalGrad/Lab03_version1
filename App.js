import React from 'react';
import Charactercard from './CharacterCard';
import './App.css'
import _ from 'lodash'

let message = 'TA lover';

const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    attempt: 1,
    guess: [],
    completed: false
  }
}


class HelloWorld extends Component {
  render() {
    const { fullName, birthday } = this.props
    
    return (
      <div>
        <h1>สวัสดีชาวโลก ผมชื่อ {fullName}</h1>
        <time datetime={birthday.toISOString()}>
          {birthday.toLocaleDateString()}
        </time>
      </div>
    )
  }
}
<HelloWorld 
  fullName='Jakkrekarn Fuangsuwan'
  birthday={new Date()} />


class App extends React.Component {

  state = prepareStateFromWord(message);


  activationHandler = (c) => {
      let guess = [...this.state.guess, c]
      this.setState({guess})
      if(guess.length == this.state.chars.length){
        if(guess.join('').toString() == this.state.word){
          this.setState({guess: [], completed: true})
        }else{
          this.setState({guess: [], attempt: this.state.attempt + 1})
        }
      }
  }

  render() {
    return (
      <div>
         <h2>Card Game for lab</h2>
        {
          Array.from(this.state.chars).map((item, index) => (
            <Charactercard
              value={item}
              key={index}
              activationHandler={this.activationHandler}
            />
          ))
        }
         <h2>Selected</h2>
        {
          Array.from(this.state.guess).map((item, index) => (
            <Charactercard
              value={item}
              key={index}
              activationHandler={this.activationHandler}
            />
          ))
        }
        <div>Attemp {this.state.attempt}</div>
        {
          this.state.completed && <h4>Victory</h4>
        }
      </div>
    )
  }
}
 
export default App;
