import Heading from '@components/bricks/Heading'
import Template from '@components/bricks/ScrollReveal'
import Wrapper from '@components/bricks/Wrapper'
import { globalConfig } from '@configs/globalConfig'
import React from 'react'
import { HiCreditCard, HiMail, HiPhone, HiTruck } from 'react-icons/hi'
import { GiPalmTree } from "react-icons/gi";

export default function Hero() {
  return (
    <>
    <div className='relative pt-36 pb-[600px] lg:pb-56 bg-pink-100'>
      <Wrapper size="base">
        <Heading level={1} size="xl">
          Kontaktujte nás
        </Heading> 
        <p className='max-w-prose mt-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi impedit beatae esse minus ut corrupti assumenda aliquam consequatur ullam enim!</p>
      </Wrapper>
    </div>
      <div className='relative my-10 bg-transparent -top-[575px] lg:-top-36 -mb-[575px] w-[90%] lg:-mb-36  max-w-[1280px] mx-auto grid lg:grid-cols-3 gap-10'>
        <div className='bg-white relative px-7 py-12 flex flex-col gap-y-4 shadow-2xl rounded-md'>
        <span className='absolute left-5 -top-5 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-2xl text-white'><GiPalmTree/></span>
          <Heading level={2} size="sm">Kontakt cestovní agentura + autobusem do Chorvatska</Heading>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores placeat ab magni quia vitae vero at incidunt. Doloremque, delectus quo.</p>
          <div>
            <span className='flex items-center text-primary'>
              <HiPhone className='mr-2'/> {globalConfig.client.phone}
            </span>
            <span className='flex items-center text-primary'>
              <HiMail className='mr-2'/>{globalConfig.client.email}
              </span>
          </div>
        </div>

        <div className='bg-white relative px-7 py-12 flex flex-col gap-y-4 shadow-2xl rounded-md'>
          <span className='absolute left-5 -top-5 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-2xl text-white'><HiTruck/></span>
          <Heading level={2} size="sm">Kontakt autobusová a nákladní doprava</Heading>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores placeat ab magni quia vitae vero at incidunt. Doloremque, delectus quo.</p>
          <div>
            <span className='flex items-center text-primary'>
              <HiPhone className='mr-2'/> {globalConfig.client.phone}
            </span>
            <span className='flex items-center text-primary'>
              <HiMail className='mr-2'/>{globalConfig.client.email}
              </span>
          </div>
        </div>

        <div className='bg-white relative px-7 py-12 flex flex-col gap-y-4 shadow-2xl rounded-md'>
          <span className='absolute left-5 -top-5 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-2xl text-white'><HiCreditCard/></span>
          <Heading level={2} size="sm">Kontakt fakturace</Heading>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores placeat ab magni quia vitae vero at incidunt. Doloremque, delectus quo.</p>
          <div>
            <span className='flex items-center text-primary'>
              <HiPhone className='mr-2'/> {globalConfig.client.phone}
            </span>
            <span className='flex items-center text-primary'>
              <HiMail className='mr-2'/>{globalConfig.client.email}
              </span>
          </div>
        </div>

      </div>
    </>
  )
}