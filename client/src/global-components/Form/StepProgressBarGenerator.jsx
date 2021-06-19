import React,{useState,useEffect} from 'react'
import "react-step-progress-bar/styles.css"
import { ProgressBar, Step } from "react-step-progress-bar"
import '../../css/form.css'
function StepProgressBarGenerator(props){
      const [steps,setSteps]=useState(props.stepsCompleted)
      const [total,setTotal]=useState(props.totalSteps)
      useEffect(_=>{
            setSteps(props.stepsCompleted)
            setTotal(props.totalSteps)
      },[props,steps,total])
      return (
        <ProgressBar
            percent={(steps)/(total-1)*100}
            > 
        {[...Array(total).keys()].map(i=>
        <Step transition="scale">
              {({ accomplished }) => (
                    <div className="step-container">
                          <svg height="40" width="40"
                                style={{
                                      position: 'absolute',
                                      top:"0",
                                      left:"0",
                                }}>
                                <ellipse cx="20" cy="20" rx="15" ry="15" 
                                      className={`${accomplished ? "accomplished":"todo"}`}
                                ></ellipse>
                          </svg>
                          <div className="label">{`${i+1}`}</div>
                    </div>
              )}
        </Step>
        )
      }
  </ProgressBar>
    )
}
export default StepProgressBarGenerator