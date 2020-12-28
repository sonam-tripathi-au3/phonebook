import React, {useState, useEffect} from 'react';
// import moment from 'moment';
// import {Link} from 'react-router-dom';
import './Table.css';
import Search from '../Search'

function Table() {
    const [allNumbers, setallNumbers] = useState([])
    const [searchVal, setSearchVal] = useState("")
    const [viewType, setViewType] = useState("allNumbers")
    const [pageNo, setPageNo] = useState(1)

    useEffect(() => {
        fetch(`http://localhost:8080/all`)
          .then(res => {
          return res.json()
          })
          .then(res => {
              setallNumbers([...res])
            console.log(res)
          })
          .catch(err => {
              console.log(err)
          })
    }, [])


  const inputChange = (e) => {
    let val = e.target.value
    setSearchVal(val)
  }
  

  const formSubmit = (e) => {
    e.preventDefault()
    setViewType("search")
  }


  const prev = () => {
    if(pageNo === 1){
      document.getElementById('prev').disabled = true
      return;
    }
    else{
      setallNumbers([])
      setPageNo(pageNo - 1)

      fetch(`http://localhost:8080/page/${pageNo}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        setallNumbers([...res])
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  const next = () => {
    setallNumbers([])
    setPageNo(pageNo + 1)
    fetch(`http://localhost:8080/page/${pageNo}`)
    .then(res => {
      return res.json()
    })
    .then(res => {
      setallNumbers([...res])
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  let Numbers = []

  switch(viewType){
    case "allNumbers":
      Numbers = allNumbers
      break;
    
    case "search":
       Numbers = allNumbers.filter(item => item.name.toLowerCase() === searchVal.toLowerCase()||item.location.toLowerCase() === searchVal.toLowerCase()||item.number=== searchVal)
       if(Numbers.length < 1){
         alert('Please enter valid details')
         window.location.reload()
       }
       break;

    default:
       break;
  }

  return (
    <div className="container">
      {Numbers.length > 0 ?
      <div>
        <Search onFormSubmit={formSubmit} onInputChange={inputChange}/>

       <table className="table table-hover ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Number</th>
          </tr>
        </thead>
        
         {Numbers.map((item, index) => 
   
          <tbody key={index}> 
          
          <tr id={item.name}>
            <td>{item.name}</td>
            <td>{item.location}</td>
            <td>{item.contact}</td>
            {/* <td>{moment.unix(item.published_date).format("DD-MM-YYYY")}</td> */}
            {/* <td>{item.views}</td>
            <td><Link to={`member/${item.main_speaker}`}>More Details..</Link></td> */}
          </tr> 
          </tbody>

        
          )}
      </table>
      {viewType !== "search" &&
      <div className="btn-group">
        {pageNo === 1 ? 
        
        <button id="prev" onClick={prev} className="btn btn-outline-info disabled">
          Previous
        </button> 
        
        : 
    
        <button id="prev" onClick={prev} className="btn btn-outline-info">
          Previous
        </button>}
       
        <button id="next" onClick={next} className="btn btn-outline-info">
          Next
        </button>
      </div>
      }
      </div>
      : <p className="m-5">Data loading..</p>}
    </div>
  );
}

export default Table;