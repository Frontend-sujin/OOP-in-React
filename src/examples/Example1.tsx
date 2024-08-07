/** Bad Example 1!! 추상화 잘 못 지킨 예제 **/

import { useEffect, useState } from "react";

// Case 1. 여러 컴포넌트들의 공통 기능을 추출하지 않은 경우
const ConfigButton = () => {
  return (
    <button
      onClick={() => {
        /** 확인 로직 */
      }}
    >
      확인하기
    </button>
  );
};

const LoginButton = () => {
  return (
    <button
      onClick={() => {
        /** 로그인 로직 */
      }}
    >
      로그인하기
    </button>
  );
};

/** Good Example 1!! 추상화 잘 지킨 예제 **/
// Case 1. 여러 컴포넌트들의 공통 기능을 추출하여 추상화된 컴포넌트 만든 경우
interface Props {
  type: "submit" | "button" | "reset";
  onClick: () => void;
  children: React.ReactNode;
}

// "버튼"이라는 공통 기능을 추출한 추상화 컴포넌트
const Button = ({ type = "button", onClick, children, ...props }: Props) => {
  return (
    <button type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// 위의 추상화된 "버튼" 컴포넌트를 합성하여 사용한 "주문 버튼" 컴포넌트
const OrderButton = () => {
  return (
    <Button
      type="submit"
      onClick={() => {
        alert("주문 완료되었습니다!");
      }}
    >
      주문하기
    </Button>
  );
};

/** Bad Example 2!! 추상화 잘 못 지킨 예제 **/
// Case 2. 비즈니스 로직과 UI 로직이 혼재되어 있어 재사용성이 낮고 유지보수하기 어려운 경우
const BeerList = () => {
  const [beerList, setBeerList] = useState([]);

  useEffect(() => {
    const getBeerList = async () => {
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      const beerList = await response.json();
      setBeerList(beerList);
    };

    getBeerList();
  }, []);

  return (
    <>
      {beerList.map((beer: { name: string; price: number }) => (
        <ul>
          <li>{beer.name}</li>
          <li>{beer.price}</li>
        </ul>
      ))}
    </>
  );
};

/** Good Example 2!! 추상화 잘 지킨 예제 **/
// Case 2. 비즈니스 로직과 UI 로직 분리
const useGetBeerList = () => {
  const [beerList, setBeerList] = useState([]);

  useEffect(() => {
    const getBeerList = async () => {
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      const beerList = await response.json();
      setBeerList(beerList);
    };

    getBeerList();
  }, []);

  return { beerList };
};

const ShowBeerList = () => {
  const { beerList } = useGetBeerList();

  return (
    <>
      {beerList.map((beer: { name: string; price: number }) => {
        return (
          <ul>
            <li>{beer.name}</li>
            <li>{beer.price}</li>
          </ul>
        );
      })}
    </>
  );
};
