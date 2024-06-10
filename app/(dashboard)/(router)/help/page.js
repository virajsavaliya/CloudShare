import React from 'react'
import HelpPage from "./_components/HelpPage";

function help() {

    const HelpTitle = () => {
        return (
          <div className="text-center mb-8 mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">FAQ</h1>
            <hr className="border-b-2 border-gray-300 w-16 mx-auto" />
          </div>
        );
      };

  return (
    <div>
        <HelpTitle/>
        <HelpPage/>
    </div>
  )
}

export default help