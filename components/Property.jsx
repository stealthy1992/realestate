import Link from "next/link";
import Image from 'next/image';
import { Box, Flex, Text, Avatar, Button} from '@chakra-ui/react'
import { FaBed, FaBath, FaBookmark } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from "millify";
import DefaultImage from '../assets/house.jpg'
import { db } from '../firebase/config'
import { query, collection, addDoc, QuerySnapshot, querySnapshot, getDocs} from "firebase/firestore"
import { useEffect, useState } from "react";

const Property = ({property: { rentFrequency, coverPhoto, price, rent, frequency, rooms, title, baths, area, agency, isVerified, externalID}, property, isMyProperties}) => {


// useEffect(() => {
    
//     checkIfFavorite()

// },[isBookmarked])

// const checkIfFavorite = async () =>  {
//     const docRef = query(collection(db, "properties"))
//     const querySnapshot = await getDocs(docRef)
//     querySnapshot.forEach(async (doc) => {
//         console.log(doc.data())
//     })
// }

const setPropertyinFB = async (values) => {
    console.log(values)
    const docRef = collection(db, "properties")
    await addDoc(docRef, {
        externalID: values.externalID,
        coverPhoto: values.coverPhoto,
        isVerified: values.isVerified,
        rentFrequency: values.rentFrequency,
        price : values.price, 
        rooms: values.rooms, 
        title: values.title, 
        baths: values.baths, 
        area: values.area, 
        agency: values.agency,
        isFavorite: true
    })
}

    return (
        
       
        <Flex flexWrap="wrap" w="420px" p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer">
                 <Link href={`/property/${externalID}`} passHref>
                    <Box>
                        <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={460} height={260} alt="house"/>                
                    </Box>
                 </Link>
                
                
                <Box w="full">
                    <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                        <Flex alignItems="center">
                            <Box paddingRight="3" color="green.400">{isVerified && <GoVerified />}</Box>
                            <Text fontWeight="bold" fontSize="lg">AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
    
                        </Flex>
                        <Box>
                            <Avatar size="sm" src={agency?.logo?.url} />
    
    
                        </Box>
    
                    </Flex>
                    <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                        {rooms} <FaBed/> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
                        {/* {showEditButton && <Button>Edit</Button>} */}
                        {console.log(property.isFavorite)}
                        {isMyProperties ? <Link href={`/edit/${externalID}`}><Button>Edit</Button></Link>: <Button onClick={() => setPropertyinFB(property)}><FaBookmark /></Button>}
                        {/* <Button isDisabled={isMyProperties} onClick={() => setPropertyinFB(property)}><FaBookmark /></Button> */}
                    </Flex>
                    <Text  fontSize="lg">
                        {title.length > 20 ? `${title.substring(0,30)}...` : title}
    
                    </Text>
                    
    
                </Box>
            </Flex>
        

    )

}



export default Property;
