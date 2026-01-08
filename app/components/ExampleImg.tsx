'use client';

import Image from 'next/image';

const MyImage: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <Image 
        src="https://res.cloudinary.com/desem7vhd/image/upload/v1742332798/DALL_E_2025-03-18_23.18.59_-_A_stylish_digital_image_with_the_word_Example_in_bold_modern_typography_on_a_sleek_background._The_text_is_centered_with_a_slight_3D_effect_and_hh9pkd.webp" 
        alt="My Image"
        width={500}  
        height={300}  
        className="rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl"  
        priority
      />
    </div>
  );
};

export default MyImage;
