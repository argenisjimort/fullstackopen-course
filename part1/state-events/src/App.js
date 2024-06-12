import {useState} from 'react';

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const Display = ({counter}) => {
  return(
    <div>{counter}</div>
  )
}

const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick} >{text}</button>
  )
}

const History = (props) => {
  
  if ( props.allClicks.length ) {
    return(
      <div> {props.allClicks.join(` `)} </div>
    )
  }
  
  else {
    return (
      <div> the app is used by cliking the buttons </div>
    )
  }
}

const App = () => {
  const name = 'Peter'
  const age = 10

  const [counter, setCounter] = useState(0);
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })
  const [allClicks, setAllClicks] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);

  const increaseByOne = () => {
    console.log(`increasing...`, counter);
    setCounter(counter+1);
  } 
  const setToZero = () => {
    console.log(`setting the counter to Zero`)
    setCounter(0);
  }
  const decreaseByOne = () => {
    console.log(`decreasing...`, counter);
    setCounter(counter-1);
  }


  const increaseLeft = () => {
    console.log(`left`);
    setAllClicks(allClicks.concat(`L`));
    const updatedClick = clicks.left + 1;
    setClicks({
      ...clicks,
      left: updatedClick
    });
    setTotalClicks( updatedClick + clicks.right );
  }

  const increaseRight = () => {
    console.log(`right`);
    setAllClicks(allClicks.concat(`R`));
    const updatedClick = clicks.right +1;
    setClicks({
      left: clicks.left,
      right: updatedClick,
    });
    setTotalClicks( clicks.left + updatedClick );
  }


  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />

      <Button handleClick={increaseByOne} text="Increase By One" />
      <Button handleClick={setToZero} text="Set to Zero" />
      <Button handleClick={decreaseByOne} text="Decrease By One" />
      <Button handleClick={increaseLeft} text="increase left" />
      <Button handleClick={increaseRight} text="increase right" />

      < Display counter={counter} />
      < Display counter={clicks.left} />
      < Display counter={clicks.right} />

      <History allClicks={allClicks} />
      <Display counter={totalClicks} />


    </div>
  )
}


export default App;