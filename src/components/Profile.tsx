import React, { useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import HandlingProfileSection from "./Profile/ProfileHandlingSection";
import { HandleProfileItemsSection } from "./Profile/ProfileHandlingItemsSection";
import { IGetRoute } from "../typings/RouteProps";

/*
Do not update while have same routes
*/
export default function Profile() {
  const [routeViewData, setRouteViewData] = useState<IGetRoute | undefined>(undefined);
  const [aaa, setaaa] = useState<string>("");
  const pullItem = (item: IGetRoute | undefined) => {
    setRouteViewData(item);
  };
  return (
    <>
      <Container style={{ display: routeViewData ? "none" : "block" }}>
        <Row>
          <Col sm={8}>
            <Card
              style={{
                background: "transparent",
                border: "none",
              }}
            >
              <HandleProfileItemsSection sendDataToParent={pullItem} sendDataBack={routeViewData} />
            </Card>
          </Col>
          <Col sm={4}>
            <Card id="card-profile-handler">
              <HandlingProfileSection />
            </Card>
          </Col>
        </Row>
      </Container>
      <Container style={{ display: routeViewData ? "block" : "none" }}>
        <Button onClick={() => setRouteViewData(undefined)}>sss</Button>
        <Card>
          <Row>
            <Col>{routeViewData?.rName}</Col>
            <Col>{routeViewData?.rCountry}</Col>
            <Col>{routeViewData?.rTripCost}</Col>
            <Col>{routeViewData?.rOrigin}</Col>
            <Col>{routeViewData?.rDestination}</Col>
            <Col>{routeViewData?.rIsPublished}</Col>
            <Col>{routeViewData?.rRating}</Col>
          </Row>
          <Button onClick={() => setaaa("sss")}>sss</Button>
          <Button onClick={() => setaaa("fff")}>sss</Button>
        </Card>
      </Container>
    </>
  );
}
