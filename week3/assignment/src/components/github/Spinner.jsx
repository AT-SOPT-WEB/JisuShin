import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center mt-6">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-transparent" />
    </div>
  );
}

export default Spinner;