import { Box } from "@material-ui/core";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Button } from "./Button";

import { selectUser, setUser } from "../store";
import { useQuery } from "@apollo/client";
import { GetMe } from "../graphql/queries";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1.5rem;
  margin-top: 1.5rem;
  .logo,
  img {
    height: 2rem;
  }
`;

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <HeaderContainer>
      <Link href="/">
        <a className="logo">
          <img src="/logo.svg" />
        </a>
      </Link>
      <Box display="flex" alignItems="center">
        {user && (
          <>
            <Profile />
            <Button
              className="rounded"
              color="default"
              size="small"
              variant="outlined"
              onClick={() => dispatch(setUser(null))}
            >
              Sign Out
            </Button>
          </>
        )}
      </Box>
    </HeaderContainer>
  );
};

function Profile() {
  const { data } = useQuery(GetMe);
  console.log(data);
  return null;
}
