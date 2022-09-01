import React, { useState,useEffect } from 'react';
import { Link, useParams} from 'react-router-dom';

const Edit = () => {
  const [getuserdata, setUserData] = useState([])
  console.log(getuserdata)

    const [input, setInput] = useState({
        name: '',
        email: '',
        age: '',
        mobile: '',
        work: '',
        add: '',
        desc: ''
    })

    const ChangeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    
    
    const { id } = useParams("");
    console.log(id);

    
    const getdata = async () => {

      const res = await fetch(`http://localhost:4000/getuser/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });


      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
          console.log("error ");

      } else {
        setInput(data)
          console.log("get data");

      }
  }

  useEffect(() => {
      getdata();
  }, []);





    const updatedUser = async(e) => {
        console.log(input)
        const { name, email, work, add, mobile, desc, age } = input;
        const res = await fetch(`http://localhost:4000/updateuser/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, work, add, mobile, desc, age })
        })
        const data =  res.json()
        console.log(data);
        if (res.status === 404 || !data) {
            alert("error");
            console.log("error")
        }
        else {
            
         alert("data added")
        }

    }





    return (
        <div className="container">

            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" value={input.name} onChange={ChangeHandler} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">email</label>
                        <input type="email" value={input.email} onChange={ChangeHandler} name="email" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">age</label>
                        <input type="text" value={input.age} onChange={ChangeHandler} name="age" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                        <input type="number" value={input.mobile} onChange={ChangeHandler} name="mobile" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Work</label>
                        <input type="text" value={input.work} onChange={ChangeHandler} name="work" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" value={input.add} onChange={ChangeHandler} name="add" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name="desc" value={input.desc} onChange={ChangeHandler} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={updatedUser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Edit