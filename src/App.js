import RestaurantsCards from "./Components/Section/RestaurantsCard/RestaurantsCards";
import { Routes, Route } from "react-router-dom";
import DetailRestaurants from "./Components/Section/DetailRestaurants/DetailRestaurants";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RestaurantsCards />} />
        <Route path="/DetailsRestaurant" element={<DetailRestaurants />} />
      </Routes>
    </div>
  );
}

export default App;
