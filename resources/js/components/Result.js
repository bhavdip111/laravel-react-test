import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'reactstrap'
import { display } from '../helper'

const Result = ({ result, total, time, resetQuiz }) => {
  return (
    <div style={{ width: '90%', margin: 'auto ', maxWidth: '500px' }}>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <h3>
          Your Score {result?.score}/{total}{' '}
          {result?.score > 5 ? <span>Great</span> : <span>Bad</span>}
        </h3>
        <h4>{display(parseInt((time.endTime - time.startTime) / 1000))}</h4>
      </div>
      <Table className="text-center" striped>
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {result.response.map((resultData, index) => (
            <tr className="text-capitalize" key={resultData.id}>
              <th scope="row">{resultData.id}</th>
              <td>{resultData.your_answer.toString()}</td>
              <td>{resultData.correct_answer.toString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <Button color="primary" size="lg" onClick={resetQuiz}>
          Re-Attempt Quiz
        </Button>
      </div>
    </div>
  )
}

Result.propTypes = {
  result: PropTypes.any,
  total: PropTypes.string,
  time: PropTypes.string,
  resetQuiz: PropTypes.func
}

export default Result
