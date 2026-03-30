import React from "react";
import { Form, InputGroup } from "react-bootstrap";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    // TODO 1.2: Set wrapper div className
    <div className="mb-4">
      <InputGroup>
        <InputGroup.Text>Search</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </InputGroup>
    </div>
  );
}

export default SearchBar;