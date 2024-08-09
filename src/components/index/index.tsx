import React from "react";
import SearchInput from "./components/search";

const IndexScreen = () => {
  return (
    <div className="flex flex-row h-[100vh] justify-center items-center overflow-hidden">
      <SearchInput placeholder="Search or create your cue" />
    </div>
  );
};

export default IndexScreen;
