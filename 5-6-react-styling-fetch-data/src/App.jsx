import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import UserModal from "./components/UserModal";
import "./index.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // TODO 2.1 — FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // TODO 2.2 — FILTER USERS BY NAME
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Modal handlers
  function handleUserClick(user) {
    setSelectedUser(user);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setSelectedUser(null);
  }

  return (
    <div className="app">
      {/* TODO 1.1: Header */}
      <header className="bg-primary text-white py-3 mb-4 shadow">
        <Container>
          <h1 className="h2 mb-0">User Management Dashboard</h1>
          <p className="mb-0 opacity-75">Search users and view details</p>
        </Container>
      </header>

      <Container>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <UserList users={filteredUsers} onUserClick={handleUserClick} />
        )}

        <UserModal show={showModal} user={selectedUser} onHide={handleCloseModal} />
      </Container>

      {/* TODO 1.1: Footer */}
      <footer className="bg-light py-4 mt-5">
        <Container>
          <small className="text-muted">SWE 363 — React Lab</small>
        </Container>
      </footer>
    </div>
  );
}