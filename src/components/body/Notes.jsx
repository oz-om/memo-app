import Note from './note/Note';
import Masonry from "react-responsive-masonry"

import {Component} from 'react'
import {getUser} from '../../api/api'

export default class Notes extends Component {
  constructor(props){
    super(props)
    this.state = {
      notes: []
    }
  }
  
  componentDidMount () {
    getUser().then(data => {
      this.setState({
        notes:data
      })
    })
  }
  
  render() {
    let notes 
    if (this.state.notes.length > 0) {
      notes = this.state.notes.map(n => { return <Note key={n.id} title={n.title} note={n.note}/>});
    } else {
      notes = <p>loading</p>
    }
    
    return (
      <div className="notes px-4 border-red-900 overflow-hidden overflow-y-scroll">
      <Masonry columnsCount={2} gutter={"16px"}>
        {notes}
      </Masonry>
    </div>
    )
  }
}




// https://dummyjson.com/quotes

// import {React, useEffect, useState} from 'react'


// export default function Notes(){
//   let [notes, setNotes] = useState([]);
//   useEffect(()=> {
//     fetch('http://localhost:4000/users/?userId=1')
//     .then(res=>res.json())
//     .then(data=> {

//       setNotes(data[0].notes)})
//   }, []);
  
//   let getNotes = notes.map(note=>{
//     return (<Note key={note.id} title={note.title} note={note.note}/>)
//   })
//   return (
//     <div className="notes px-4 border-red-900 overflow-hidden overflow-y-scroll">
//       <Masonry columnsCount={2} gutter={"16px"}>
//         {getNotes}
//       </Masonry>
//     </div>
//   )
// }
