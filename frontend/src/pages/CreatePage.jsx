import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "../store/product";

function CreatePage() {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();
  async function handleAddProduct(e) {
    const { success, message } = await createProduct(newProduct);
    // console.log(`Success: ${success} '\nMessage: ${message}`);
    if (!success) {
      return toast({
        title: "Error",
        description: message,
        status: "error",
        duration: "4000",
        position: "top",
        isClosable: "true",
      });
    }
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: "4000",
      // variant: "left-accent",
      position: "top",
      isClosable: "true",
    });
    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
  }

  return (
    <>
      <Container maxW="container.sm">
        <VStack spacing="8">
          <Heading as="h1" size="2xl" textAlign="center" mb="8">
            Create a New Product
          </Heading>
          <Box
            w="full"
            bg={useColorModeValue("white", "gray.800")}
            p="6"
            rounded="lg"
            shadow="md"
          >
            <VStack>
              <Input
                name="name"
                value={newProduct.name}
                placeholder="Product Name"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                name="Price"
                value={newProduct.price}
                placeholder="Product Price"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                name="Image URL"
                value={newProduct.image}
                placeholder="Product Image"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    image: e.target.value,
                  })
                }
              />
              <Button
                colorScheme="blue"
                width="full"
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
}

export default CreatePage;
