import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateData } from "../../redux/reducers/actorsSlice";
import { fetchData } from "@/common/utils";
import { baseObj } from "@/common/constance";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


//this component is the main page
export default function CharacterGrid() {
  const pageData = useAppSelector((state) => state.actors);
  const dispatch = useAppDispatch();
  //dynamic change pages
  let pageNumber = useRef<number>(1);

  //materialUi pagination onChange function
  const changePageIndex = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    pageNumber.current = value;
    getData();
  };

  //recived datas from redux store
  let listResult = pageData.data.characters.results;

  // the first render and fetchData
  useEffect(() => {
    getData();
  }, []);

  // dispatch data after recives
  function getData() {
    //building query for graphQL
    let query = `
    query {
        characters(page: ${pageNumber.current}) {
          info {
            count
            pages
            next
            prev
          }
          results {
            id
            name
            status
            species
            type
            gender
            image
          }
        }
      
      }
      
    `;

    //call api then dispatch data
    fetchData(query)
      .then((data) => {
        dispatch(updateData(data));
      })
      .catch((err) => dispatch(updateData(baseObj)));
  }

  //simple loading
  if (listResult.length < 1) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="main-container">
        <h1 className="main-title">Rick & morty</h1>
        <Box className="character-container" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {listResult.map((i, k) => {
              return (
                <Grid key={i.id} xs={12} sm={4} md={3}>
                  <Card className="dark-2">
                    <CardMedia
                      sx={{ height: 140 }}
                      image={i.image}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography
                        className="filter-multiline"
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ color: "white" }}
                      >
                        {i.name}
                      </Typography>
                      <Typography
                        className={
                          i.status == "Alive"
                            ? "alive-style status"
                            : i.status == "Dead"
                            ? "dead-style status"
                            : "unknown-style status"
                        }
                        variant="body2"
                        color="text.secondary"
                      >
                        {i.status}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="large" variant="outlined" color="error">
                        <Link
                          className="link-style "
                          href={`/characters/${i.id}`}
                        >
                          See More
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <center className="m-20 footer-pagination">
          <Stack className="fit-content custom-pagination" spacing={2}>
            <Pagination
              count={pageData.data.characters.info.pages}
              onChange={changePageIndex}
              variant="outlined"
              color="primary"
              page={pageNumber.current}
            />
          </Stack>
        </center>
      </div>
    </>
  );
}
