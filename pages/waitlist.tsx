import { useState, useCallback } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Snackbar from "@material-ui/core/Snackbar";

import { MainLayout } from "../layouts/MainLayout";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { Title } from "../features/dashboard/Title";
import { TitleBar } from "../features/dashboard/TitleBar";
import { GetWaitlsitCount } from "../graphql/queries";
import { removeNumUsersFromWaitlist } from "../lib/api";

const WaitListContainer = styled.div`
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 312px;
  margin: auto;
  font-family: spotify-circular;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 65px 107px;

    h4 {
      font-size: 24px;
      line-height: 32px;
      letter-spacing: -0.0104167em;
      margin: 0 0 24px 0;
    }

    > div {
      flex: inherit;
    }

    p {
      font-weight: bold;
      margin: 0;
      font-size: 48px;
      line-height: 56px;
      letter-spacing: -0.0208333em;
    }
  }
`;

const WaitListCounter = styled.div`
  border-right: 1px solid #eeeeee;
`;

const StyledInput = styled(Input)`
  flex: inherit;
`;

const StyledSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-root {
    background-color: #fff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 12px 32px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.0178571em;
    color: #000000;
  }

  .MuiSnackbarContent-message {
    padding: 0;
  }
`;

export default function Waitlist() {
  const { data, refetch } = useQuery(GetWaitlsitCount);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>();
  const [removingUsers, setRemovingUsers] = useState(false);

  const handleChange = useCallback((event) => {
    const { value } = event.target;
    setValue(value);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }, []);

  const handleRelease = useCallback(() => {
    setRemovingUsers(true);
    removeNumUsersFromWaitlist(value)
      .then(() => {
        handleOpen();
        refetch();
      })
      .catch(console.log)
      .finally(() => {
        setRemovingUsers(false);
      });
  }, [value, handleOpen]);

  if (!data) {
    return null;
  }

  const { userWaitlistCount } = data;

  return (
    <MainLayout>
      <TitleBar>
        <Title>Waitlist</Title>
      </TitleBar>
      <WaitListContainer>
        <WaitListCounter>
          <h4>Users on Waitlist</h4>
          <p>{userWaitlistCount?.toLocaleString()}</p>
        </WaitListCounter>
        <div>
          <h4>Release Users</h4>
          <StyledInput
            placeholder="Number of Users"
            value={value}
            type="number"
            min={0}
            onChange={handleChange}
          />
          <Button
            color="secondary"
            disabled={!value || removingUsers}
            variant="contained"
            onClick={handleRelease}
          >
            Release
          </Button>
        </div>
      </WaitListContainer>
      <StyledSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`${value} ${
          value > 1 ? "users have" : "user has"
        } been taken off the
          waitlist`}
      />
    </MainLayout>
  );
}
