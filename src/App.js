import React, {useState,useEffect} from "react";
import './App.css'; 
import {BrowserRouter as Router} from 'react-router-dom';
// Importing components
import LoginForm from './components/LoginForm';
import Form from './components/Form';
import TodoList from './components/TodoList';


function App() {

  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filteredTodos,setFilteredTodos] = useState([]); 
  const [user,setUser]=useState({name:"",email:""});
  const [error,setError] = useState("");

  //Run once when app start
  useEffect(() => {
    getLocalTodos();
  }, []);
  //use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  },[todos,status]);
  
   //Functions
  const Login = details => {
    console.log(details);

    if ((details.name === null || details.name === "", details.email === null || details.email === "", details.password === null || details.password === "")){
       console.log("Details incorrect");
       setError("Please fill all the fields")
    }else{
    console.log("Logged in");
    setUser({
      name:details.name,
      email:details.email
    });
  }
}
  const Logout= () =>{
    setUser({name:"",email:""});
  }
 
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }; 
  //Save to local
  const saveLocalTodos = () =>{
      localStorage.setItem('todos',JSON.stringify(todos) );
    };
  const getLocalTodos = () =>{
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <Router>
    <div className="App">
      {(user.email !== "")?(
        <div className="welcome">
            <header>
            <h2>{user.name}'s list</h2>
          </header>
            <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />
            <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} /> 
            <div className="align-logout ">
            <button onClick={Logout} className="Logout">Logout</button>
            </div>
        </div>
        ):(
      <LoginForm Login={Login} error={error} />
     )}  
    </div>
    </Router>
  );
}

export default App;