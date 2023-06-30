import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const StatisticLine = (props) => {
    const {text, value} = props;
    return (
      <tr>
        <td>{text}:</td> 
        <td>{value}</td>
      </tr>
    )
  }


  const Statistics = (props) => {
    const {good, bad, neutral} = props;

    if ( good || bad|| neutral ) {
      return (
        <table>
          <tbody>
            <StatisticLine text={`Good`} value={good} />
            <StatisticLine text={`Neutral`} value={neutral} />
            <StatisticLine text={`Bad`} value={bad} />
            <StatisticLine text={`All:`} value={ good + bad + neutral  } />
            <StatisticLine text={`Promedium`} value={ (good - bad) / (good + bad + neutral) } />
            <StatisticLine text={`Positive Feedback`} value={ (good * 100) / (good + bad + neutral) + `%` } />
          </tbody>
        </table>
      )
    } else {
      return (
        <div>No Feedback given yet :(</div>
      )
    }
  }

  return (
    <div>
      <h2> Give Feedback </h2>
      <button onClick={ () => { setGood( good+1 )} } >Good</button>
      <button onClick={ () => {setNeutral( neutral+1 )}} > Neutral</button>
      <button onClick={ () => {setBad( bad+1 )}} > Bad</button>

      <h2> Opinions </h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
      
    </div>
  )
}

export default App