import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Flex,
	Select,
	Button,
	Heading,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  
  import { useDispatch, useSelector } from "react-redux";
  import { filterData, getData } from "../Redux/actions";
  import  {EditTodoList}  from "./EditTodoList";
  import { useState } from "react";

  
  export default function TodoList() {
	const dispatch = useDispatch();
	const toast = useToast()
	let data = useSelector((store) => store.todos);
	useEffect(() => {
	  apiCall();
	  
	}, []);
	


	const [user, setuser] = useState({
		
		name: "",
		ano: "",
		bname: "",
		address1:"",
		address2:"",
		city:"",
		country:"",
		zip:"",
	  });

	  

	

	  function handleChange(e) {
			setuser({ ...user, [e.target.id]: e.target.value });
	
	  }


	    

	async function handleSubmit(e) {
		e.preventDefault();
		if(user.name == "" || user.ano==""|| user.bname=="" || user.address1=="" || user.address2=="" || user.city=="" || user.country=="" || user.zip==""){
			toast({
				title: "Please Fill Carefully",
				description: "We've Not allow todo fill the all data",
				status: "warning",
				duration: 9000,
				isClosable: true,
				position: "top",
			  });

		}else{
				// console.log(user)
				try{
					let res = await fetch('https://bankbackend-todo.onrender.com/todo',{
					  method: "POST",
					  headers: { "content-type": "application/json"},
					  body: JSON.stringify(user),
					});
					let data = await res.json();
					console.log(data)
				  }catch (e){
					// console.log(e)
				}
				toast({
					title: "Successfully Add Create Vendor",
					description: "We've created your Create Vendor.",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "top",
				  });
			}
			
			
		

	}

  
	async function apiCall() {
	  let res = await fetch("https://bankbackend-todo.onrender.com/todo");
	  res = await res.json();
	  dispatch(getData(res));
	}
	apiCall()

  
	async function handleDelete(id) {
	   await fetch(`https://bankbackend-todo.onrender.com/todo/${id}`, {
		method: "DELETE",
		headers: {
		  "Content-Type": "application/json",
		},
	  });
	  toast({
		title: "DELETE Successfully",
		description:`your are Deleted ${id} Vendor.`,
		status: "warning",
		duration: 9000,
		isClosable: true,
		position: "top",
	  });

	  apiCall();
	}

	

	return (
	  <Flex mt={10} w={"100vw"} alignItems={"center"} justifyContent="space-evenly">
	
		<Flex alignItems="center" justifyContent="center">
		  <FormControl boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} p={"2rem"}>
			<Heading m={5}>Create Vendor</Heading>
			<FormLabel mt="10px">Vendor Name</FormLabel>
			<Input type="text" placeholder="Vendor Name" id="name"  onChange={handleChange} />

			<FormLabel mt="10px">Bank Account No</FormLabel>
			<Input type="number" placeholder="Bank Account No" id="ano" onChange={handleChange} />

			<FormLabel mt="10px">Bank Name</FormLabel>
			<Input type="text" placeholder="Bank Name" id="bname" onChange={handleChange} />
  
			<FormLabel mt="10px">Address Line 1</FormLabel>
			<Input type="text" placeholder="Address Line 1" id="address1" onChange={handleChange} />
  
			<FormLabel mt="10px">Address Line 2</FormLabel>
			<Input type="text" placeholder="Address Line 2" id="address2" onChange={handleChange} />

			<FormLabel mt="10px">City</FormLabel>
			<Input type="text" placeholder="City" id="city" onChange={handleChange} />

			<FormLabel mt="10px">Country</FormLabel>
			<Input type="text" placeholder="Country" id="country" onChange={handleChange} />

			<FormLabel mt="10px">Zip Code</FormLabel>
			<Input type="number" placeholder="Zip Code" id="zip" onChange={handleChange} />

			<Button mt="15px" width="full" type="submit" color='white' colorScheme="teal" onClick={handleSubmit}>
			  SUBMIT
			</Button>
			<FormHelperText>Fill The Proper Details.</FormHelperText>
		  </FormControl>
		</Flex>
  
		<Flex mt={-150} flexDirection={"column"}>
		  <Heading m={"2rem"}>Vendor LIST</Heading>
		  <TableContainer
			boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
			pt={"1rem"}
		  >
			<Table variant="striped">
			  <TableCaption></TableCaption>
			  <Thead>
				<Tr>
				  <Th>Id</Th>
				  <Th>Vendor Name</Th>
				  <Th>Account No</Th>
				  <Th>Bank Name</Th>
				  <Th>Address 1</Th>
				  <Th>Address 2</Th>
				  <Th>City</Th>
				  <Th>Country</Th>
				  <Th>Code</Th>
				  <Th>Edit</Th>
				  <Th>Delete</Th>
				</Tr>
			  </Thead>
			  <Tbody>
				{data.map((el, index) => {
				  return (
					<Tr key={index + 1}>
					  <Td>{el.id}</Td>
					  <Td>{el.name}</Td>
					  <Td>{el.ano}</Td>
					  <Td>{el.bname}</Td>
					  <Td>{el.address1}</Td>
					  <Td>{el.address2}</Td>
					  <Td>{el.city}</Td>
					  <Td>{el.country}</Td>
					  <Td>{el.zip}</Td>
					  <Td>
						<EditTodoList el={el} apiCall={apiCall} toast={toast} />
					  </Td>
					  <Td>
						<Button
						  variant={"solid"}
						  colorScheme={"red"}
						  onClick={() => {
							handleDelete(el.id);
						  }}
						>
						  Delete
						</Button>
					  </Td>
					</Tr>
				  );
				})}
			  </Tbody>
			</Table>
		  </TableContainer>
		</Flex>
	  </Flex>
	);
  }
  