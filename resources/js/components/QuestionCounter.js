import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { display } from '../helper'

const QuestionCounter = ({ count, total }) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((old) => old + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="d-flex justify-content-between">
      <div>
        Question {count} of {total}
      </div>
      <div>{display(seconds)}</div>
    </div>
  )
}

QuestionCounter.propTypes = {
  count: PropTypes.string,
  total: PropTypes.string
}

export default QuestionCounter
