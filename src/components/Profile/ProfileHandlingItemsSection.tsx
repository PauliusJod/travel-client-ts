import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import { GetAllOwnedItemsHandler } from "../../services/profileservice";
import { IGetRoute } from "../../typings/RouteProps";

const ITEMS_PER_PAGE = 9;
export function HandleProfileItemsSection() {
  const [ispageLoaded, setPageLoad] = useState<boolean>(false);
  const [data, setData] = useState<IGetRoute[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const getAllOwnedItems = async () => {
    setPageLoad(false);
    const response = await GetAllOwnedItemsHandler();
    if (response === null) {
      return;
    }
    if (response !== null) {
      console.log(response);
      setData(response);
      setTimeout(() => {
        setPageLoad(true);
      }, 1500);
      return;
    }
    return;
  };
  useEffect(() => {
    getAllOwnedItems();
  }, []);
  return (
    <>
      {ispageLoaded ? (
        <></>
      ) : (
        <div className="d-flex justify-content-md-center">
          <div className="spinner"></div>
        </div>
      )}
      <Container
        fluid
        style={{
          backgroundImage: `url("http://localhost:3000/static/media/background-image-light-gray.b9c14666961e2f8fac7f.jpg")`, // Replace with your image path
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Row
          xs={1}
          sm={2}
          md={3}
          style={{ display: ispageLoaded ? "flex" : "none" }}
        >
          {currentItems.length !== 0 ? (
            currentItems.map((item, index) => (
              <Col key={index}>
                <Card
                  style={{
                    backgroundImage: `url("http://localhost:3000/static/media/background-image-sandy.3f7a4591118c0fba6c30.jpg")`, // Replace with your image path
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  {item.rImagesUrl.length !== 0 &&
                  item.rImagesUrl[0].rImagesUrlLink !== undefined ? (
                    <Card.Img
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                      src={item.rImagesUrl[0].rImagesUrlLink}
                      alt={`Image ${index + 1}`}
                    />
                  ) : (
                    <Card.Img
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                      src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                      alt={`Image ${index + 1}`}
                    />
                  )}

                  <Card.Body>
                    <Card.Text>Image {index + 1}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <></>
          )}
        </Row>
        <Pagination style={{ display: ispageLoaded ? "flex" : "none" }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </>
  );
}
