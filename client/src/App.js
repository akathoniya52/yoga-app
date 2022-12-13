import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbaar from './components/Navbaar';
import Register from './components/Register';
import {Switch,Route} from "react-router-dom"
import Payment from './components/Payment'





function App() {
  return (
   <>
    <Navbaar />
    <Switch>
      <Route exact path="/" component={Register} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/payment" component={Payment} />
      {/* <Route exact path="/view/:id" component={Details} /> */}
    </Switch>
   
   </>
  );
}

export default App;






