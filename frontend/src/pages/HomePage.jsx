import React, { useEffect } from "react";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <>
      <Container py="12" maxW="container.xl">
        <VStack spacing={8}>
          <Text
            fontSize={"30"}
            fontWeight="bold"
            bgClip="text"
            textAlign="center"
            bgGradient="linear(to-r, cyan.400, blue.500)"
          >
            Current Products 🚀
          </Text>
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing="10"
            width="full"
          >
            {products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </SimpleGrid>
          {products.length === 0 && (
            <Text
              fontSize="xl"
              textAlign="center"
              fontWeight="bold"
              color="gray.500"
            >
              No prodcut found{" "}
              <Link to={"/create"}>
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Add a product
                </Text>
              </Link>
            </Text>
          )}
        </VStack>
      </Container>
    </>
  );
}

export default HomePage;
