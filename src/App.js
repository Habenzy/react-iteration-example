import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)

    //Set initial values for name and comment to be used in our form's inputs
    this.state = {
      nameVal: '',
      commentVal: ''
    }
  }

  //When you submit the form
  submitHandler = (evt) => {
    //always prevent defaults
    evt.preventDefault()

    //Create a comment object, using values in state, and put it in an array
    let comment = [{ //putting your comment object in an array allows us to keep our data types consistent
      name: this.state.nameVal,
      content: this.state.commentVal
    }]

    this.setState((prevState) => {//prevState is the full state object before this setState is run
      if(prevState.comments) { //concat joins 2 arrays together, and returns a NEW array
        return {comments: prevState.comments.concat(comment)}//This is very important since React wil not read an updated array as having been changed so no update will be triggered
      } else {//If it's the first comment, create the 'comments' property in state
        return {comments: comment}
      }
    })
  }

  nameChange = (evt) => {
    evt.preventDefault()

    this.setState({//keep track of our name value on the form
      nameVal: evt.target.value
    })
  }

  commentChange = (evt) => {
    evt.preventDefault()

    this.setState({//keep track of our comment value on the form
      commentVal: evt.target.value
    })
  }

  render() {
    //If we have comments use them to generate an array of components with .map using props to determine data
    let commentList = this.state.comments ? this.state.comments.map((comment) => <Comment name={comment.name} content={comment.content} />) : <li>No Comments Yet</li>//If there are no comments return this list item

    return(
      <div>
        <h3>Comments</h3>
        <ul>
          {commentList}{/*This is the array we generated above*/}
        </ul>
        <form onSubmit={this.submitHandler}>
          <label>Name: <input type='text' onChange={this.nameChange} value={this.state.nameVal}/></label>
          <label>Comment: <input type='text' onChange={this.commentChange} value={this.state.commentVal}/></label>
          <input type='submit' />
        </form>
      </div>
    )
  }
  
}


function Comment(props) {
  return(//Our comment components makes ues of the props "name" and "content" which are passed down by its parent
    <li>Name: {props.name} Comment: {props.content}</li>
  )
}

export default App;
