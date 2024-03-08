import InputBox from "./InputBox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos, patchTodo } from "../api/todos";

const TodoListPage = () => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo
  });

  const patchTodoMutation = useMutation({
    mutationFn: patchTodo
  });

  const { isLoading, isError, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 5 * 1000
  });

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (isError) {
    return <p>오류가 발생...</p>;
  }

  const deleteHandler = (id: string) => {
    deleteTodoMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["todos"]
        });
      }
    });
  };

  const patchHandler = (id: string, isDone: boolean) => {
    patchTodoMutation.mutate(
      { id, isDone },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["todos"]
          });
        }
      }
    );
  };

  return (
    <div>
      <InputBox />
      <span>working...</span>
      <div>
        {data?.map((card) => {
          return !card.isDone ? (
            <div key={card.id}>
              <span>{card.title}</span>
              <span>{card.content}</span>

              <button onClick={() => patchHandler(card.id, card.isDone)}>
                완료
              </button>
              <button onClick={() => deleteHandler(card.id)}>삭제</button>
            </div>
          ) : null;
        })}
        {/* mutation 적용 + invalidateQueries */}
      </div>
      <span>Done...</span>
      <div>
        {data?.map((card) => {
          return card.isDone ? (
            <div key={card.id}>
              <span>{card.title}</span>
              <span>{card.content}</span>

              <button onClick={() => patchHandler(card.id, card.isDone)}>
                취소
              </button>
              <button onClick={() => deleteHandler(card.id)}>삭제</button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default TodoListPage;
