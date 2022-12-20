import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ChakraProvider,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
function App() {
  const [users, setUsers] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [change, setChange] = useState(false)
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [position, setPosition] = useState("")
  const [idPaddingUpdate,setIdPaddingUpdate] = useState("")
  const navigate = useNavigate();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure()
  const resetForm = () => {
    setFname("")
    setLname("")
    setEmail("")
    setPosition("")
  }
  const authen = () => {
    const token = localStorage.getItem("token")
    axios.post('https://upset-seal-scarf.cyclic.app/authen',{},{
      headers: {
        'Authorization': "Bearer "+token
      }
    }).then((res) => {
      if(res.data.err){
        Swal.fire({
          icon:'error',
          title:'Token invalid!',
          timer:1000
        }).then(() => navigate('/signin'))
      } 
    })
  }

  useEffect(() => {
    axios.get("https://upset-seal-scarf.cyclic.app/users").then((res) => {
      setUsers(res.data.results)
    })
    authen()
  }, [change])
  
  const handleDel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("https://upset-seal-scarf.cyclic.app/delete", { id: id })
          .then((res) => {
            // console.log(res.data.results)
            if (!res.data.err) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success")
              change ? setChange(false) : setChange(true)
            }
          })
      }
    })
  }
  const handleAdd = (e) => {
    e.preventDefault()
    axios
      .post("https://upset-seal-scarf.cyclic.app/add", {
        fname: fname,
        lname: lname,
        email: email,
        position: position,
      })
      .then((res) => {
        // console.log(res.data)
        if (!res.data.err) {
          Swal.fire({
            icon: "success",
            title: "Inserted successfully!",
            timer: 1500,
          })
          resetForm()
          onClose()
          change ? setChange(false) : setChange(true)
        }
      })
  }
  const getPerUser = (id) => {
    axios
      .post("https://upset-seal-scarf.cyclic.app/getperuser", { id: id })
      .then((res) => {
        // console.log(res.data.results)
        setFname(res.data.results[0].fname)
        setLname(res.data.results[0].lname)
        setEmail(res.data.results[0].email)
        setPosition(res.data.results[0].position_)
        setIdPaddingUpdate(res.data.results[0].id)
      })
    onUpdateOpen()
  }
  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    axios.post('https://upset-seal-scarf.cyclic.app/update',{
      id:idPaddingUpdate,
      fname:fname,
      lname:lname,
      email:email,
      position:position
    }).then((res) => {
      if(!res.data.err){
        Swal.fire({
          icon: "success",
          title: "Updated successfully!",
          timer: 1500,
        })
        resetForm()
        onUpdateClose()
        change ? setChange(false) : setChange(true)
      }
    })
  }
  return (
    <div>
      <ChakraProvider>
        <Modal isOpen={isUpdateOpen} onClose={onUpdateClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your data</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmitUpdate}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Input
                    ref={initialRef}
                    value={fname}
                    placeholder="First name"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    placeholder="Last name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={email}
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Position</FormLabel>
                  <Input
                    value={position}
                    placeholder="Position"
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onUpdateClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" mr={3} type="submit">
                  Update
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleAdd}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>First name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="First name"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    placeholder="Last name"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Position</FormLabel>
                  <Input
                    placeholder="Position"
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        <div className="container">
          <Button onClick={onOpen} className="mt-2">
            ADD
          </Button>
          <Text fontSize="5xl" className="text-center">
            Information Users
          </Text>

          <hr />
          <div className="row">
            <div className="col">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table className="table table-hover text-center table-scroll">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Postion</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((val) => {
                    return (
                      <tr key={val.id}>
                        <td className="align-middle">
                          {val.fname} {val.lname}
                        </td>
                        <td className="align-middle">{val.email}</td>
                        <td className="align-middle">{val.position_}</td>
                        <td className="align-middle">
                          <Button
                            colorScheme="teal"
                            variant="solid"
                            size="sm"
                            value={val.id}
                            onClick={(e) => {
                              getPerUser(e.target.value)
                            }}
                            className="me-2"
                          >
                            EDIT
                          </Button>
                          <Button
                            colorScheme="red"
                            variant="solid"
                            size="sm"
                            value={val.id}
                            onClick={(e) => {
                              handleDel(e.target.value)
                            }}
                          >
                            DEL
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </ChakraProvider>
    </div>
  )
}

export default App
