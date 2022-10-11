import { useState } from 'react'

import Button from '@components/bricks/Button'
import Heading from '@components/bricks/Heading'
import Wrapper from '@components/bricks/Wrapper'

type Props={
  departurePoints: DeparturePointsProps[] | any;
}

interface DeparturePointsProps{
  oblast: string;
  stat: string;
  mesto: Mesto[];
}

interface Mesto {
  nazev: string;
}

export default function DeparturePoints({departurePoints}: Props) {
  const [content, setContent] = useState<string>(departurePoints[0].oblast);

  return (
    <Wrapper as="section" size="base" paddedContent='sm' className='mt-20'>
      <Heading level={2} size="xl">Nástupní a výstupní místa</Heading>
      <p className='mt-10 max-w-prose'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ullam cupiditate ea eveniet vel voluptatum expedita iusto cum dicta libero velit porro neque recusandae eius cumque, quidem sequi hic corporis alias deleniti?</p>
      
      {/*  On pc */}
      <div className={`hidden mt-10 md:grid md:grid-cols-5 gap-x-5`}>
        {departurePoints.map((e:DeparturePointsProps, key:number) => {
          return(
            <div key={key}>
              <Heading level={3} size={"sm"}>{e.oblast}</Heading>
              <p className='text-xs uppercase mt-2'>{e.stat}</p>
              <div className='flex flex-col mt-5 bg-gray-100  divide-y-2 border-gray-900'>
                {e.mesto.map((mesto:Mesto, key:number) => (
                  <p key={key} className='text-sm w-full text-center p-2'>{mesto.nazev}</p>
                ))}
              </div>
            </div>
          )
        })}
      </div>

        {/*  On phone  */}
        <div className='grid grid-cols-10 md:hidden mt-10 gap-x-3'>
          <div className='flex flex-col col-span-3 gap-y-3'>
            {departurePoints.map((e:DeparturePointsProps, key:number) => (
              <Button key={key} onClick={() => setContent(e.oblast)}>{e.oblast}</Button>
            ))}
          </div>
          <div className='col-span-7'>
          <div className='flex flex-col bg-gray-100 divide-y-2 border-gray-900'>
            {departurePoints.find((e :any)=> e.oblast === content).mesto.map((mesto:Mesto, key:number) => (
              <p key={key} className='text-sm w-full text-center p-2'>{mesto.nazev}</p>
            ))}
            </div>
          </div>
        </div>
    </Wrapper>
  )
}