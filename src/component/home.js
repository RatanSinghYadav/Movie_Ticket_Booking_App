import React, { useEffect } from 'react';
import './style/home.css';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from 'react-router-dom';
import Img from './style/banner.jpg'

function Home() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [sho, setShow] = useState(false);

  const { id } = useParams('');
  console.log(id);

  const { isAuthenticated } = useAuth0();
  // console.log(data)

  const stockData = async () => {
    const getData = await fetch('https://api.tvmaze.com/search/shows?q=all')
    const newData = await getData.json();
    setData(newData);
    // console.log(newData);

  }
  // 
  const showDetail = async () => {
    const getData1 = await fetch('https://api.tvmaze.com/search/shows?q=all')
    const newData1 = await getData1.json();
    setSummary(newData1);
    console.log(newData1);

  }


  useEffect(() => {
    stockData();
    showDetail();
  }, [])

  return (
    <div className='container'>
      {isAuthenticated ?
        <>
          <h1 class="hero_heading">
            Welcome to the Movies World!
          </h1>

          <div className="container mt-5 mb-5 new-arrivals">
            <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>Recommended Movies</h4>
            <div className="row" style={{ textAlign: 'center' }}>
              {
                data.map((e, id) => {
                  return (
                    <>
                      <div key={id} className="col-lg-3  col-12 col-md-6 mt-4">
                        <div className="card">
                          <div className="card-img">
                            <img src={e.show["image"]["medium"]} className="img-fluid new-arrivals-img" alt="" />
                            <div className="overlay">
                              <div>
                                <img src={e.show["image"]["original"]} className="img-fluid" alt="" />
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{e.show['name']}</h5>
                            <h5 className="card-title">{e.show['language']}</h5>
                            <p className="card-texte">Rating: {e.show['rating']['average']}/10</p>
                            <button onClick={() => { setShow(!sho); showDetail() }} className="product-btn"><i className="cart fa fa-shopping-cart"></i>More Details</button>
                            {/* <Link to={`summary/${e.show['name']}/${e.show['id']}`}>
                            </Link> */}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
          </div>

          {/*  */}

          {sho ?
            <>
              <div className='modelBackgraund'></div>
              <div className="container modelContainer mt-5">
                <div className="card">
                  <div className="row " style={{ height: "25rem" }}>
                    <div className="col">
                      <img src={summary[0]["show"]["image"]["original"]} className="img-fluid rounded-start" style={{ height: "25rem", width: "23rem" }} alt={""} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body" style={{ height: "25rem", borderRadius: "8px" }}>
                        <h5 className="card-title">All American</h5>
                        <p className="card-text">When a rising high school football player from South Central L.A. is recruited to play for Beverly Hills High, the wins, losses and struggles of two families from vastly different worlds — Compton and Beverly Hills — begin to collide. Inspired by the life of pro football player Spencer Paysinger.</p>
                        <p className="card-text"><small className="text-muted">Language: English</small></p>
                        <p className="card-text"><small className="text-muted">Gener: Drama</small></p>
                        <p className="card-text"><small className="text-muted">Rating: 6.6/10</small></p>
                        <p className="card-text"><small className="text-muted">Premiered: 20-08-2022</small></p>
                        <p className="card-text"><small className="text-muted">Status: Running</small></p>
                        <Link to={'booking'}>
                          <button className="product-btn">Book Ticket</button>
                        </Link>
                        &emsp;
                        <button onClick={() => { setShow(!sho) }} className="product-btn">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
            : ""
          }


        </>
        :
        <>
          <h1 class="hero_heading1">
            If New User Signup First!
            <br />
            If Existing User Login First!
          </h1>
          <img src={Img} className='banner' alt='banner'/>
        </>
      }
    </div>
  )
}
export default Home;
