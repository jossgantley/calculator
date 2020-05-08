import React from 'react';
import  Calculator  from "./Calculator.jpg" 

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isPositive: true,
      isOperator: false,
      lastSign: null,
    
      previousValue: null,
      currentValue: "",
      displayValue: null,
      equationArray: [],
      isOn: false
    }
  }
handlePowerOn = () => {
  this.setState({
    isPositive: true,
    displayValue: "0",
    isOn: true,
    lastSign: null,
    isOperator:false,
    equationArray: [],
    previousValue: null,
    currentValue: "",

  })
}
handleNumber = (event) =>{
  this.setState({isOperator: false});
  const value = event.target.value;
  if (this.state.isOn===true){
   if (this.state.displayValue==="0"){
     this.setState({
      previousValue: 1,
      currentValue: value,
      displayValue: value,
      
     })
   } else if (this.state.displayValue.length===10){
     this.setState(state=>({
       displayValue: state.displayValue
     }))
   } else if (this.state.currentValue.length>0){
     if(value==="." && this.state.currentValue.indexOf(".")!==-1){
       this.setState(state=>({
         currentValue: state.displayValue,
        
       }))
      
    }else {
     this.setState(state=>({
       
       currentValue: state.displayValue + value,
       displayValue: state.displayValue + value,
      
     }))
    }
   }else if (this.state.currentValue===0){
     this.setState({
      displayValue: value,
       currentValue: value

     })
   }
  }
 
}
handleCancel = () =>{
  if(this.state.isOn===true){
    this.setState({
      isPositive: true,
    displayValue: "0",
    isOn: true,
    lastSign: null,
    isOperator:false,
    equationArray: [],
    previousValue: null,
    currentValue: "",
  
    })
  }
  
}
handleOperator = (event) => {
  this.setState({isOperator:true})
  const value=event.target.value;
  if (this.state.isOn===true){
    if (this.state.isOperator===false){
    if (value==="*" || value==="/"){
      if (this.state.lastSign==="="){
        
        this.setState(state=>({
        previousValue:state.previousValue,
        lastSign: value,
        currentValue: 0,
        equationArray: []
        }))
      }
  else if (this.state.lastSign===null || this.state.lastSign==="+" || this.state.lastSign==="-"){
    this.setState(state=>({
      previousValue: state.currentValue,
    lastSign: value,
    currentValue: 0 
    }))  }
  else if (this.state.lastSign==="*"){
  this.setState(state=>({
    previousValue: Number(state.currentValue)*Number(state.previousValue),
    lastSign: value,
    currentValue: 0,
    displayValue: Number(state.currentValue)*Number(state.previousValue), 
  }))
}
else if (this.state.lastSign==="/"){
  this.setState(state=>({
    previousValue: Number(state.previousValue)/Number(state.currentValue),
    lastSign: value,
    currentValue: 0,
    displayValue:  Number(state.previousValue)/Number(state.currentValue)
  }))
}
}


else if (value==="-" || value==="+"){
 
    if (this.state.lastSign===null || this.state.lastSign==="+" || this.state.lastSign==="-" || this.state.lastSign==="="){
      
      this.setState(state=>({
        
        previousValue: state.currentValue,
      lastSign: value,
      currentValue: 0, 
      displayValue:0,
      equationArray: [...state.equationArray, state.isPositive? (Number(state.currentValue)):(
        -(Number(state.currentValue)))],
      isPositive: value==="-"? false : true,
      }))  
    }
    else if (this.state.lastSign==="*"){
    this.setState(state=>({
      
      previousValue: state.isPositive? (Number(state.currentValue)*Number(state.previousValue)):(
        -(Number(state.currentValue)*Number(state.previousValue))),
      lastSign: value,
      currentValue: 0,
      equationArray: [...state.equationArray, state.isPositive? (Number(state.currentValue)*Number(state.previousValue)):(
        -(Number(state.currentValue)*Number(state.previousValue)))], 
      displayValue: state.isPositive? (Number(state.currentValue)*Number(state.previousValue)):(
        -(Number(state.currentValue)*Number(state.previousValue))), 
      isPositive: value==="-"? false : true,
    }))
  }
  else if (this.state.lastSign==="/"){
    this.setState(state=>({
   
      previousValue: state.isPositive? (Number(state.previousValue)/Number(state.currentValue)) :
      (-(Number(state.previousValue)/Number(state.currentValue))),
      lastSign: value,
      currentValue: 0,
      equationArray: [...state.equationArray, state.isPositive? (Number(state.previousValue)/Number(state.currentValue)) :
        (-(Number(state.previousValue)/Number(state.currentValue)))],
      displayValue:  state.isPositive? (Number(state.previousValue)/Number(state.currentValue)) :
      (-(Number(state.previousValue)/Number(state.currentValue))),
      isPositive: value==="-"? false : true,
    }))
  }
  
}

}else if (this.state.isOperator){


if (value==="*" || value==="/"){
  
  if (this.state.lastSign==="-" || this.state.lastSign==="+"){
    
    this.setState(state=>({
      previousValue: [...state.equationArray][state.equationArray.length-1],
      lastSign: value,
      currentValue: 0, 
      displayValue:0,
      equationArray: [...state.equationArray].filter((item, index)=>{return item[index<state.equationArray.length-1]}),
      isPositive: true,
      
      
    }))
  }else if (this.state.lastSign==="*" || this.state.lastSign==="/"){
    
    this.setState({
      lastSign: value
     
    })
  }
} else if (value==="+" || value ==="-"){
 if (this.state.lastSign==="+" || this.state.lastSign==="-"){
    console.log("hi")
    this.setState(state=>({
      lastSign: value,
      isPositive: value==="+" ? true: false,
      equationArray: [...state.equationArray.filter((item, index)=>{return item[index<state.equationArray.length-1]}),  Number(state.previousValue)]
    }))
  } else if (value==="-" && (this.state.lastSign==="*" || this.state.lastSign==="/")){
   
    if (this.state.lastSign==="*"){
     console.log("also hi") 
    this.setState({
      isPositive: value==="+" ? true: false,
      lastSign:"*-" 
     

    })
  }else if(this.state.lastSign==="/"){
    console.log("well")
    this.setState({
      isPositive: value==="+" ? true: false,
      lastSign: "/-"
    })
  }
  }else {
    console.log("nowhere")
  this.setState(state=>({
   lastSign: value,
   isPositive: value==="+" ? true: false,
   equationArray:  [...state.equationArray, Number(state.previousValue)]
  }))
}}

  }
}}
  
handleEquals=()=>{
  if (this.state.isOn===true){
   
    if (this.state.lastSign===null || this.state.lastSign==="+" || this.state.lastSign==="-"){
      this.setState(state=>({
      isPositive: true,
      previousValue: [...state.equationArray, state.isPositive? (Number(state.currentValue)):(
        -(Number(state.currentValue)))].reduce((a,b)=>{return a+b}, 0),
      lastSign: "=",
      currentValue: 0, 
      displayValue: [...state.equationArray, state.isPositive ? (Number(state.currentValue)):(
        -(Number(state.currentValue)))].reduce((a,b)=>{return a+b}, 0),
      equationArray: [...state.equationArray, state.isPositive? (Number(state.currentValue)):(
        -(Number(state.currentValue)))],
    
      }))  
    } else if (this.state.lastSign==="*"|| this.state.lastSign==="*-"){
      this.setState(state=>({
        isPositive: true,
        lastSign:"=",
        previousValue: [...state.equationArray, state.isPositive? (Number(state.currentValue)*Number(state.previousValue)):(
          -(Number(state.currentValue)*Number(state.previousValue)))].reduce((a,b)=>{return a+b;}, 0),
        
        currentValue: 0,
        equationArray: [...state.equationArray, state.isPositive? (Number(state.currentValue)*Number(state.previousValue)):(
          -(Number(state.currentValue)*Number(state.previousValue)))], 
        displayValue: [...state.equationArray, state.isPositive? (Number(state.currentValue)*Number(state.previousValue)):(
          -(Number(state.currentValue)*Number(state.previousValue)))].reduce((a,b)=>{return a+b;}, 0)
        
      }))
    }else if (this.state.lastSign==="/" || this.state.lastSign==="/-"){
      this.setState(state=>({
        isPositive: true,
        previousValue: [...state.equationArray, state.isPositive? (Number(state.previousValue)/Number(state.currentValue)) :
          (-(Number(state.previousValue)/Number(state.currentValue)))].reduce((a,b)=>{return a+b;}, 0),
        lastSign:"=",
        currentValue: 0,
        equationArray: [...state.equationArray, state.isPositive? (Number(state.previousValue)/Number(state.currentValue)) :
          (-(Number(state.previousValue)/Number(state.currentValue)))],
        displayValue:  [...state.equationArray, state.isPositive? (Number(state.previousValue)/Number(state.currentValue)) :
          (-(Number(state.previousValue)/Number(state.currentValue)))].reduce((a,b)=>{return a+b;}, 0),
     
      }))
    }

  }
  

}
  render(){
    console.log(this.state)
    
    const calculatorStyles = {
      backgroundImage: `url(${Calculator})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "100% 100%",
      width: "27.5vw",
      height: "47.5vw",
      marginTop: "10vw",
      padding: "none",
      margin: "auto"
    }
    const displayStyle = {
      
      height: "25%",
      lineHeight: "17.5s%",
      width: "80%",
      textAlign: "right",
      marginLeft: "auto",
      marginRight: "auto",
      fontSize: "4.3vw",
      fontWeight: "550",
      letterSpacing: "0",
      paddingRight: "1.5vw",
    
      marginBottom: "0",
      position: "relative",
      top: "60%"
    }
    const topDivStyle = {
      
      
      width: "100%",
      height: "35%",
   
      margin: "none"

    }
    const keyPadStyle = {
      
      width: "100%",
      height: "58.75%",
     
      marginTop: "0"

    }
    const topRowStyle = {
     
      marginTop: "11%",
      marginBottom: "0",
      padding: "none",
      height: "8.5%"
      

    }
    const topRowButton = {
      
      boxShawdow: "none",
      borderStyle: "none",
      padding: "none",
      marginRight: "1.5%",
      marginLeft: "1.5%",
      height: "100%",
      width: "11%",
      borderRadius: "20%",
      color: "rgba(0,0,0,0)",
      marginBottom: "0",
      marginTop: "0"

    }
    const CCEButton = {
      boxShawdow: "none",
      borderStyle: "none",
      
      marginLeft: "3.5%", 
      height: "100%",
      width: "14.5%",
      marginRight: "0%",
      borderRadius: "20%",
      color: "rgba(0,0,0,0)",
      marginBottom: "0",
      marginTop: "0",
      padding: "none"

    }
    const rowStyle = {
      
      padding: "none",
      marginTop: "5%",
      marginBottom: "-1.5%",
      width: "100%",
      height: "12%",
  
    }
    const bottomRowStyle = {
      
      padding: "none",
      marginLeft: "1%",
  
     
      height: "12%",
      marginTop: "5%",
      marginBottom: "-1%",
      width: "80%"

    }
    const secondRowStyle = {
      marginTop: "5.5%",
      
      padding: "none",
      width: "100%",
      height: "8%",

    
      
    }
    const secondRowButton = {
      boxShawdow: "none",
      borderStyle: "none",
      margin: "0 2.4%",
      height: "100%",
      width: "14.5%",
      borderRadius: "20%",
      color: "rgba(0,0,0,0)",
      marginTop: "0",
      padding: "none"
      
    }
    const rowButton = {
      boxShawdow: "none",
      borderStyle: "none",
      margin: "0 2.4%",
      height: "100%",
      width: "14.5%",
      borderRadius: "20%",
      color: "rgba(0,0,0,0)",
     
    }
    const bottomRowButton = {
      boxShawdow: "none",
      borderStyle: "none",
      margin: " 0 3.2%",
      height: "100%",
      width: "18%",
      borderRadius: "20%",
      color: "rgba(0,0,0,0)",
     
    }
    const addButton = {
      boxShawdow: "none",
      borderStyle: "none",
      
      height: "7.5vw",
      width: "4vw",
      right: "39.8vw",
      borderRadius: "0.5vw",
      color: "rgba(0,0,0,0)",
      
      position: "absolute"
    }
  return (
    <div className="calculator center container" style={calculatorStyles}>
      <div className="container center" style={topDivStyle}>
        <h1 className="digital" id="display"  style={displayStyle}>{this.state.displayValue}</h1>
      </div>
      <div className="container center" style={keyPadStyle}>
        <div style={topRowStyle}>
          <button className="redbackground"style={topRowButton}>R.CM</button>
          <button className="redbackground"style={topRowButton}>M-</button>
          <button className="redbackground"style={topRowButton}>M+</button>
          <button onClick={this.handleCancel} className="redbackground"style={topRowButton} id="clear">CA</button>
          <button onClick={this.handlePowerOn}className="redbackground"style={CCEButton}>C.CE</button>
        </div>
        <div style={secondRowStyle}>
          <button className="redbackground"style={secondRowButton}>+TAX</button>
          <button className="redbackground"style={secondRowButton}>-TAX</button>
          <button className="redbackground"style={secondRowButton}>%</button>
          <button onClick={this.handleOperator} value="/" className="redbackground"style={secondRowButton} id="divide">/</button>
        </div>
        <div style={rowStyle}>
          <button onClick={this.handleNumber} value="7" className="redbackground"style={rowButton} id="seven" >7</button>
          <button onClick={this.handleNumber} value="8" className="redbackground"style={rowButton}id="eight" >8</button>
          <button onClick={this.handleNumber} value="9" className="redbackground"style={rowButton}id="nine" >9</button>
          <button onClick={this.handleOperator} value="*"className="redbackground"style={rowButton}id="multiply" >X</button>
        </div>
        <div style={rowStyle}>
          <button onClick={this.handleNumber} value="4" className="redbackground"style={rowButton}id="four" >4</button>
          <button onClick={this.handleNumber} value="5" className="redbackground"style={rowButton}id="five" >5</button>
          <button onClick={this.handleNumber} value="6" className="redbackground"style={rowButton}id="six" >6</button>
          <button onClick={this.handleOperator} value="-" className="redbackground"style={rowButton}id="subtract" >-</button>
        </div>
        <div style={bottomRowStyle}>
          <button onClick={this.handleNumber} value="1" className="redbackground"style={bottomRowButton}id="one" >1</button>
          <button onClick={this.handleNumber} value="2" className="redbackground"style={bottomRowButton}id="two">2</button>
          <button onClick={this.handleNumber} value="3" className="redbackground"style={bottomRowButton}id="three" >3</button>
          <button onClick={this.handleOperator} value="+" className="redbackground"style={addButton}id="add" >+</button>
        </div>
        <div style={bottomRowStyle}>
          <button onClick={this.handleNumber} value="0" className="redbackground" style={bottomRowButton}id="zero" >0</button>
          <button onClick={this.handleNumber} value="." className="redbackground" style={bottomRowButton}id="decimal">.</button>
          <button onClick={this.handleEquals} value="=" className="redbackground"style={bottomRowButton}id="equals">=</button>
        </div>
      </div>
    </div>
      
    
  );
}
}
export default App;
