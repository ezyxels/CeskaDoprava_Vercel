import React, { useState, useRef, useEffect } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import ScrollContainer from 'react-indiana-drag-scroll';

type DatePickerProps = {
  text?: string;
  label?: string;
  name?: string;
  startDay?: number;
  startMonth?: number;
  startYear?: number;
  setFunction?: any;
  defaultTextAlign?: "left" | "center" | "right"
  datePickerValueAlign?: "left" | "center" | "right"
  datePickerAlign: "left" | "right"
  tabIndex?: number;
  inputClassName?: string;
  allDataObject?: any;
  yearStart?: number;
  yearEnd?: number;
  isRequired?: boolean;
  requiredArray?: any;
  formState?: "waiting" | "verifying" | "refused" | "accepted";
  oneOfMany?: false | string;
}

const months = [
  "leden", "únor", "březen", "duben", "květen",
   "červen", "červenec", "srpen", "září",  "říjen", "listopad", "prosinec",
]

export default function DatePicker({
  text,
  label,
  name = "",
  startDay = new Date().getDate(),
  startMonth = new Date().getMonth(),
  startYear=new Date().getFullYear(),
  setFunction,
  defaultTextAlign = 'left',
  datePickerValueAlign = 'left',
  datePickerAlign,
  tabIndex,
  inputClassName,
  allDataObject,
  yearStart = (new Date().getFullYear() - 5),
  yearEnd = (new Date().getFullYear() + 5),
  isRequired = false,
  requiredArray,
  formState,
  oneOfMany = false
}: DatePickerProps) {
  const [inValidation, setInValidation] = useState<"waiting" | "verifying" | "refused" | "accepted">()
  const [activated, setActivated] = useState<boolean>(false)
  const [day, setDay] = useState<number | undefined>(startDay)
  const [month, setMonth] = useState<number | undefined>(startMonth)
  const [year, setYear] = useState<number | undefined>(startYear)
  let content: any;
  let inputText: any;
  const clickerRef:any = useRef()

  
  useEffect(() => {
    if(oneOfMany === false){
      if(allDataObject !== undefined){
        if(allDataObject[name] === undefined){
          allDataObject[name] = "";
        }
      }
      if(isRequired && requiredArray !== undefined){
        if(!requiredArray.includes(name)){
          requiredArray?.push(name)
        }
      }
    }
    else{
      if(allDataObject !== undefined){
        if(allDataObject[oneOfMany] === undefined){
          allDataObject[oneOfMany] = {}
        }
        else{
          if(allDataObject[oneOfMany][name] === undefined)
            allDataObject[oneOfMany][name] = ""
        }
      }
      if(isRequired && requiredArray !== undefined){
        if(requiredArray[oneOfMany] === undefined){
          requiredArray[oneOfMany] = []
          requiredArray[oneOfMany].push(name);
        }
        else{
          if(!requiredArray[oneOfMany].includes(name)){
            requiredArray[oneOfMany].push(name);
          }
        }
      }
    }  
  })

  useEffect(() => {
    if(activated){
      document.addEventListener('mousedown', closeDatePicker);
    }
    else{
      document.removeEventListener('mousedown', closeDatePicker);
    }
    if(allDataObject !== undefined){
      if(oneOfMany === false){
        if(day !== undefined && month !== undefined && year !== undefined){
          allDataObject[name] = day + "." + months[month] + " " + year 
        }
        else{
          allDataObject[name] = ""
        }
      }
      else{
        if(day !== undefined && month !== undefined && year !== undefined){
          allDataObject[oneOfMany][name] = day + "." + months[month] + " " + year 
        }
        else{
          allDataObject[oneOfMany][name] = ""
        }
      }
    }
    setInValidation(formState)
  },[activated, formState])

  
  function closeDatePicker(e:any){
    if(clickerRef.current && activated && !clickerRef.current.contains(e.target)){
      setActivated(false)
    }
  }


  /* Vytvoření klikacích spanů */

  if(year !== undefined){
    if(month !== undefined){
      if(day !== undefined){
        
      /* Pokud je vyplněn rok, měsíc a den  */
        inputText = <>
          <span /* Den */
            className='cursor-pointer'
            onClick={() => {
              setDay(undefined)
            }}
          >
            {day + "."}
          </span>
          <span /* Měsíc */
            className='cursor-pointer mr-1'
            onClick={() => {
              setMonth(undefined)
              setDay(undefined)
            }}
          >
            {months[month]}
          </span>
          <span /* Rok */
            className='cursor-pointer'
            onClick={() => {
              setYear(undefined)
              setMonth(undefined)
              setDay(undefined)
            }}
          >
            {year}
          </span>
        </>
        }

        
      /* Pokud je vyplněn pouze rok a měsíc */
      else{
        inputText = 
          <>
            <span /* Měsíc */
              className='cursor-pointer mr-1'
              onClick={() => {
                setMonth(undefined)
                setDay(undefined)
              }}
            >
             {months[month]}
            </span>
            <span /* Rok */
              className='cursor-pointer'
              onClick={() => {
                setYear(undefined)
                setMonth(undefined)
                setDay(undefined)
              }}
            >
              {year}
            </span>
          </>
      }
      content = 
        <ShowDays 
          setDay={setDay} 
          setMonth={setMonth} 
          setYear={setYear} 
          day={day} 
          month={month} 
          year={year}
          setActivated={setActivated}
          setFunction={setFunction}
          name={name}
          allDataObject={allDataObject}
          oneOfMany={oneOfMany}
        />
    }

    
      /* Pokud je vyplněn pouze rok */
    else{
      inputText = 
        <span /* Rok */
          className='cursor-pointer'
          onClick={() => setYear(undefined)}
        >
          {year}
        </span>
      content = <ShowMonths month={month} setMonth={setMonth} year={year} setYear={setYear}/>
    }
  }
  else{
    content = <ShowYears setYear={setYear} year={year} yearStart={yearStart} yearEnd={yearEnd}/>
  }
  return (
    <>
    <span className='relative' ref={clickerRef} tabIndex={tabIndex}>
    <div className={`flex-col md:max-w-sm
      ${label !== undefined ? "flex" : "hidden"}
    `}>
      <label 
        className="font-semibold text-black cursor-pointer mb-3" 
        htmlFor={name}
        onClick={() => setActivated(true)}
      >
        {label}
        {isRequired && <span className="text-primary ml-1">*</span>}
        {(inValidation === "refused" &&
          isRequired &&
          oneOfMany === false &&
          allDataObject[name] === "")
          &&
          <span className="text-primary ml-1">Toto pole je povinné!</span>
        }
        {(inValidation === "refused" &&
          isRequired &&
          oneOfMany !== false &&
          allDataObject[oneOfMany][name] === "")
          &&
          <span className="text-primary ml-1">Toto pole je povinné!</span>
        }
      </label>
    </div>

      {/* Jakoby input */}
      <div className={`
        cursor-pointer p-1.5 flex items-center transition duration-default
        ${activated && "bg-transparent !border-primary !outline-none ring-2 ring-primary !bg-white"}
        ${(inputText === undefined && defaultTextAlign === "left") && "justify-start"}
        ${(inputText === undefined && defaultTextAlign === "center") && "justify-center"}
        ${(inputText === undefined && defaultTextAlign === "right") && "justify-end"}
        ${(inputText !== undefined && datePickerValueAlign === "left") && "justify-start"}
        ${(inputText !== undefined && datePickerValueAlign === "center") && "justify-center"}
        ${(inputText !== undefined && datePickerValueAlign === "right") && "justify-end"}
        ${inputClassName === undefined ? 
          "rounded-md w-full h-12 bg-body-200" 
          : 
          inputClassName
        }
        `}
        onClick={() => {setActivated(true)}}
      >
        {inputText === undefined ? text : inputText}
      </div>

      {/* Datepicker */}
      <ScrollContainer component={"div"}  className={`absolute mt-5 rounded-lg bg-gray-50 z-50 w-60 h-fit max-h-60 overflow-y-scroll border-2 border-muted flex flex-col
          ${!activated && "hidden"}
          ${datePickerAlign === "left" && "left-0"}
          ${datePickerAlign === "right" && "right-0"}
        `}
        >
        {content}
      </ScrollContainer>
    </span>
    </>
  )
}


type ShowYearsProps = {
  year: number | undefined;
  setYear: any;
  yearStart: number;
  yearEnd: number;
}

function ShowYears({year, setYear, yearStart, yearEnd}: ShowYearsProps){
  let yearValues:any = [];
  for ( let i = yearStart; i <= yearEnd; i++){
    yearValues.push(
      <span key={i} className='rounded-md hover:bg-gray-200 text-center cursor-pointer' onClick={() => setYear(i)}>{i}</span>)
  }
  return(
    <div className='grid grid-cols-3 p-3 gap-3'>
      {yearValues}
    </div>
  )
}

type ShowMonthsProps = {
  month: number | undefined;
  setMonth: any;
  year: number;
  setYear: any;
}

function ShowMonths({month, setMonth, year, setYear}: ShowMonthsProps){
  let monthValues:any = [];
  for ( let i = 0; i <= 11; i++){
    monthValues.push(
      <span key={i} className='rounded-md hover:bg-gray-200 text-center cursor-pointer' onClick={() => setMonth(i)}>{months[i]}</span>)
  }

  return(
    <>
      <div className='grid grid-cols-7 w-full border-b border-gray-700'>
          <span className='col-span-1 flex justify-start text-3xl cursor-pointer' onClick={() => setYear(year - 1)} ><HiChevronLeft></HiChevronLeft></span>
          <span className='col-span-5 flex justify-center text-xl font-bold cursor-pointer' onClick={() => setYear(undefined)}>{year}</span>
          <span className='col-span-1 flex justify-end text-3xl cursor-pointer' onClick={() => setYear(year + 1)} ><HiChevronRight></HiChevronRight></span>
        </div>
      <div className='grid grid-cols-3 p-3 gap-3'>
        {monthValues}
      </div>
    </>
  )
}

type ShowDaysProps = {
  day: number | undefined;
  setDay: any;
  month: number;
  setMonth: any;
  year: number;
  setYear: any;
  setActivated: any;
  setFunction: any;
  name: string;
  allDataObject: any;
  oneOfMany: boolean | string;
}

function ShowDays({day, setDay, month, setMonth, year, setYear, setActivated, setFunction, name, allDataObject, oneOfMany}: ShowDaysProps){
  let dayValues:any = [];
  let monthWithZero = (month+1) < 10 ? "0" + (month+1) : (month+1);
  for ( let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++){
    let dayWithZero = i < 10 ? "0" + i : i;
    dayValues.push(
      <span 
        key={i}
        className='rounded-md hover:bg-gray-200 text-center cursor-pointer' 
        onClick={() => {
          setDay(i)
          setActivated(false)
          setFunction !== undefined && setFunction(year + "-" + monthWithZero + "-" + dayWithZero)
          if(allDataObject !== undefined){
            if(oneOfMany === false){
              allDataObject[name] = (year + "-" + monthWithZero + "-" + dayWithZero)
            }
            else if(typeof oneOfMany === "string"){
              allDataObject[oneOfMany][name] = (year + "-" + monthWithZero + "-" + dayWithZero)
            }
          }
        }}
        >
          {i}
        </span>
      )
  }

  return(
    <>
      <div className='grid grid-cols-7 w-full border-b border-gray-700'>
        <span className='col-span-1 flex justify-start text-3xl cursor-pointer' 
          onClick={() => {
            if(month === 0){
              setMonth(11)
              setYear(year - 1)
            }
            else{
              setMonth(month - 1)
            }
          }}
        ><HiChevronLeft></HiChevronLeft></span>
        <span className='col-span-5 flex justify-center text-xl font-bold cursor-pointer' onClick={() => setMonth(undefined)}>{months[month]}</span>
        <span className='col-span-1 flex justify-end text-3xl cursor-pointer' 
          onClick={() => {
            if(month === 11){
              setMonth(0)
              setYear(year + 1)
            }
            else{
              setMonth(month + 1)
            }
          }}
        ><HiChevronRight></HiChevronRight></span>
      </div>
      <div className='grid grid-cols-7 p-2 gap-2'>
        {dayValues}
      </div>
    </>
  )
}