import Heading from "@components/bricks/Heading";
import Textarea from "@components/forms/Textarea"
import Select from "@components/forms/Select";
import ComboSelect from "@components/forms/ComboSelect";

type Props = {
  formState: "waiting" | "verifying" | "refused" | "accepted";
  allDataObject: object;
  requiredArray: string[] | object[];
  prices: Prices[];
  months: Months[];
  departurePoints: DeparturePoints[];
}

interface Months{
  datumCr:[
    {
      datum: string;
    }
  ];
  datumHr:[
    {
      datum: string;
    }
  ]
}

interface Prices{
  oblast: string;
  zpatecni: string;
  jednosmerna: string;
}

interface DeparturePoints{
  oblast: string;
  stat: string;
  mesto: [{
    nazev: string;
  }];
}

export default function Trip({ 
  formState, 
  allDataObject, 
  requiredArray,
  months,
  departurePoints
}: Props){
  let departurePointsCz: string[] = [];
  let departurePointsHr: string[] = [];
  let datesCz: string[] = [];
  let datesHr: string[] = [];


  if(departurePointsCz.length === 0){
    departurePoints.map((e:DeparturePoints) => {
      e.stat === "Česká Republika" &&  e.mesto.map((mesto:any, key:number) =>(
        departurePointsCz.push(mesto.nazev)
      ))
      e.stat === "Chorvatsko" && e.mesto.map((mesto:any, key:number) => (
        departurePointsHr.push(mesto.nazev)
      ))
    })
  }

  if(datesCz.length === 0){
    months.map((e:Months) => {
      e.datumCr.map((date:any) => (
        datesCz.push(date.datum)
      ))
      e.datumHr.map((date:any) => (
        datesHr.push(date.datum)
      ))
    })
  }
  return(
    <div className="mt-28">
      <Heading level={3} size={"xl"}>Zájezd</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 mb-7">
        <Select
          name="dateCz" 
          label="Termín odjezdu Česká republika"
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
          formState={formState}
        >
          {datesCz.map((date:string, key:number) => (
            <option value={date} key={key}>{date}</option>
          ))}
            
        </Select>

        <ComboSelect 
          name="pointCz" 
          label="Nástupní místo Česká republika"
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
          formState={formState}
          values={departurePointsCz}
        />
        
        <Select
          name="dateHr" 
          label="Termín odjezdu Chorvatsko"
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
          formState={formState}
        >
          {datesHr.map((date:string, key:number) => (
            <option value={date} key={key}>{date}</option>
          ))}
        </Select>

        <ComboSelect 
          name="pointHr" 
          label="Nástupní místo Chorvatsko"
          isRequired={true}
          requiredArray={requiredArray}
          allDataObject={allDataObject}
          formState={formState}
          values={departurePointsHr}
        />
      </div>
      <Textarea
        className="mt-10"
        name="comment" 
        label="Poznámka k objednávce"
        allDataObject={allDataObject}
      />
    </div>
  )
}
