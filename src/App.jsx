import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from './store/CartContext.jsx';
import { ProgressTrackerContextProvider } from "./store/ProgressTrackerContext.jsx";

function App() {
  return (
    <ProgressTrackerContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
      </CartContextProvider>
    </ProgressTrackerContextProvider>
  );
}

export default App;
