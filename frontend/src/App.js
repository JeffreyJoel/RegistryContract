import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import contractABI from "./abi.json";

function App() {
  const [age, setAge] = useState();
  const [name, setName] = useState();
  const [details, setDetails] = useState([]);
  const contractAddress = "0x84Fc3a4020AEc71fD53E2D4312AA279F5271393D";

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  useEffect(() => {
    async function getDetails() {
      if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        //  console.log(contract.getDeployedCode());

        try {
          const transaction = await contract.getEntityDetails();
          console.log(transaction.age);
          setDetails(transaction);
          // setRetrievedMessage(transaction);
          console.log("details gotten");
        } catch (err) {
          console.error("Error:", err);
        }
      }
    }
    getDetails();
  }, []);

  async function updateName() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      //  console.log(contract.getDeployedCode());

      try {
        const transaction = await contract.updateName(name);
        console.log(transaction);
        // setRetrievedMessage(transaction);
        console.log("name updated");
        window.location.reload()
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  async function updateAge() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      //  console.log(contract.getDeployedCode());

      try {
        const transaction = await contract.updateAge(age);
        console.log(transaction);
        // setDetails(transaction);
        // setRetrievedMessage(transaction);
        console.log("age updated");
        window.location.reload()
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />{" "}
          <button
            onClick={() => {
              updateName();
            }}
          >
            Update Name
          </button>
        </div>

        <div>
          {" "}
          <input
            type="number"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />{" "}
          <button
            onClick={() => {
              updateAge();
            }}
          >
            Update Age
          </button>
        </div>

        {/* <button
          onClick={() => {
            getDetails();
          }}
        >
          Get Details
        </button> */}

        {details && (
          <div>
            <p>Name: {details.name}</p>
            <p>Age: {details?.age?.toString()}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
