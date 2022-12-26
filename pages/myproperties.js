import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { collection, query, QuerySnapshot, getDocs} from "firebase/firestore"
import millify from 'millify'
import Link from "next/link";
import Image from 'next/image';
import { Box, Flex, Text, Avatar, Button} from '@chakra-ui/react'
import { FaBed, FaBath, FaBookmark } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import DefaultImage from '../assets/house.jpg'

const MyProperties = () => {

  const [ properties, setProperties] = useState([])

  useEffect(() => {
    
     getProperties()

  },[])

  const getProperties = async () => {
    const docRef = query(collection(db, "properties"))
    const querySnapshot = await getDocs(docRef)
    querySnapshot.forEach(async (doc) => {
        setProperties(properties => [...properties, doc.data()])
    })
  }

  return (
   <Box>
      <Flex flexWrap="wrap" paddingTop="4">
        {/* {properties.map((property) => <Property property={property} key={property.id} isMyProperties/>)} */}
        {properties.map((property) => (
          <Flex key={property.id} flexWrap="wrap" w="420px" p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer">
          <Link href={`/property/${property.externalID}`} passHref>
             <Box>
                 <Image src={property.coverPhoto ? property.coverPhoto.url : DefaultImage} width={460} height={260} alt="house"/>                
             </Box>
          </Link>
         
         
         <Box w="full">
             <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                 <Flex alignItems="center">
                     <Box paddingRight="3" color="green.400">{property.isVerified && <GoVerified />}</Box>
                     <Text fontWeight="bold" fontSize="lg">AED {millify(property.price)}{property.rentFrequency && `/${property.rentFrequency}`}</Text>

                 </Flex>
                 <Box>
                     <Avatar size="sm" src={property.agency?.logo?.url} />


                 </Box>

             </Flex>
             <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                 {property.rooms} <FaBed/> | {property.baths} <FaBath /> | {millify(property.area)} sqft <BsGridFill />
               
                 <Link href={`/edit/${property.externalID}`}><Button>Edit</Button></Link>
                
             </Flex>
             <Text  fontSize="lg">
                 {property.title}

             </Text>
             

         </Box>
     </Flex>
        ))}
      </Flex>
   </Box>
    
  )
}

export default MyProperties
