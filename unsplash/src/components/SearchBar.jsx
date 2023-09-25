import PropTypes from "prop-types";
const SearchBar = ({ handleSearch }) => {
  return (
    <div>
      <input
        type='text'
        placeholder='Search by label'
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
};

export default SearchBar;
