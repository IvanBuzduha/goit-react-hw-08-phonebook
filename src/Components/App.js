import Main from "./Main/Main";
import Header from "./Navigation/Header";

// import Phonebook from "./Phonebook/Phonebook";

const App = () => (
  <>
    <div className="relative mx-auto max-w-md px-8 py-12 bg-white border-0 shadow-lg sm:rounded-3xl ">
      <Header />
      <Main />
      {/* <Phonebook /> */}
    </div>
  </>
);
export default App;
