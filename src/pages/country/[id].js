import Layout from '@/src/components/Layout/Layout'
import React from 'react'
import Image from "next/image";
import styles from "./country.module.css";
import Link from "next/link";

const getCountry = async(id)=>{
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    const country = await response.json();
    return country;
}

const Country = ({country}) => {
    const {name,region,flags,
           subregion,population,
           area,capital,languages,
           currencies,gini,borders,altSpellings
        } = country[0];
 
  return (
    <Layout title={country.name}>
        <Link href="/"><h4>Home</h4></Link>
        <div className={styles.countryContainer}> 
            <div className={styles.overview_panel}>
                <Image src={flags.svg} alt={country.name} 
                className={styles.img}
                width="100" height="80"/>  
                <h1 className={styles.overview_name}>{name.common}</h1>
                <div className={styles.overview_region}>{region}</div>
                <div className={styles.overview_subregion}>{subregion}</div>

                <div className={styles.overview_numbers}>
                    <div className={styles.overview_population}>
                        <div className={styles.overview_value}>{population}</div>
                        <div className={styles.overview_label}>Population</div>
                    </div>
                    <div className={styles.overview_area}>
                        <div className={styles.overview_value}>{area}</div>
                        <div className={styles.overview_label}>Area</div>
                    </div>
                </div>
            </div>
            <div className={styles.details_panel}>
                <h4 className={styles.details_panel_heading}>Details</h4>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Capital</div>
                    <div className={styles.details_panel_value}>{capital}</div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Languages</div>
                    <div className={styles.details_panel_value}>
                    {Object.values(languages).join(", ")}
                    </div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Currency</div>
                    <div className={styles.details_panel_value}>
                    {Object.values(currencies)[0].name}
                    </div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Native Name</div>
                    <div className={styles.details_panel_value}>
                    {Object.values(name.nativeName).map((item)=> item.official).join(", ")}
                    </div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Other Name</div>
                    <div className={styles.details_panel_value}>{altSpellings ? altSpellings.join(", ") :"Haven't other name"}</div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Gini</div>
                    <div className={styles.details_panel_value}>{gini ? `${Object.values(gini).join(",")}%`:"Haven't Gini"}</div>
                </div>
                <div className={styles.details_panel_row}>
                    <div className={styles.details_panel_label}>Borders</div>
                    <div className={styles.details_panel_value}>{borders ? borders.sort().join(", ") :"Not shares borders"}</div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Country

// export const getStaticPaths = async () => {
//     const res = await fetch("https://restcountries.eu/rest/v2/all");
//     const countries = await res.json();
  
//     const paths = countries.map((country) => ({
//       params: { id: country.alpha3Code },
//     }));
  
//     return {
//       paths,
//       fallback: false,
//     };
//   };
  

// export const getServerSideProps = async (context) => {
//     const id = context.params;
//     const country = await getCountry(id);
  
//     return {
//       props: {
//         country,
//       },
//     };
//   };

export async function getServerSideProps(context){
    const Id = context.params.id;
     const country = await getCountry(Id);
    return {
        props:{ country}    
    }
}