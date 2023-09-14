import React from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import { paginationStyle } from "../../utils/styleConstants";
import { ProfilePaginationProps } from "../../typings/UtilitiesProps";

export default function ProfilePagination({
  ispageLoaded,
  totalPages,
  currentPage,
  handlePageChange,
}: ProfilePaginationProps) {
  //   const { ispageLoaded, totalPages, currentPage, handlePageChange } = props;
  return (
    <>
      <Pagination style={{ display: ispageLoaded ? "flex" : "none" }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
            style={{
              backgroundColor: index + 1 === currentPage ? "blue" : "#dad6d5",
              color: index + 1 === currentPage ? "#dad6d5" : "black",
              ...paginationStyle,
            }}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}
