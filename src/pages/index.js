import styles from '@/styles/Home.module.css'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import React ,{useState} from 'react';

export default function Home({countries}) {
  const [keyword ,setKeyword] = useState("");

  const filteredCountries = countries.filter((country)=>
    country.name.common.toLowerCase().includes(keyword) 
    || country.region.toLowerCase().includes(keyword)
    // || country.subregion.toLowerCase().includes(keyword) 
  )

  const onInputChange =(e)=> {
    setKeyword(e.target.value.toLowerCase())
  }
//  console.log(countries)
  return (
    <>
      <Layout>
          <div className={styles.inputContainer}>
            <div className={styles.counts}>Found {countries.length} countries</div>
          </div>
          <SearchInput placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          />
          <CountriesTable countries ={filteredCountries}/>     
      </Layout>
    </>
  )
}

export async function getStaticProps(){
  const res = await fetch("https://restcountries.com/v3.1/all")
  const countries = await res.json();
  return {
    props:{
      countries,
    }
  }
}
