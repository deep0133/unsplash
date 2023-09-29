import React, { Suspense, useContext, useEffect } from "react";
const PhotoList = React.lazy(() => import("./components/PhotoList"));
import Header from "./components/Header";
import ImageContext from "./context/ImageContext";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserContext from "./context/User/userContext";
import SpinnerIcon from "./assets/icons/spinner.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { images, fetchImages, setImages, imageData } =
    useContext(ImageContext);
  const { profile } = useContext(UserContext);

  useEffect(() => {
    fetchImages();
    profile();
  }, []);

  useEffect(() => {
    if (imageData) setImages(imageData);
  }, [imageData, setImages]);

  return (
    <div className='sm:container sm:mx-auto px-[5%] sm:px-2 xl:px-[5%]'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <ToastContainer />
              <Suspense
                fallback={
                  <div className='flex justify-center items-center w-full h-[100lvh]'>
                    <img src={SpinnerIcon} className='animate-spin w-10' />
                  </div>
                }>
                <PhotoList photos={images} />
              </Suspense>
            </>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
