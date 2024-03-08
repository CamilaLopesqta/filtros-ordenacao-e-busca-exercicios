import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [type, setType] = useState("");
  const [orderOption, setOrderOption] = useState("");

  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        type={type}
        setType={setType}
        orderOption={orderOption}
        setOrderOption={setOrderOption}
      />
      <CardsContainer>
        {pokemons
          .filter((pokemon) => {
            return idFilter ? pokemon.id.includes(idFilter) : pokemon;
          })
          .filter((pokemon) => {
            return pokemon.name.english
              .toLowerCase()
              .includes(pesquisa.toLowerCase());
          })
          .filter((pokemon) => {
            if (type !== "") {
              return pokemon.type.includes(type);
            } else {
              return pokemon;
            }
          })
          // .sort((a, b) => {
          //   if(orderOption === "asc"){return a.name.english.localeCompare(b.name.english);
          //   }else if(orderOption === "desc"){return b.name.english.localeCompare(a.name.english);
          //   }
          // })
          .sort((a, b) => {
            if(orderOption === "asc"){return a.name.english > b.name.english ? 1 : -1}
            if(orderOption === "desc"){return a.name.english < b.name.english ? 1 : -1}
          })
          .map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
