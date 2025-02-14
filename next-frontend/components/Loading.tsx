import React from 'react';
import { useLoading } from '../context/loading-context';

const Loading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Rotating Cube Loader */}
        <div className="relative w-16 h-16">
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face left"></div>
            <div className="face right"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
