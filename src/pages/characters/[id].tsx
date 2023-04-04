import { baseObj } from "@/common/constance";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateSinglepageData } from "../../../redux/reducers/actorsSlice";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function SingleCharacters() {
  const dispatch = useAppDispatch();

  //select data from store
  const data = useAppSelector((state) => state.actors.singlePageData);

  //get route params
  const router = useRouter().query.id;

  //fetch and dispatch data when we have params
  useEffect(() => {
    if (!router) {
      return;
    }
    fetch(`https://rickandmortyapi.com/api/character/${router}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateSinglepageData(data));
      })
      .catch(() => {
        updateSinglepageData(baseObj.singlePageData);
      });
  }, [router]);

  //if this was a real project i use a seprate State for loading
  if (data.id == 0) {
    return <>loading</>;
  }
  return (
    <div>
      <img className="suspend-img" src={data.image} alt="" />
      <div className="single-char-container">
        <div className="character-container primary-bg mt15vh">
          <div className="profile-box">
            <img src={data.image} alt="" />
            <div className="profile-box-subdata d-flex-column">
              <h3>{data.name}</h3>
              <span>
                {data.status}-{data.species}
              </span>
              <div>
                <span className="section-titles">Last known location:</span>
                <span>{data.location.name}</span>
              </div>
              <div>
                <span className="section-titles">Gender:</span>
                <span>{data.gender}</span>
              </div>
            </div>
          </div>
        </div>
        {data.episode.length > 0 ? (
          <>
            <div className="download-title t-center">download Episods</div>
            <hr className="seprator" />
            {data.episode.map((item, index) => {
              return (
                <a className="episodes" key={index}>
                  {item}
                </a>
              );
            })}
          </>
        ) : null}
      </div>
    </div>
  );
}
