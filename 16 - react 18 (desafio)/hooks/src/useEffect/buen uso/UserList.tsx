import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setUsers(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
