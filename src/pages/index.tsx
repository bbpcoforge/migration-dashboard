import React from 'react';
import Sidebar from '../components/Sidebar';
import WordpressApiPreview from '@components/WordpressApiPreview';

const Home = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <WordpressApiPreview />
        </div>
      </div>
    </div>
  );
};

export default Home;