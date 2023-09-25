import { useContext, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../context/User/userContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Photo = ({ userId, photo, handleDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { user } = useContext(UserContext);

  return (
    <div
      className='relative group overflow-hidden'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <LazyLoadImage
        key={photo?._id}
        src={
          photo?.secure_url
            ? photo.secure_url
            : "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
        }
        alt={photo?.label}
        placeholderSrc='Loading'
        className='object-cover h-auto w-full min-w-[200px] min-h-[200px] rounded-lg'
      />
      <div className='absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-30 transition-opacity'></div>
      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-500'></div>
      <div className='absolute inset-0 flex items-center justify-center text-white text-center'></div>
      <div
        className={`absolute top-0 right-0 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        } ease-in-out duration-300 group-hover:opacity-100 p-2`}>
        {user && user._id === userId ? (
          <button
            onClick={() => handleDelete(photo?._id)}
            className='border px-3 flex-shrink-0 outline-none border-[#EB5757] text-xs py-1 rounded-3xl text-[#EB5757]'>
            delete
          </button>
        ) : (
          ""
        )}
      </div>
      <div
        className={`absolute right-0 bottom-0 left-0 ${
          isHovered ? "opacity-100 translate-y-0" : "translate-y-2 opacity-0"
        } ease-out duration-300 group-hover:opacity-100 text-white p-2`}>
        <p className='text-start pb-2 px-2'>{photo?.label}</p>
      </div>
    </div>
  );
};

Photo.propTypes = {
  photo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    secure_url: PropTypes.string,
    label: PropTypes.string,
  }),
  handleDelete: PropTypes.func,
  userId: PropTypes.string.isRequired,
  // key: PropTypes.number.isRequired,
};

export default Photo;
