import React, { useState } from 'react';
import { Loader, ArrowRight, Copy, Check, AlertCircle, X } from 'lucide-react';

const LoadingSpiner = () => {
 

  return (
    <div className="bg-white shadow rounded-lg p-6">
    <Loader size={40} className="text-blue-500 animate-spin mb-4" />
       </div>
  );
};

export default LoadingSpiner;