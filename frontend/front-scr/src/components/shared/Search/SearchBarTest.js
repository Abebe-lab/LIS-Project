import React, { useState } from "react";
//import config from '../../../config';

const SearchBarTest = ({onChange,searchTerm}) => {
  //const [searchTerm, setSearchTerm] = useState("");

//  const onChange = (e) => {
//    setSearchTerm(e.target.value);
 // };

  return (
    <input
      type="text"
      placeholder="E.g. AABL001001"
      value={searchTerm}
      onChange={onChange}
    />
  );
};

export default SearchBarTest;
