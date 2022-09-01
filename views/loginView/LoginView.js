import Button from "@components/buttons/Button";
import Container from "@components/container/Container";
import Entry from "@components/entry/Entry";
import { Input } from "@components/forms";
import Layout from "@components/layout/Layout";
import { API_URL } from "@utils/constants/settings.constants";
import giveLoginValidationRules from "@utils/helpers/giveLoginValidationRules.helpers";
import {
  setStorageWithExpiry,
  getStorageWithExpiry,
} from "@utils/helpers/setStorageWithExpiry.helpers";
import axios from "axios";
import $api from "core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding-bottom: 175px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  margin-bottom: 20px;
`;

const LoginView = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isAuth) {
      router.push("/sponsor");
    }
  }, [isAuth]);

  useEffect(() => {
    const isToken = getStorageWithExpiry("token");
    if (isToken && isToken.length !== 0) {
      axios({
        method: "post",
        url: API_URL + "/jwt-auth/v1/token/validate",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${isToken}`,
        },
      })
        .then((res) => {
          if (res.data.data.status == 200) {
            setIsAuth(true);
          }
        })
        .catch((err) => {
          if (err) {
            setIsAuth(false);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialFieldsState = {
    username: "",
    password: "",
  };
  const [fieldsData, setFieldsData] = useState(initialFieldsState);

  const handleChangeFields = (event) => {
    setFieldsData((previous) => {
      return {
        ...previous,
        [event.target.name]: event.target.value,
      };
    });
  };

  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFieldsData(initialFieldsState);
  };

  const handleSubmit = () => {
    const chechingErrors = giveLoginValidationRules({
      ...fieldsData,
    });
    setErrors(chechingErrors);
    if (Object.keys(chechingErrors).length === 0) {
      $api
        .post("/jwt-auth/v1/token", fieldsData)
        .then((res) => {
          if (res.data.token) {
            setStorageWithExpiry("token", res.data.token, 1000 * 60 * 60 * 24);
            setIsAuth(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      resetForm();
    }
  };
  return (
    <Layout>
      <Entry
        titleType='h1'
        titleContent='Sponsor registration'
        subtitleContent='Liebe Freunde
        Schön sind Sie hier. Bitte registrieren Sie sich mit dem Login, welches Sie bei der Einladung erhalten hatten um Ihre Plätze für den Gala-Abend zu sichern. Wir freuen uns auf Sie.'
      />
      <Wrapper>
        <Container>
          <Form>
            <InputWrapper>
              <Input
                type='text'
                name='username'
                placeholder='Username'
                value={fieldsData.username}
                validate={errors.username}
                errorMessage={errors.username}
                handleChange={handleChangeFields}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                type='password'
                name='password'
                placeholder='Password'
                value={fieldsData.password}
                validate={errors.password}
                errorMessage={errors.password}
                handleChange={handleChangeFields}
              />
            </InputWrapper>
            <Button content='Log in' onClick={handleSubmit} />
          </Form>
        </Container>
      </Wrapper>
    </Layout>
  );
};

export default LoginView;
