import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Select,
    Radio, 
    RadioGroup,
    Stack
  } from '@chakra-ui/react'

import millify from 'millify'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { db } from '../../firebase/config'
import { query, collection, QuerySnapshot, getDocs, where, getDoc, updateDoc, doc }from "firebase/firestore"


const EditProperty = () => {

    const [ propertyDetails, setPropertyDetails ] = useState()
    const router = useRouter()
    const { id } = router.query
    const [ propertyTitle, setPropertyTitle] = useState('')
    const [ propertyPrice, setPropertyPrice] = useState(0)
    const [ propertyRooms, setPropertyRooms] = useState(0)
    const [ rentFrequency, setRentFrequency] = useState('')
    const [ propertyBaths, setPropertyBaths] = useState(0)
    const [ propertyArea, setPropertyArea] = useState(0)
    const [ verified, setVerified ] = useState('')
    const [ formVisibility, setFormVisibility] = useState(false)
    const [ propertyID, setPropertyID] = useState('')

    useEffect(() => {
        console.log(id)
        fetchProperty()
    },[])

    const fetchProperty = async () => {
        const docRef = query(collection(db, "properties"), where('externalID', '==', id))
        const result = await getDocs(docRef)
        result.forEach((doc) => {
            // setPropertyDetails(doc.data())

            const temp = doc.data()
            setPropertyID(doc.id)
            setPropertyTitle(temp.title)
            setPropertyPrice(temp.price)
            setPropertyRooms(temp.rooms)
            setRentFrequency(temp.rentFrequency)
            setPropertyBaths(temp.baths)
            setPropertyArea(temp.area)
            setVerified(temp.isVerified)
            setFormVisibility(true)
        })
    }

    const preventDefault = f => e => {
        e.preventDefault()
        f(e)
      }

    const onSubmit = preventDefault( async () => {
        const docRef = doc(db, "properties", propertyID)
        await updateDoc(docRef, {
            title: propertyTitle,
            price: parseInt(propertyPrice, 10),
            rooms: parseInt(propertyRooms, 10),
            area: parseInt(millify(propertyArea), 10),
            rentFrequency: rentFrequency,
            baths: parseInt(propertyBaths, 10),
            isVerified: Boolean(verified)
        }).then(() => Router.push('/myproperties'))
    })

    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={6} rounded="md">
          {formVisibility && <form onSubmit={onSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel >Property Title</FormLabel>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  variant="filled"
                  onChange={(e) => setPropertyTitle(e.target.value)}
                  value={propertyTitle}
                />
              </FormControl>
              <FormControl>
                <FormLabel >Property Price</FormLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  variant="filled"
                  onChange={(e) => setPropertyPrice(e.target.value)}
                  value={propertyPrice}
                />
              </FormControl>
              <FormControl>
                <FormLabel >Number of Rooms</FormLabel>
                <Input
                  id="rooms"
                  name="rooms"
                  type="number"
                  variant="filled"
                  onChange={(e) => setPropertyRooms(e.target.value)}
                  value={propertyRooms}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rent Frequency</FormLabel>
                <Select placeholder='Select option' value={rentFrequency} variant="filled" onChange={(e) => setRentFrequency(e.target.value)}>
                    <option value='daily'>Daily</option>
                    <option value='weekly'>Weekly</option>
                    <option value='monthly'>Monthly</option>
                    <option value='yearly'>Yearly</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Number of Baths</FormLabel>
                <Select placeholder='Select option' value={propertyBaths} variant="filled" onChange={(e) => setPropertyBaths(e.target.value)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Area</FormLabel>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  variant="filled"
                  onChange={(e) => setPropertyArea(e.target.value)}
                  value={millify(propertyArea)}
                />
              </FormControl>
              <FormControl>
              <FormLabel>Verified?</FormLabel>
                <RadioGroup 
                onChange={setVerified} 
                value={verified.toString()}>
                    <Stack direction='row'>
                        <Radio value='true'>Yes</Radio>
                        <Radio value='false'>No</Radio>
                    </Stack>
                </RadioGroup>
              </FormControl>
              {/* <Checkbox
                id="rememberMe"
                name="rememberMe"
                onChange={formik.handleChange}
                isChecked={formik.values.rememberMe}
                colorScheme="purple"
              >
                Remember me?
              </Checkbox> */}
              <Button type="submit" colorScheme="purple" width="full">
                Login
              </Button>
            </VStack>
          </form>}
        </Box>
      </Flex>
    
    )

}
    


export default EditProperty