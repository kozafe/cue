import React from "react";
import SearchInput from "./components/search";

const IndexScreen = () => {
  return (
    <div className="flex flex-row h-[100vh] justify-center items-center">
      <SearchInput placeholder="Search or create your cue" />
      <div className="fixed bottom-2 text-accentColors-lightTeal text-xs">
        Created by: Koza Brajamagenta
      </div>
    </div>
  );
};

export default IndexScreen;
