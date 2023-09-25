import React from "react";
import ImageContext from "./ImageContext";
import PropTypes from "prop-types";

function ImageState({ children }) {
  const [images, setImages] = React.useState([]);
  const [imageData, setImageData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // backend url :
  const url = "http://localhost:5000/";

  // Function to fetch images from the API
  const fetchImages = async () => {
    try {
      const response = await fetch(url + "photos");
      const data = await response.json();
      // setImages(data.photos);
      setImageData(data.photos);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Function to add an image using the API
  const addImage = async (label, imageUrl) => {
    try {
      const imageData = {
        imageUrl,
        label,
      };

      setLoading(true);

      const token = localStorage.getItem("token");
      // Make API request to add image
      await fetch(url + "photos/add", {
        method: "POST",
        body: JSON.stringify(imageData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // const newImage = await response.json();
      // setImages(newImage.photos.imageUrl); // Add the new image to the state
      fetchImages();
    } catch (error) {
      console.error("Error adding image:", error);
    }
    setLoading(false);
  };

  // Function to delete an image by id and password
  const deleteImage = async (imageId, password) => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      // Make API request to delete image
      await fetch(`${url}photos/delete/${imageId}`, {
        method: "DELETE",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted image from the state
      // setImages(images.filter((image) => image.id !== imageId));
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
    setLoading(false);
  };

  // Provide the context with the image-related functions and data
  const imageContextValue = {
    fetchImages,
    images,
    addImage,
    deleteImage,
    loading,
    setLoading,
    setImages,
    imageData,
  };

  return (
    <ImageContext.Provider value={imageContextValue}>
      {children}
    </ImageContext.Provider>
  );
}

ImageState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageState;