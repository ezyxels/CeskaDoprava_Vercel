import { jsPDF } from "jspdf";
import Link from "next/link";
import { useEffect, useState } from "react";

import Customer from "./Customer";
import Passengers from "./Passengers";
import Trip from "./Trip";

import Button from "@components/bricks/Button";
import Heading from "@components/bricks/Heading";
import Wrapper from "@components/bricks/Wrapper";
import Checkbox from "@components/forms/Checkbox";


type FormProps = {
  code: string;
  dateAndPrice: [{
    datumOd: string,
    datumDo: string,
    cena: number
  }];
  departurePoints: [{
    mesto: string,
    ulice: string,
    cisloPopisne: number
  }];
}

export default function Form({ code, dateAndPrice, departurePoints }: FormProps) {
  let allDataObject: any = {};
  let requiredArray: any = [];

  return (
    <FormStater
      code={code}
      dateAndPrice={dateAndPrice}
      departurePoints={departurePoints}
      allDataObject={allDataObject}
      requiredArray={requiredArray}
    />
  )

}

type FormStaterProps = {
  code: string;
  dateAndPrice: [{
    datumOd: string,
    datumDo: string,
    cena: number
  }];
  departurePoints: [{
    mesto: string,
    ulice: string,
    cisloPopisne: number
  }];
  allDataObject: any;
  requiredArray: any;
}

function FormStater({ code, dateAndPrice, departurePoints, allDataObject, requiredArray }: FormStaterProps) {
  const [formState, setFormState] = useState<"waiting" | "verifying" | "refused" | "accepted">("waiting");
  const [passengers, setPassengers] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if(price === undefined){
      let tempPrice = 0;
      let tempDateFrom = "2025-12-12"
      dateAndPrice.map(entry => {
        if(new Date(entry.datumOd).getTime() > new Date().getTime() && new Date(entry.datumOd).getTime() < new Date(tempDateFrom).getTime()){
          tempPrice = entry.cena;
        }
      })
      setPrice(tempPrice)
    }

    if(formState === "refused"){
      window.alert("Zapoměl jsi vyplnit některé z povinných polí")
    }
    else if(formState === "accepted"){
      window.alert("Vše úspěsně vyplněno")
      CreatePdf();
    }
  }, [formState])

  function verifying(){
    setFormState("verifying")
    setTimeout(
      () => {
        let tempState = "verifying"
        Object.entries(requiredArray).map((e) => {
          if(typeof e[1] === "string"){
            if((e[1] in allDataObject) && allDataObject[e[1]] === ""){
              tempState = "refused"
              setFormState("refused")
            }
          }
          else if(typeof e[1] === "object" && e[1] !== null){
            if(Object.keys(e[1]).length !== 0) {
              if(e[0] in allDataObject){
                Object.entries(allDataObject[e[0]]).map((elem:any) => {
                  if(elem[1] === ""){
                    tempState = "refused"
                    setFormState("refused")
                  }
                })
              }
            }
          }
        })
        if(tempState === "refused"){
          setFormState("refused")
        }
        else{
          setFormState("accepted")
        }
      }, 150
    )
  }
  
  function CreatePdf() {
    console.log(allDataObject)
    /*  
    
    const doc = new jsPDF();
     doc.setFontSize(25)
     doc.text("Informace o zájezdu:", 60, 10)
 
     doc.setFontSize(15)
     doc.text(
       "Kód zájezdu: " + allDataObject.code,
       20,
       30
     )
 
     doc.text(
       "Termín: " + allDataObject.date,
       20,
       40
     )
 
     doc.text(
       "Nástupní / výstupní místo: " + allDataObject.departurePoint,
       20,
       50
     )
 
     doc.text("Poznámka od zákazníka:", 20, 60)
     doc.text(allDataObject.comment, 20,70)
 
     
     doc.setFontSize(25)
     doc.text("Objednavatel:", 70, 100)
 
     doc.setFontSize(15)
     doc.text(
       "Jméno: " + allDataObject.name,
       20,
       120
     )
 
     doc.text(
       "Narození: " + allDataObject.birth,
       20,
       130
     )
 
     
     doc.text(
       "Číslo: " + allDataObject.phone,
       20, 
       140
     )
     
     doc.text(
       "E-mail: " + allDataObject.email,
       20,
       150
     )
 
     
     doc.setFontSize(25)
     doc.text("Další cestující:", 65, 165)
 
     doc.setFontSize(15)
 
     if(nameNext !== undefined && birthNext !== undefined){
       Object.entries(nameNext).map((name: any, i) => {
         if(i % 2 == 0){  
           doc.text(
             "Jméno: " + name[1].value,
             20,
             180 + i * 10
           )
         }
         else{
           doc.text(
             "Jméno: " + name[1].value,
             120,
             180 + (i-1) * 10
           )
         }
       })
 
       Object.entries(birthNext).map((birth:any, i) => {
         if(i % 2 == 0){  
           doc.text(
             "Narození: " + birth[1].value,
             20,
             187 + i * 10
           )
         }
         else{
           doc.text(
             "Narození: " + birth[1].value,
             120,
             187 + (i-1) * 10
           )
         }
       })
     }
 
     doc.line(10, 255, 200, 255)
     doc.text("Cena za osobu", 20, 265)
     doc.text(JSON.parse(dateAndPrice).cena + ",-", 88, 265, "right")
     doc.text("Pocet osob", 20, 273)
     doc.line(10, 277, 95, 277)
     doc.text("Celková cena", 20, 285)
     if(nameNext !== undefined){
       doc.text(nameNext.length.toString(), 85, 273, "right")
       doc.text(allDataObject.price + " Kc", 92, 285, "right")
     }
     else{
       doc.text("1", 85, 273, "right")      
       doc.text(allDataObject.price + " Kc", 92, 285, "right")
     }
     doc.text("Podpis: ....................", 145, 285)
 
     //doc.save("objednavka.pdf")
     doc.output('dataurlnewwindow') */
  }

  return (
    <Wrapper
      size="base"
      as={"section"}
    >
      <div className="mt-12">
        <Heading level={2} size={"xl"}>Objednávkový formulář</Heading>
        <p className="text-gray-600 max-w-sm mt-10">Pole označená hvězdičkou jsou nutné vyplnit. Veštěré informace týkající se zájezdu naleznete zde nad formulářem</p>
        <Customer
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          formState={formState}
        />
        <Trip
          setPrice={setPrice}
          code={code}
          dateAndPrice={dateAndPrice}
          departurePoints={departurePoints}
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          formState={formState}
        />
        <Passengers
          passengers={passengers}
          setPassengers={setPassengers}
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          formState={formState}
        />
        <div className="flex flex-col mt-20">
          <span className="text-2xl">Celková cena</span>
          <span className="mt-3 text-3xl">{price * (1 + passengers)},-</span>
        </div>
      </div>


      <div className="mt-16 flex flex-col">
      <Checkbox 
          allDataObject={allDataObject}
          requiredArray={requiredArray}
          isRequired={true}
          label={<>Souhlasím se <span className="text-primary">zpracováním osobních údajů</span></>}
          name="gdpr"
          formState={formState}
        />
        <Button
          className="w-fit my-8 mx-auto"
          onClick={() => verifying()}
        >
          Odeslat objednávku
        </Button>
      </div>
    </Wrapper>
  )
}