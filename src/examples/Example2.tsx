import { useQuery } from "@tanstack/react-query";

/** Bad Example1 !! 단일 책임 원칙 (SRP, Single Responsibility Principle) 잘 못 지킨 예제 **/
// Case 1. 여러 기능이 한 컴포넌트에 들어있는 경우
interface Props {
  userId: number;
}

const Bookmarks = ({ userId }: Props) => {
  const { data } = useQuery(
    ["getBookmarks", userId],
    async (userId: number) => {
      const user = await fetch(`/user/bookmarks?${userId}`);
      return user;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <ul>
      {data.bookmarks.map((bookmark) => (
        <li key={bookmark.id}>{bookmark.name}</li>
      ))}
    </ul>
  );
};

/** Good Example1 !! 단일 책임 원칙 (SRP, Single Responsibility Principle) 잘 지킨 예제 **/
// Case 1. 컴포넌트에 존재하는 큰 덩어리 코드들을 각자에 역할에 따라 모듈화하여 분리
export const getUserBookmarks = async (userId: number) => {
  const user = await fetch(`/user/bookmarks?${userId}`);

  return user;
};

interface Props {
  userId: number;
}

const Bookmarks2 = ({ userId }: Props) => {
  const { data } = useQuery(
    ["getBookmarks", userId],
    () => getUserBookmarks(userId),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <ul>
      {data.bookmarks.map((bookmark) => (
        <li key={bookmark.id}>{bookmark.name}</li>
      ))}
    </ul>
  );
};
