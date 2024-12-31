import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Card, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((response) => setPokemonList(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1 className="text-center my-4">Pokémon Explorer</h1>
      <Form.Control
        type="text"
        placeholder="Search Pokémon"
        className="mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Row>
        {filteredPokemon.map((pokemon) => (
          <Col key={pokemon.name} md={4} className="mb-4">
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function PokemonCard({ pokemon }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((response) => setDetails(response.data))
      .catch((error) => console.error(error));
  }, [pokemon.url]);

  const handleFavorite = () => {
    if (!details) return;
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    if (!existingFavorites.some((fav) => fav.name === details.name)) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...existingFavorites, details])
      );
      alert(`${details.name} added to favorites!`);
    } else {
      alert(`${details.name} is already in favorites.`);
    }
  };

  if (!details) return null;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={details.sprites.front_default}
        alt={details.name}
      />
      <Card.Body>
        <Card.Title className="text-center text-capitalize">
          {details.name}
        </Card.Title>
        <div className="d-flex justify-content-between">
          <Link to={`/pokemon/${details.name}`}>
            <Button variant="primary">View Details</Button>
          </Link>
          <Button variant="warning" onClick={handleFavorite}>
            Favorite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HomePage;
