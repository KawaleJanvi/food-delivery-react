import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from "./store/ProgressTrackerContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
