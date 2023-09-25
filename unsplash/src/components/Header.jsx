import { useContext, useState } from "react";
import Logo from "../assets/icons/my_unsplash_logo.svg";
import Search from "../assets/icons/search.svg";
import ImageContext from "../context/ImageContext";
import { Link } from "react-router-dom";
import UserContext from "../context/User/userContext";
function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { addImage, loading, setImages, imageData } = useContext(ImageContext);
  const { user } = useContext(UserContext);

  const [label, setLabel] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSearch = (term) => {
    const filteredPhotos = imageData?.map((urls) => {
      return {
        ...urls,
        imageUrl: urls.imageUrl.filter((photo) =>
          photo.label.toLowerCase().includes(term.toLowerCase())
        ),
      };
    });

    setImages(
      term === undefined || term === null || term === ""
        ? imageData
        : filteredPhotos
    );
  };

  const imageHandler = async () => {
    await addImage(label, imageUrl);
    closePopup();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative flex py-5 flex-wrap sm:flex-nowrap justify-between items-center'>
      <div className='logo-search space-x-5 flex z-50'>
        <div className='relative inline-block flex-shrink-0 text-left z-50'>
          <img
            onClick={toggleDropdown}
            className='cursor-pointer'
            src={Logo}
            alt='logo'
          />
          {user && isOpen && (
            <div
              className={`left-1 top-9 absolute right-0  mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
              role='menu'>
              <div className='py-1' role='none'>
                <p className='block px-4 py-2 text-sm text-gray-700'>
                  {user.name}
                </p>
                <p className='block px-4 py-2 text-sm text-gray-700'>
                  {user.email}
                </p>
                <p className='block px-4 py-2 text-sm text-gray-700'>{`Uploaded Photos: ${20}`}</p>
              </div>
            </div>
          )}
        </div>

        <div className='search border sm:flex items-center px-3 rounded-xl hidden'>
          <img src={Search} alt='search' className='w-6 h-6 shrink-0' />
          <input
            type='text'
            className='px-2 py-2 focus:outline-none placeholder:text-[#BDBDBD] bg-transparent text-[#BDBDBD]'
            placeholder='Search by label'
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className='add-photo z-0 space-x-3 ml-2 flex flex-shrink-0'>
        {user ? (
          <>
            <button
              onClick={openPopup}
              className='outline-none flex-shrink-0 hidden sm:block px-4 py-2 rounded-lg bg-green-600 text-[#FFF] font-noto '>
              Add a photo
            </button>
            <button
              onClick={openPopup}
              className='outline-none sm:hidden block px-4 font-bold text-lg py-1 rounded-lg bg-green-600 text-[#FFF] font-noto '>
              +
            </button>
            <button
              onClick={logout}
              className='outline-none px-4 py-2 rounded-lg  text-[#000] font-noto border-b shadow-xl hover:shadow-md hover:bg-[#f3f3f3]  hover:scale-110 transition duration-200'>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className='outline-none rounded-lg bg-green-600 px-4 py-2 text-[#FFF] font-noto '>
              Login
            </Link>
            <Link
              to={"/register"}
              className='outline-none px-4 rounded-lg bg-green-600 py-2 text-[#FFF] font-noto '>
              Register
            </Link>
          </>
        )}
      </div>

      <div className='search border sm:hidden items-center px-3 rounded-xl flex w-[100vw] mt-3'>
        <img src={Search} alt='search' className='w-6 h-6 shrink-0' />
        <input
          type='text'
          className='px-2 py-2 focus:outline-none placeholder:text-[#BDBDBD] bg-transparent text-[#BDBDBD]'
          placeholder='Search by label'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {isPopupOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-10'>
          <div className='bg-black bg-opacity-50 transition-opacity absolute inset-0'></div>
          <div className='bg-white p-6 rounded-md shadow-lg transform transition-transform sm:w-[35rem]'>
            {/* Your photo upload form or content */}
            <p className='mb-4 text-black font-noto text-2xl'>
              Add a new photo
            </p>
            <div className='label flex flex-col space-y-2 mt-5'>
              <label htmlFor='label'>Label</label>
              <input
                type='text'
                className='mb-4 border-2 focus:border-gray-500 focus:outline-none rounded-xl px-3 py-2 w-full'
                onChange={(e) => {
                  setLabel(e.target.value);
                }}
                placeholder='Enter label for image'
              />
            </div>
            <div className='photo flex flex-col space-y-2 mt-5'>
              <label htmlFor='photo'>Photo URL</label>
              <input
                type='text'
                className='mb-4 border-2 focus:border-gray-500 focus:outline-none rounded-xl px-3 py-2 w-full'
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                placeholder='Enter label for image'
              />
            </div>

            <div className='btns space-x-4 text-right mt-5'>
              <button
                onClick={closePopup}
                className='px-4 py-2 text-gray-500  rounded-md'>
                Cancel
              </button>
              <button
                onClick={imageHandler}
                disabled={loading}
                className={`px-4 py-2 ${
                  loading && "cursor-progress"
                } text-white bg-[#3DB46D] rounded-md`}>
                {loading ? "loading..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
