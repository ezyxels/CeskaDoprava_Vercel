import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

type Categories = {
  kategorie: string;
}

type DateAndPrice = {
  datumOd: string;
  datumDo: string;
  cena: number;
}

type Props = {
  id: number;
  name: string;
  imageSrc: string;
  dateAndPrice: DateAndPrice[];
  categories: Categories[];
  filterCategory: string;
  filterDateFrom: string;
  filterDateTo: string;
}

export default function TripMinimal({ id, name, imageSrc, dateAndPrice, categories, filterCategory, filterDateFrom, filterDateTo }: Props) {
  const [changeables, setChangables] = useState<{ dateFrom: string, dateTo: string, price: number }>
    ({ dateFrom: "2023-12-31", dateTo: "2023-12-31", price: 0 })

  let counterForTags = 0

  useEffect(() => {
    let tempDateFrom = "2023-12-31";
    let tempDateTo = "2023-12-31";
    let tempPrice = 0;

    dateAndPrice.map((entry, index) => {
      if ((index + 1) === dateAndPrice.length) {
        if (new Date(entry.datumOd).getTime() >= new Date(filterDateFrom).getTime() && new Date(entry.datumOd).getTime() < new Date(tempDateFrom).getTime()) {
          setChangables({
            dateFrom: changeDateType(entry.datumOd),
            dateTo: changeDateType(entry.datumDo),
            price: entry.cena
          })
        }
        else {
          setChangables({
            dateFrom: changeDateType(tempDateFrom),
            dateTo: changeDateType(tempDateTo),
            price: tempPrice
          })
        }
      }
      else {
        if (new Date(entry.datumOd).getTime() >= new Date(filterDateFrom).getTime() && new Date(entry.datumOd).getTime() < new Date(tempDateFrom).getTime()) {
          tempDateFrom = entry.datumOd;
          tempDateTo = entry.datumDo;
          tempPrice = entry.cena;
        }
      }
    })
  }, [filterDateFrom, filterDateTo])

  function changeDateType(date: string) {
    var newDate = date.split("-")[2] + "." + date.split("-")[1] + "."
    return newDate;
  }

  return (
    <Link
      href={`/zajezd/${id}`}
    >
      <a
        className="flex flex-col transition duration-300 hover:-translate-y-2 hover:shadow-lg rounded-lg"
      >
        <div
          className="relative w-full h-[250px] rounded-md overflow-hidden"
        >
          <Image
            src={imageSrc}
            alt='#'
            layout='fill'
            objectFit='cover'
            priority={true}
          />
        </div>
        <div className="px-1.5 pt-5 pb-1.5 flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-wrap gap-y-2 mb-5">
              {categories.map((category: any, key: number) => {
                if (
                  counterForTags === 0 ||
                  counterForTags === 1 && category.kategorie === filterCategory ||
                  counterForTags === 1 && key === categories.length - 1
                ) {
                  counterForTags++
                  return (
                    <span
                      className="h-fit text-sm bg-primary mr-2 text-white px-1 rounded-md uppercase tracking-wider"
                      key={key}
                    >
                      {category.kategorie}
                    </span>
                  )
                }
              })}
            </div>
            <span className="min-w-[110px]">{changeables.dateFrom} - {changeables.dateTo}</span>
          </div>
          <span className="mt-auto text-lg font-bold text-black pt-3">{name}</span>
          <span
            className="text-gray-600 font-semibold"
          >
            {changeables.price} Kč
          </span>
          <div className="flex flex-row justify-between w-full text-primary font-semibold">
            Zobrazit více
            <HiArrowNarrowRight />
          </div>
        </div>
      </a>
    </Link>
  )
}