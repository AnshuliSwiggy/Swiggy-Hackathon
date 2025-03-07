import React, { useState, useEffect } from 'react'
import './Home.css'
import Polaroid from '../components/poloroid'
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [imageUrl, setImageUrl] = useState(null)
  const [hide, setHide] = useState(false);
  const [hideAll, setHideAll] = useState(false);
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   // Load the latest image path from localStorage on component mount
  //   const savedImage = localStorage.getItem('savedImage')
  //   if (savedImage) {
  //     setImageUrl(savedImage)
  //     console.log("IMAGE URL : " + imageUrl) // Restore the saved image URL
  //   }
  // }, [])

  const handleFileInput = (event) => {
    console.log("FUNC CALLED HANDLE FILE INPUT");
    const file = event.target.files[0]
    if (file) {
      const objectURL = URL.createObjectURL(file) // Generate temporary file URL

      // Store only the file URL (not Base64) to prevent quota issues
      setImageUrl(objectURL)
      localStorage.setItem('savedImage', objectURL) 
    }
  }

  const switchToLoader = () => {
    setHide(true);
    setLoading(true);
    setTimeout(() => {
      showReel();
    }, 5000); // Redirect after 5 seconds
  };

  const showReel = () =>{
    setHideAll(true);
  }

  return (
    <div className="home-container">
      {
        hideAll ?
        <> 
          <div className="d-flex justify-content-center align-items-center vh-100">
          <img 
            src="/20250306_1721_Vegetarian Pizza Feast_simple_compose_01jnnmrbw4f0qb29n9x2mptxah.gif" 
            alt="Reel" 
            className="img-fluid"
          />
        </div>
        </> : 
        <>
          <div className="polaroid-gallery">
        <Polaroid imageUrl={imageUrl} />
          </div>

          <div className="upload-section">
            
            
            { !hide ?
              <>
                <button
                onClick={() => document.getElementById('fileInput').click()}
                className="upload-button"
              >
                Select Image
              </button>
              </> : <></>
            }
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <button onClick={switchToLoader} className="btn btn-primary">
                Create Reel
              </button>
            )}

            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
          </div>
        </>
      }
      
    </div>
  )
}

export default Home
