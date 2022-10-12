import Wrapper from '@components/bricks/Wrapper';
import Image from 'next/image';
import React from 'react'

type Props = {
  heading: string;
  perex: string;
  imageBigSrc: string;
  imageBigAlt: string;
  imageSmallLeftSrc: string;
  imageSmallLeftAlt: string;
  imageSmallRightSrc: string;
  imageSmallRightAlt: string;
  imagePosition: "left" | "right";
  points: {
    heading: string,
    text: string,
    icon: any
  }[];
};

export default function TextPointAndImage({ 
  heading, 
  perex, 
  points,
  imageBigSrc,
  imageBigAlt,
  imageSmallLeftSrc,
  imageSmallLeftAlt,
  imageSmallRightSrc,
  imageSmallRightAlt,
  imagePosition
}: Props) {
  return(
    <Wrapper
      size='base'
      className={`flex flex-col-reverse gap-10 h-full
        ${imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      <div className='flex flex-col md:w-1/2 gap-5'>
        <div className="relative overflow-hidden rounded-xl aspect-[5/3]">
          <Image
            src={imageBigSrc}
            alt={imageBigAlt}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <div className="relative overflow-hidden rounded-xl aspect-[7/5]">
            <Image
              src={imageSmallLeftSrc}
              alt={imageSmallLeftAlt}
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className="relative overflow-hidden rounded-xl aspect-[7/5]">
            <Image
              src={imageSmallRightSrc}
              alt={imageSmallRightAlt}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-12 md:mt-0 md:w-1/2">
        <h3 className="text-3xl text-gray-900 font-bold">{heading}</h3>
        <p className="mt-5 leading-6">{perex}</p>
        <div className='mt-5'>
          {points.map((item, key) => (
            <div 
              className="py-3 md:px-5 flex flex-row" 
              key={key}
            >
              <div className="flex justify-center items-center w-10 min-w-[40px] h-10 min-h-[40px] mt-2 mr-5 bg-primary rounded-full text-white text-3xl">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900">{item.heading}</h3>
                <p className="text-gray-700 mt-1 leading-5">{item.text}</p>
              </div>
            </div>
        ))}
        
        </div>
      </div>
    </Wrapper>
  )
}