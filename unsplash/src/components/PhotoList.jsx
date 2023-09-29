import { lazy, useContext, useState } from "react";
const Photo = lazy(() => import("./Photo"));
import PropTypes from "prop-types";
import Zoom from "react-reveal/Zoom";
import ImageContext from "../context/ImageContext";
const PhotoList = ({ photos }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [password, setPassword] = useState("");
  const { deleteImage, loading } = useContext(ImageContext);
  const [id, setId] = useState(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDelete = (id) => {
    openPopup();
    setId(id);
  };

  const handleDeleteButton = async () => {
    await deleteImage(id, password);
    closePopup();
  };

  return (
    <div className='w-full relative overflow-hidden mt-3'>
      <div className='columns-1 min-[400px]:columns-2 sm:columns-3 md:columns-4 relative w-full space-y-3'>
        {photos?.flatMap((photoGroup) =>
          photoGroup?.imageUrl?.map((image) => (
            <Zoom key={image._id}>
              <Photo
                userId={photoGroup.userId}
                photo={image}
                handleDelete={handleDelete}
              />
            </Zoom>
          ))
        )}
      </div>

      {isPopupOpen && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 transition-opacity'>
          <div className='bg-white p-6 rounded-md shadow-lg transform transition-transform sm:w-[35rem]'>
            {/* Your photo upload form or content */}
            <p className='mb-4 text-black font-noto text-2xl'>Are you sure?</p>
            <div className='password flex flex-col space-y-2 mt-5'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className='mb-4 border-2 focus:border-gray-500 focus:outline-none rounded-xl px-3 py-2 w-full'
                placeholder='Enter password...'
              />
            </div>

            <div className='btns space-x-4 text-right mt-5'>
              <button
                onClick={closePopup}
                className='px-4 py-2 text-gray-500  rounded-md'>
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteButton();
                }}
                className={`px-4 py-2 ${
                  loading && "cursor-progress"
                } text-white bg-[#EB5757] rounded-md`}>
                {loading ? "Processing..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PhotoList.propTypes = {
  photos: PropTypes.array,
};

export default PhotoList;
