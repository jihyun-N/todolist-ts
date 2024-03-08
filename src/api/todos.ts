import axios from "axios";

type Todos = { id: string; title: string; content: string; isDone: boolean };

const getTodos = async (): Promise<Todos[]> => {
  const data = await axios
    .get(`${process.env.REACT_APP_SERVER_URL}`)
    .then((response) => response.data);
  return data;
};

const addTodo = async (newTodo: Todos) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}`, newTodo);
};

const deleteTodo = async (id: string) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/${id}`);
};

const patchTodo = async ({ id, isDone }: { id: string; isDone: boolean }) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/${id}`, {
    isDone: !isDone
  });
};
export { getTodos, addTodo, deleteTodo, patchTodo };
