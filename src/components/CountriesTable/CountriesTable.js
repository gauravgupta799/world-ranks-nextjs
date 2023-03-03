import React, {useState} from "react";
import styles from "./CountriesTable.module.css"
import Image from "next/image";
import Link from "next/link";

const sortNameArray =["A-Z", "Z-A"];
const sortPopulationArray =["Asc" , "Desc"];

const orderBy =(countries, direction)=>{
    console.log("direction", direction)
    switch (direction) {
        case "Asc":
            return  [...countries].sort((a,b)=> a.population > b.population ? 1 : -1);
        case "Desc":
            return [...countries].sort((a,b)=> a.population > b.population ? -1 : 1);
        case "A-Z":
            return [...countries].sort((a,b)=> a.name.common < b.name.common ? -1 : 1);
        case "Z-A":
            return [...countries].sort((a,b)=> a.name.common < b.name.common ? 1 : -1);     
        default:
            return countries
    }
}

const CountriesTable = ({countries}) => {
    const [cname, setCname] = useState("");
    const [sortVal, setSortVal] = useState("")
    const orderedCountries = orderBy(countries, sortVal)

  return (
    <div className={styles.tableContainer}>
        <div className={styles.headings}>
            <button className={styles.heading_name}>
                <h2>Name</h2>
                <select className={styles.select} onChange={(e)=> setSortVal(e.target.value)}>
                    {sortNameArray.map((option,i)=> 
                        <option key={i} name ={option} value={option}>
                            {option}
                        </option>
                    )}
                </select>
            </button>
            <button className={styles.heading_population}>
                <h2>Population</h2>
                <select className={styles.select} onChange={(e)=> setSortVal(e.target.value)}>
                    {sortPopulationArray.map((option,i)=> 
                        <option key={i} name ={option} value={option}>
                            {option}
                        </option>
                    )}
                </select>
            </button>
        </div>
        {orderedCountries.map((country)=>{
            return(
                <>
                    <Link href={`/country/${country.ccn3}`}>
                        <div className={styles.row} key={country.name}>
                            <div className={styles.name}>
                                <Image src={country.flags.svg} width="40" height="40" alt="flag"/>
                                {country.name.common}
                            </div>
                            <div className={styles.population}>{country.population}</div>
                        </div>
                    </Link>
                </>
            )
        })}
    </div>
  )
}

export default CountriesTable