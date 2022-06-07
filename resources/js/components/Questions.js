import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button, CardHeader, CardBody, CardTitle } from 'reactstrap'
import QuestionCounter from './QuestionCounter'

const Questions = ({
  currentQuestion,
  setCurrentQuestion,
  questions,
  handleChange,
  getAnswer,
  getValidate,
  setTime
}) => {
  return (
    <Card>
      <CardHeader tag="h5">
        <QuestionCounter count={currentQuestion + 1} total={questions.length} />
      </CardHeader>
      <CardBody>
        <CardTitle>Select True or false</CardTitle>
        <h4 className="my-2">{questions[currentQuestion]?.question}</h4>
        <div className="mt-3">
          <input
            id="true"
            type="radio"
            value={1}
            name="answer"
            onChange={(e) => {
              handleChange(e.target.value, questions[currentQuestion]?.id)
            }}
            checked={getAnswer(questions[currentQuestion]?.id) == 1}
          />
          <label style={{ cursor: 'pointer' }} className="mx-2 " htmlFor="true">
            True
          </label>
        </div>
        <div className="my-1">
          <input
            id="false"
            type="radio"
            value={0}
            name="answer"
            onChange={(e) => {
              handleChange(e.target.value, questions[currentQuestion]?.id)
            }}
            checked={getAnswer(questions[currentQuestion]?.id) == 0}
          />
          <label style={{ cursor: 'pointer' }} className="mx-2" htmlFor="false">
            False
          </label>
        </div>
        <div className="d-flex justify-content-between mt-4 mb-2">
          {currentQuestion + 1 === 1
            ? (
            <Button disabled>Previous</Button>
              )
            : (
            <Button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
              Previous
            </Button>
              )}
          {currentQuestion + 1 === questions.length
            ? (
            <Button
              color="primary"
              onClick={() => {
                setTime((oldTime) => {
                  return {
                    ...oldTime,
                    endTime: Date.now()
                  }
                })
                getValidate()
              }}
              disabled={!getAnswer(questions[currentQuestion]?.id)}
            >
              Finish
            </Button>
              )
            : (
            <Button
              color="info"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!getAnswer(questions[currentQuestion]?.id)}
            >
              Next
            </Button>
              )}
        </div>
      </CardBody>
    </Card>
  )
}

Questions.propTypes = {
  currentQuestion: PropTypes.any,
  setCurrentQuestion: PropTypes.func,
  questions: PropTypes.any,
  handleChange: PropTypes.func,
  getAnswer: PropTypes.any,
  getValidate: PropTypes.any,
  setTime: PropTypes.func
}

export default Questions
