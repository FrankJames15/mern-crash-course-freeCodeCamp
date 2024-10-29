import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";

function ProductCard(props) {
  const { product, ...rest } = props;
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();

  async function handleDeleteProduct(id) {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      return toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  }
  async function handleUpdateProduct(id, updatedProduct) {
    const { success, message } = await updateProduct(id, updatedProduct);

    onClose();
    if (!success) {
      return toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  }
  return (
    <>
      <Box
        bg={bg}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{
          transform: "translateY(-5x)",
          shadow: "xl",
        }}
        {...rest}
      >
        <Image
          src={product?.image}
          alt={product?.name}
          h={48}
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <Heading as="h3" size="md" mb={2}>
            {product?.name}
          </Heading>
          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${product?.price}
          </Text>
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <Input
                      placeholder="Product Name"
                      name="name"
                      value={updatedProduct.name}
                      onChange={(e) => {
                        setUpdatedProduct({
                          ...updatedProduct,
                          name: e.target.value,
                        });
                      }}
                    />
                    <Input
                      placeholder="Product Price"
                      name="price"
                      value={updatedProduct.price}
                      onChange={(e) => {
                        setUpdatedProduct({
                          ...updatedProduct,
                          price: e.target.value,
                        });
                      }}
                    />
                    <Input
                      placeholder="Product Image"
                      name="image"
                      value={updatedProduct.image}
                      onChange={(e) => {
                        setUpdatedProduct({
                          ...updatedProduct,
                          image: e.target.value,
                        });
                      }}
                    />
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      handleUpdateProduct(product._id, updatedProduct);
                    }}
                  >
                    Update
                  </Button>
                  <Button onClick={onClose} variant="ghost">
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => {
                handleDeleteProduct(product._id);
              }}
            />
          </HStack>
        </Box>
      </Box>
    </>
  );
}

export default ProductCard;
