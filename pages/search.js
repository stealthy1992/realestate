import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon, Button, Input } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'
import SearchFilters from '../components/SearchFilters'
import Property from '../components/Property'
import { fetchApi, baseUrl } from '../utils/fetchApi'
import { FaBookmark } from 'react-icons/fa'

import noresult from '../assets/noresult.svg'


const Search = ({properties}) => {

    const [ localProperties, setLocalProperties ] = useState(properties)
    const [ searchTerm, setSearchTerm ] = useState('')
    const [flag, setFlag] = useState(false)
    const [searchFilters, setSearchFilters ] = useState(false)
    const router = useRouter()

    useEffect(() => {
        console.log(searchTerm)
        localProperties.map((property) => console.log(property))
        const filteredData = localProperties?.filter((property) => property.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setLocalProperties(filteredData)
    },[searchTerm])
 
    return (
        <Box>
            <Flex
            cursor="pointer"
            background="gray.100"
            borderBottom="1px"
            borderColor="gray.200"
            p="2"
            fontWeight="black"
            fontSize="lg"
            justifyContent="center"
            alignItems="center"
            onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
            <Text>Search Properties with Filter</Text>
            <Icon paddingLeft="2"  w="7" as={BsFilter} />

            </Flex>
            {searchFilters && <SearchFilters />}
            <Flex background="gray.300" p="4" content="center" flexWrap="wrap">
            <Button onClick={() => setFlag(!flag)}>Search By Location</Button>
            {flag && <Box paddingLeft="5">
                <Input background="gray.100" placeholder="Search Location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </Box>}
           
            </Flex>
            
            <Text fontSize="2xl" p='4' fontWeight="bold">
                Properties {router.query.purpose}

            </Text>
            <Flex flexWrap="wrap">
                {localProperties.map((property) => <Property property={property} key={property.id}/>)}
            </Flex>
            
            {localProperties.length === 0 && (
                <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
                    <Image alt="No Result" src={noresult}/>
                    <Text fontSize="2xl" marginTop="2">No Result FOund</Text>
                </Flex>
            )}
        </Box>
    )

}

export default Search


export async function getServerSideProps({ query }) {
    
    const purpose = query.purpose || 'for-rent'
    const rentFrequency = query.rentFrequency || 'yearly'
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    return {
        props: {
        properties: data?.hits,
        },
    }
  
  }