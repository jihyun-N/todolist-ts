import React, { useState } from "react";
import { addTodo, getTodos } from "../api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 리액트 쿼리(tanstack query) v3까지는 리액트쿼리 -> v4부터는 탠스택 쿼리
// 3개
// 1) useQuery : 데이터를 가지고 오는 것
// 2) useMutation : 데이터를 입력, 수정, 삭제 하는 것
// 3) invalidateQueries : 데이터 가지고 온 것을 최신화 시키는 것
// 흐름 : 맨 처음 데이터 100개를 가지고 와요(useQuery)
// => 사용자가 1개를 더 입력해요(useMutation) => 그럼 이제는 100개가 아니라 101개에요!(invalidateQueries)
const InputBox = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // STEP1) 뮤테이션 만들기
  const addTodoMutation = useMutation({
    mutationFn: addTodo
  });

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onSubmitHandler = () => {
    // 발동 확인했던 그곳!!
    addTodoMutation.mutate(
      {
        id: crypto.randomUUID(),
        //내장객체
        title,
        content,
        isDone: false
      },
      {
        onSuccess: () => {
          alert("성공적으로 데이터가 입력되었습니다.");

          // invalidateQueries
          queryClient.invalidateQueries({
            queryKey: ["todos"]
          });
        }
      }
    ); // Todos 타입으로 넣어주면 끝!
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        <label>
          제목 : <input onChange={onChangeTitle} value={title} />
        </label>
        <label>
          내용 : <input onChange={onChangeContent} value={content} />
        </label>

        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default InputBox;
