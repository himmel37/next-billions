import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface IData {
  id: string;
  industries: [];
  name: string;
  netWorth: number;
  squareImage: string;
}

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  margin: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Person = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: gray;
  width: 20%;
  height: 20%;
  margin: 10px;
  div {
    display: flex;
    flex-direction: column;
    div {
      padding: 5px;
      margin: 5px;
    }
  }
`;

export default function Home() {
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://billions-api.nomadcoders.workers.dev");
      const json = await res.json();
      setData(json.slice(0, 100));
    })();
  }, []);

  return (
    <Main>
      {data.map((el) => {
        return (
          <Person key={el.id}>
            <Link href={`/person/${el.id}`}>
              <li key={el.id}>
                <img src={el.squareImage} alt={el.name}></img>
                <div>
                  <div>{el.name}</div>
                  <div>
                    {el.netWorth} / {el.industries}
                  </div>
                </div>
              </li>
            </Link>
          </Person>
        );
      })}
    </Main>
  );
}
