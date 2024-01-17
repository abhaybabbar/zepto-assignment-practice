import { useEffect, useState, useRef } from "react";
import userDataArr from "./helper";
import { MdDelete } from "react-icons/md";

function App() {
  return (
    <div className="p-5 flex flex-col gap-5 justify-center items-center">
      <p className="text-3xl font-bold underline">Pick Users</p>
      <Input />
    </div>
  );
}

function Input() {
  const [userData, setUserData] = useState(userDataArr);
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isInputFocused) {
      const filteredData = userData.filter((user, index) => {
        return (
          (user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())) &&
          !selectedUsers.includes(user)
        );
      });
      setFilteredUserData(filteredData);
      console.log(filteredData);
    }
  }, [search, isInputFocused, selectedUsers]);

  function addUser(e, user) {
    setSelectedUsers((prevSelected) => [...prevSelected, user]);
    setSearch("");
    e.preventDefault();
    inputRef.current.focus();
  }

  function removeUser(userId) {
    setSelectedUsers((prevSelected) =>
      prevSelected.filter((user) => user.id !== userId)
    );
    inputRef.current.focus();
  }

  // to handle backspace when input is empty
  function handleKeyDown(e) {
    if (e.key === "Backspace" && search === "" && selectedUsers.length > 0) {
      // If backspace is pressed on an empty input and there are selected users,
      // select the last selected user
      e.preventDefault(); // Prevent the default backspace behavior (e.g., navigating back in the browser)
      setSelectedUsers((prevSelected) => prevSelected.slice(0, -1)); // Remove the last selected user
    }
  }

  return (
    <>
      <div className="flex flex-wrap w-5/6 border-b-2 border-purple-800 gap-2">
        <div className="flex flex-wrap gap-2 mb-1">
          {selectedUsers.map((user) => (
            <span
              key={user.id}
              className="flex justify-between gap-4 items-center bg-gray-300 px-2 py-1 rounded-lg"
            >
              <p>{user.name}</p>
              <button onClick={() => removeUser(user.id)}>
                <MdDelete />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          ref={inputRef}
          placeholder="Add new user..."
          className="focus:outline-none"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isInputFocused && (
        <div className="h-auto max-h-56 overflow-auto w-1/2 shadow-2xl bg-slate-200">
          <ul>
            {filteredUserData.map((user) => (
              <li
                key={user.id}
                className="flex justify-between p-2 cursor-pointer hover:bg-white"
                onMouseDown={(e) => addUser(e, user)}
              >
                <p className="font-semibold">{user.name}</p>
                <p>{user.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
