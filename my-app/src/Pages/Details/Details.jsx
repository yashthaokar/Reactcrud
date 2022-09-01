import React, { useEffect, useState } from 'react'
import { NavLink, useParams,} from 'react-router-dom';
import {CardContent, Card} from "@mui/material"


const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

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
            setUserdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`https://crudappreactjs.herokuapp.com/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        
    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>{`Welcome, ${getuserdata.name}`}</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}>  <button className="btn btn-primary mx-2">Edit</button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}>Delet</button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src="/profile.png" style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span >{getuserdata.name}</span></h3>
                            <h3 className="mt-3">Age: <span >{getuserdata.age}</span></h3>
                            <p className="mt-3">Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3">Occuption: <span>{getuserdata.work}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">

                             {/* <p className="mt-5"><PhoneAndroidIcon />mobile: <span>+91 {getuserdata.mobile}</span></p>
                           <p className="mt-3"><LocationOnIcon />location: <span>{getuserdata.add}</span></p> */}
                            <p className="mt-3">Description: <span>{getuserdata.desc}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details