import { useEffect, useState } from "react"
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react'
import { useRouter } from "next/router"
import { MdCancel } from 'react-icons/md'
import Image from 'next/image'
import { filterData, getFilterValues } from "../utils/filterData"
import { fetchApi, baseUrl } from "../utils/fetchApi"

import noresult from '../assets/noresult.svg'


const SearchFilters = () => {
    
    
    const [ loading, setLoading ] = useState(false)
    const router = useRouter()
    const [ filters, setFilters ] = useState(filterData)
    const [ locationsData, setLocationsData] = useState()

    // useEffect(() => {
    //     console.log(searchTerm)
    //     if(searchTerm !== '')
    //         fetchLocation()
    // },[searchTerm])

    // const fetchLocation = async () => {

    //     // setLoading(true)
    //     const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`)
    //     setLocationsData(data?.hits)
    //     // setLoading(false)
    //     console.log(data?.hits)
        
    // }
    const searchProperties = (filterValues) => {
        console.log(filterValues)
        const path = router.pathname
        console.log(path)
        const { query } = router
        console.log('quer is ',query)
        const values = getFilterValues(filterValues)

        values.forEach((item) => {
          if(item.value && filterValues?.[item.name])
            query[item.name] = item.value
        })
        console.log(path, query)
        router.push({ pathname: path, query})

    }

    return (
        <>
        <Flex background="gray.100" p="4" content="center" flexWrap="wrap">
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select 
                    placeholder={filter.placeholder}
                    width="fit-content"
                    padding="2"
                    onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}>
                        {filter?.items?.map((item) => (
                            // console.log(item)
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>

                </Box>
            ))}
        </Flex>
        
        {/* {loading && <Spinner margin='auto' marginTop='3' />}
           
              <Box height='300px' overflow='auto'>
                {locationsData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                    //   setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationsData?.length && (
                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                    <Image src={noresult} />
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box> */}
        </>
        
        
    )
}

export default SearchFilters