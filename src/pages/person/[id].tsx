import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface IDetail {
  id: string;
  country: string;
  name: string;
  industries: string[];
  financialAssets: {
    ticker: string;
    numberOfShares: number;
    exerciseOptionPrice: number;
  }[];
  bio: string;
  squareImage: string;
  netWorth: number;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin-left: 30px;
  }
`;

const Info = styled.div`
  margin: 20px;
  img {
    width: 300px;
    height: 300px;
  }
  div {
    margin: 10px;
    padding: 10px;
  }
`;

const Stock = styled.div`
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  > div {
    border: 1px solid white;
    border-radius: 10px;
    width: 20%;
    padding: 10px;
    margin: 10px;
  }
`;

export default function Detail() {
  const [data, setData] = useState<IDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://billions-api.nomadcoders.workers.dev/person/${router.query.id}`
      );
      const json = await res.json();
      setData(json);
      setLoading(false);
      console.log(data);
    })();
  }, [data, router.query.id]);

  return (
    <Main>
      <Info>
        <img src={data?.squareImage} alt={data?.name}></img>
        <div>{data?.name}</div>
        <div>Net Worth: {data?.netWorth}</div>
        <div>Country: {data?.country}</div>
        <div>Industry: {data?.industries}</div>
        <div>{data?.bio}</div>
      </Info>
      <span>Financial Assets</span>
      <Stock>
        {data?.financialAssets.map((el, index) => {
          return (
            <div key={index}>
              <div>Ticker: {el.ticker}</div>
              <div>Shares: {el.numberOfShares}</div>
              <div>Exercise Price: {el?.exerciseOptionPrice}</div>
            </div>
          );
        })}
      </Stock>
    </Main>
  );
}
