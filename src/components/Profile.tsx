import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import HandlingProfileSection from "./Profile/ProfileHandlingSection";
import { HandleProfileItemsSection } from "./Profile/ProfileHandlingItemsSection";

export default function Profile() {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Card>
            <HandleProfileItemsSection />
          </Card>
        </Col>
        <Col sm={4}>
          <Card id="card-profile-handler">
            <HandlingProfileSection />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
