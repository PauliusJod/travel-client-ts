import React, { useEffect, useState, useRef, useMemo } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { GetAllOwnedItemsHandler } from "../../services/profileservice";
import { IGetRoute } from "../../typings/RouteProps";
import { PrivateRouteView } from "./ProfileRouteView";
import { containerStyle, cardStyle, defaultImage, Loadera } from "../../utils/styleConstants";
import ProfilePagination from "./ProfilePagination";
interface ChildComponentProps {
  sendDataToParent: (data: IGetRoute | undefined) => void;
  sendDataBack: IGetRoute | undefined;
}
const ITEMS_PER_PAGE = 9;
export function HandleProfileItemsSection({ sendDataToParent, sendDataBack }: ChildComponentProps) {
  const [ispageLoaded, setPageLoad] = useState<boolean>(false);
  const [data, setData] = useState<IGetRoute[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [routeViewData, setRouteViewData] = useState<IGetRoute | undefined>();
  const [aaa, setaaa] = useState<string>("");
  useEffect(() => {
    getAllOwnedItems();
  }, []);
  useEffect(() => {
    setPageLoad(true);
    setRouteViewData(sendDataBack);
  }, [sendDataBack]);

  useEffect(() => {
    sendDataToParent(routeViewData);
  }, [routeViewData]);
  const getAllOwnedItems = async () => {
    setPageLoad(false);
    const response = await GetAllOwnedItemsHandler();
    if (response === null) {
      return;
    }
    if (response !== null) {
      setData(response);
      setTimeout(() => {
        setPageLoad(true);
      }, 1000);
      return;
    }
  };
  const handleRouteOpening = (item: IGetRoute | undefined, index: number) => {
    setRouteViewData(item);
  };
  /* Pagination */
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const memoizedSetaaa = useMemo(() => setaaa, []);
  return (
    <>
      {ispageLoaded ? <></> : <Loadera />}
      <Container
        fluid
        // style={{ display: routeViewData === undefined ? "block" : "none", ...containerStyle }}
      >
        <Button onClick={() => memoizedSetaaa("sss")}>sss</Button>
        <Button onClick={() => memoizedSetaaa("fff")}>sss</Button>
        <p>sdssdds</p>
        <Row xs={1} sm={2} md={3} style={{ display: ispageLoaded ? "flex" : "none" }}>
          {currentItems.length !== 0 ? (
            currentItems.map((item, index) => (
              <Col key={index} style={{ paddingTop: index % 2 ? "15px" : "0px" }}>
                <Card style={cardStyle}>
                  {item.rImagesUrl.length !== 0 &&
                  item.rImagesUrl[0].rImagesUrlLink !== undefined ? (
                    <Card.Img
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                      src={item.rImagesUrl[0].rImagesUrlLink}
                      alt={`Image ${index + 1}`}
                      onClick={() => handleRouteOpening(item, index)}
                    />
                  ) : (
                    <Card.Img
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                      src={defaultImage}
                      alt={`Image ${index + 1}`}
                      onClick={() => handleRouteOpening(item, index)}
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

        <ProfilePagination
          ispageLoaded={ispageLoaded}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
