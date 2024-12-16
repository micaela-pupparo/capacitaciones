const SearchBox = ({ value, onChange, children }) => {
  return (
    <div>
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      {children}
    </div>
  );
};

export default SearchBox;
