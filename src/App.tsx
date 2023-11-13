import AddTodo from "./components/AddTodo";
import Status from "./components/Status";
import Theme from "./components/Theme";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="page bg-contain dark:bg-[url('./assets/bg-mobile-dark.jpg')] dark:md:bg-[url('./assets/bg-desktop-dark.jpg')] md:bg-[length:100%_275px] flex justify-center  bg-[url('./assets/bg-mobile-light.jpg')] md:bg-[url('./assets/bg-desktop-light.jpg')] bg-no-repeat">
      <div className="flex justify-center flex-col">
        <Theme />
        <AddTodo />
        <TodoList />
        <Status />
        <p className="text-[#9495A5] text-center text-sm md:text-base font-normal leading-normal tracking-[-0.194px] mt-10">Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

export default App;
