'use client';

import Image from 'next/image';

const MyImage: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
     <Image 
  src="https://res.cloudinary.com/desem7vhd/image/upload/v1759926339/greeksters/Evmaria-removebg-preview_nd9ivk.png" 
  alt="My Image"
  width={500}  
  height={300}  
  /* Removed 'rounded-lg' and 'shadow-md' */
  className="w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl"  
  priority
/>
    </div>
  );
};

export default MyImage;
