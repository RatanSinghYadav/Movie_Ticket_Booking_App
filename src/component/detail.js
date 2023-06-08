import React, { useEffect, useState } from 'react';
import './style/detail.css'
import { useParams } from 'react-router-dom';
import Img from './style/img.jpg'

function Detail() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [addData, setAddData] = useState({
        'email': '',
        'number': ''
    });


    const { id } = useParams('');

    const stockData = async () => {
        const getData = await fetch(`https://api.tvmaze.com/search/shows?q=all/show/${id}`)
        const newData = await getData.json();
        setData(newData);
        console.log(newData);

    }

    const userData = (e) => {
        const { name, value } = e.target;
        setAddData((ndata) => {
            return {
                ...ndata, [name]: value
            }
        })
    }

    const bookTicket = (e) => {
        e.preventDefault();
        const { email, number } = addData;
        console.log(email, number)
        localStorage.setItem("Email", email);
        localStorage.setItem("Number", number);
        setAddData({ ...addData, email: "", number: "" });
        setShow(true)
    }


    useEffect(() => {
        stockData();
    }, [])


    return (
        <div className="container mt-5">
            <div className="card">
                <div className="row " style={{ height: "20rem" }}>
                    <div className="col">
                        <img src={Img} className="img-fluid rounded-start" style={{ height: "20rem", width: "23rem" }} alt={""} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body" style={{ height: "20rem", borderRadius: "8px" }}>
                            <h5 className="card-title">All American</h5>
                            <p className="card-text">When a rising high school football player from South Central L.A. is recruited to play for Beverly Hills High, the wins, losses and struggles of two families from vastly different worlds — Compton and Beverly Hills — begin to collide. Inspired by the life of pro football player Spencer Paysinger.</p>
                            <p className="card-text"><small className="text-muted">Language: English</small></p>
                            <p className="card-text"><small className="text-muted">Gener: Drama</small></p>
                            <p className="card-text"><small className="text-muted">Rating: 6.6/10</small></p>
                            <p className="card-text"><small className="text-muted">Premiered: 20-08-2022</small></p>
                            <p className="card-text"><small className="text-muted">Status: Running</small></p>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <br />
            <div className="row">
                <div className="col-3">
                    <input type="text" value={addData.email} name='email' onChange={userData} className="form-control" placeholder="Email" />
                </div>
                <div className="col-3">
                    <input type="number" value={addData.number} name='number' onChange={userData} className="form-control" placeholder="Phone Numbe" />
                </div>
                <div className='col-3'>
                    <button onClick={bookTicket} className="product-btn">Book Now</button>
                </div>
            </div>
            <br />
            {show ?
                <>
                    <h5 style={{ color: 'green', backgroundColor: 'lightblue',textAlign:'center' }}>
                        Your Ticket is Confirm!
                    </h5>
                </>
                :
                ""
            }
        </div>
    )
}

export default Detail;