import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  const [userdata, setUserData] = useState([])
  console.log(userdata)

  const getdata = async () => {
    const res = await fetch('http://localhost:4000/getdata', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    //console.log(data);
    if (res.status === 422 || !data) {
      console.log("error")
    }
    else {
      setUserData(data)
      console.log("get data")
    }
  }
  useEffect(() => {
    getdata()
  }, [])

const deleteUser=async(id)=>{
  const res2 = await fetch(`http://localhost:4000/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const deletedata=await res2.json()
    console.log(deletedata)
    if(res2.status===422 || !deletedata){
      alert("error");
    }else{
      alert("User deleted Success")
    }
  }

  return (
    <>

      <div className='mt-5'>
        <div className="container">
          <div className="add_btn mt-2 mb-2"><Link to='/register'>
            <button className='btn btn-primary'>Add data</button></Link>
          </div>
          <table class="table">
            <thead>
              <tr className='table-success'>
                <th scope="col" colspan='1'>id</th>
                <th scope="col" colspan='1'>User Name</th>
                <th scope="col" colspan='1'>Email Id</th>
                <th scope="col" colspan='1'>Age</th>
                <th scope="col" colspan='1'>Contact No</th>
                <th scope="col" colspan='1'>Address</th>

                <th scope="col" colspan='1'>Work</th>
                <th scope="col" colspan='2'>describtion</th>
                <th scope="col" colspan='3'>Options</th>
              </tr>
            </thead>
            <tbody>

              {
                userdata.map((ele, id) => {
                  return (
                    <tr>
                      <td colspan="1">{id + 1}</td>
                      <th colSpan="1">{ele.name}</th>
                      <td colspan="1">{ele.email}</td>
                      <td colspan="1">{ele.age}</td>
                      <td colspan="1">{ele.mobile}</td>
                      <td colspan="1">{ele.add}</td>
                      <td colspan="1">{ele.work}</td>
                      <td colspan="2">{ele.desc}</td>
                      <td><Link to={`view/${ele._id}`}><button className='btn btn-warning'>View</button></Link></td>

                      <td><Link to={`edit/${ele._id}`}><button className='btn btn-info'>edit</button></Link></td>

                      <td><button className='btn btn-danger' onClick={()=>deleteUser(ele._id)}>delet</button></td>
                    </tr>

                  )
                })
              }


            </tbody>
          </table>
        </div>

      </div>
    </>

  )
}

export default Home