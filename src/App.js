import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Task from "./Task";
import Todo from "./artifacts/contracts/Todo.sol/Todo.json";

const CONTRACT_ADDRESS = "0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00";
// npx run hardhat scripts/deploy.js --network localhost

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (typeof window.ethereum !== "undefined" && !!task) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, Todo.abi, signer);
      try {
        const tx1 = await contract.addTask(task);
        await tx1.wait();
        getTasks();
        setTask("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTasks = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Todo.abi,
        provider
      );
      try {
        const res = await contract.getAllTasks();
        setList(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, Todo.abi, signer);
      try {
        const tx = await contract.deleteTask(id.toNumber());
        await tx.wait();
        getTasks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleComplete = async (id, isCompleted) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, Todo.abi, signer);
      try {
        const tx = await contract.markCompleted(id.toNumber(), isCompleted);
        await tx.wait();
        getTasks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div>Todo</div>
      <input value={task} onChange={(event) => setTask(event.target.value)} />
      <button onClick={addTask}>AddTask</button>
      {list.map((task, index) => (
        <Task
          key={index}
          task={task}
          handleComplete={handleComplete}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}

export default App;
