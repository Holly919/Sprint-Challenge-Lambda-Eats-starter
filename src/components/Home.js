import React from "react";
import { Link } from "react-router-dom";


export default function Home() {



    return (
      <div className="home-wrapper">
        
        <Link to="/pizza">
          <button className="build-button">Build Your Pizza!</button>
        </Link>
      </div>
    );
}