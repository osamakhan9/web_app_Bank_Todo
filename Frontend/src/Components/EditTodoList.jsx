

import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
//   const toast = useToast()

export function EditTodoList({ el, apiCall, toast }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
		let res = await fetch(`https://bankbackend-todo.onrender.com/todo/${el.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		res = await res.json();

		toast({
			title: "Successfully Update",
			description: "We've Update your Vendor.",
			status: "success",
			duration: 8000,
			isClosable: true,
			position: "top",
		});

		apiCall();
	}

	return (
		<>


			<Button onClick={onOpen} variant={"solid"} colorScheme={"teal"}>
				Edit
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update List</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel mt="10px">Choose and Update</FormLabel>
							<FormLabel mt="10px">Vendor Name</FormLabel>
							<Input type="text" placeholder="Vendor Name" id="name" onChange={handleChange} />

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
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button onClick={handleSubmit}>Update</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}