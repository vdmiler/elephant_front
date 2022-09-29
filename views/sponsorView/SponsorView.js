import Button from "@components/buttons/Button";
import Container from "@components/container/Container";
import Entry from "@components/entry/Entry";
import { Input, RadioButton, Select } from "@components/forms";
import Layout from "@components/layout/Layout";
import { API_URL } from "@utils/constants/settings.constants";
import { formattingIncomingData } from "@utils/helpers/formattingIncomingData.helpers";
import { getStorageWithExpiry } from "@utils/helpers/setStorageWithExpiry.helpers";
import useDebounce from "@utils/helpers/useDebounce.helpers";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 100px 0 170px;
`;

const Form = styled.form``;

const SwitchWrapp = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`;

const FieldsWrapp = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const LeftSide = styled.div`
  width: 35%;
`;

const RightSide = styled.div`
  width: 62%;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const GuestContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const GuestInputWrapp = styled.div`
  max-width: 300px;
  width: 100%;
  margin-right: 20px;
`;

const GuestButtonsWrapp = styled.div`
  display: flex;
  label {
    input {
    }
  }
  > label:first-child {
    margin-right: 20px;
  }
`;

const MoreGuestsLink = styled.button`
  display: inline-block;
  border: 0;
  background: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.5s ease;
  margin-left: 60px;
  &:hover {
    border-color: transparent;
  }
  &:disabled {
    cursor: not-allowed;
    color: #3333;
    border-color: transparent;
  }
`;

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #001b36;
  padding-top: 20px;
  margin-top: 40px;
`;

const TotalInfo = styled.div``;

const CounterGuests = styled.div`
  min-height: 44px;
  padding: 10px;
  width: 100%;
  background-color: rgba(239, 239, 239, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  font-size: 18px;
`;

const SponsorView = () => {
  const [share, setShare] = useState(0);

  const handleChangeShare = (e) => {
    setShare(e.target.value);
  };

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchGetPosts = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: API_URL + "/wp/v2/sponsors/?filter[posts_per_page]=-1",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${getStorageWithExpiry("token")}`,
          },
        });

        const posts = await response.data;
        setPostData(posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetPosts();
  }, []);

  const sponsorsData =
    postData &&
    formattingIncomingData(postData).filter((item) => item.parent === 0);

  const [chosenSponsor, setChosenSponsor] = useState(
    sponsorsData && sponsorsData[0]?.slug
  );

  const [currentIncomingGuests, setCurrentIncomingGuests] = useState(null);
  const [currentModifedGuests, setCurrentModifedGuests] = useState(null);
  const [totalGuests, setTotalGuests] = useState(0);
  const [sponsorEmail, setSponsorEmail] = useState("");

  const handleChangeSponsorEmail = (e) => {
    setSponsorEmail(e.target.value);
  };

  useEffect(() => {
    const currentSponsor =
      sponsorsData &&
      sponsorsData.filter((item) => item.slug === chosenSponsor);
    const sponsorId = currentSponsor && currentSponsor[0]?.id;
    const guests =
      postData &&
      formattingIncomingData(postData).filter(
        (item) => item.parent === sponsorId
      );

    setSponsorEmail(currentSponsor ? currentSponsor[0]?.sponsor_email : "");

    setCurrentIncomingGuests(guests);
    setCurrentModifedGuests(guests);
    setTotalGuests(guests?.length);
  }, [chosenSponsor]);

  const handleAddingGuest = (e) => {
    e.preventDefault();
    let maxInd = 0;
    currentModifedGuests.forEach((item) => (maxInd = Math.max(item.id)));
    let newState = [
      ...currentModifedGuests,
      {
        id: maxInd + 1,
        slug: `name-guest-${currentModifedGuests?.length + 1}`,
        title: `Name guest ${currentModifedGuests?.length + 1}`,
        content: "",
        guest_menu: "meat",
        guest_price: "650",
        status: "publish",
        parent: currentModifedGuests[0].parent,
      },
    ];
    setCurrentModifedGuests(newState);
  };

  const handleChangeMenu = (value, id) => {
    const index = currentModifedGuests.map((item) => item.id).indexOf(id);
    let newState = [...currentModifedGuests];
    newState[index].guest_menu = value;
    setCurrentModifedGuests(newState);
  };

  const [guestsValues, setGuestsValues] = useState("");

  const debouncedGuestNames = useDebounce(changeGuestsNames, 500);

  const handleChangeGuestsValues = (e, id) => {
    setGuestsValues({ [e.target.name]: e.target.value });

    debouncedGuestNames(e, id);
  };

  function changeGuestsNames(e, id) {
    const index = currentModifedGuests.map((item) => item.id).indexOf(id);
    let newState = [...currentModifedGuests];
    newState[index].title = e.target.value;
    setCurrentModifedGuests(newState);
  }

  const filterGuestsByCount =
    currentModifedGuests &&
    currentModifedGuests.filter((_, index) => index >= totalGuests);

  const total = filterGuestsByCount?.reduce((acc, item) => {
    return acc + +item.guest_price;
  }, 0);

  const formatGuestsList =
    currentModifedGuests &&
    currentModifedGuests.map((item, index) => {
      return `${index + 1}. Name: ${item.title.rendered}, selected menu: ${
        item.guest_menu
      }`;
    });

  const handleSendMail = () => {
    /* 
    const fetchEditPosts = async () => {
      try {
        const formData = new FormData();
        formData.append("contact_name", chosenSponsor);
        formData.append("contact_email", sponsorEmail);
        formData.append(
          "contact_message",
          JSON.stringify(formatGuestsList, null, 4)
        );

        const response = await axios({
          method: "post",
          url: API_URL + "/contact/v1/send",
          data: formData,
        });
        const answer = await response.data;
        console.log(answer);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEditPosts();
    */
    handleUpdateSponsor();
  };

  console.log(currentIncomingGuests);
  console.log(currentModifedGuests);

  async function handleUpdateSponsor() {
    for (let i = 0; i < currentIncomingGuests.length; i++) {
      for (let j = 0; j < currentModifedGuests.length; j++) {
        if (currentIncomingGuests[i].id === currentModifedGuests[j].id) {
          if (currentModifedGuests[j].id !== undefined) {
            try {
              const response = await axios({
                method: "PUT",
                url: API_URL + `/wp/v2/sponsors/${currentModifedGuests[j].id}`,
                data: currentModifedGuests[j],
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                  Authorization: `Bearer ${getStorageWithExpiry("token")}`,
                },
              });
              const answer = response.data;
              console.log(answer);
            } catch (err) {
              console.log(err);
            }
          } else {
            return;
          }
        } else if (currentIncomingGuests[i].id !== currentModifedGuests[j].id) {
          if (currentModifedGuests[j].id !== undefined) {
            delete currentModifedGuests[j].id;
            try {
              const response = await axios({
                method: "POST",
                url: API_URL + "/wp/v2/sponsors",
                data: currentModifedGuests[j],
                headers: {
                  "Content-Type": "application/json",
                  accept: "application/json",
                  Authorization: `Bearer ${getStorageWithExpiry("token")}`,
                },
              });
              const answer = response.data;
              console.log(answer);
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          return;
        }
      }
    }
  }

  return (
    <Layout>
      <Entry
        titleType='h1'
        titleContent='Sponsor registration'
        subtitleContent='Liebe Freunde
          Wir laden Euch herzlich zum Galaabend im Knies Zauberhut ein und freuen uns, gemeinsam mit Euch einen unvergesslichen Abend zu verbringen! Bitte bestätigt Eure Teilnahme mit untenstehendem Formular.'
      />
      <Wrapper>
        <Container>
          <Form>
            <SwitchWrapp>
              <RadioButton
                label='Ich/wir nehmen gerne teil'
                name='share'
                value={1}
                state={share}
                handleChange={handleChangeShare}
                margin='0 0 10px 0'
              />
              <RadioButton
                label='Unglücklicherweise kann ich nicht teilnehmen'
                name='share'
                value={0}
                state={share}
                handleChange={handleChangeShare}
              />
            </SwitchWrapp>
            {share == 1 ? (
              <>
                <FieldsWrapp>
                  <LeftSide>
                    <InputWrapper>
                      <Select
                        selectPlaceholder='Firma / Sponsor'
                        options={sponsorsData}
                        selectedOption={chosenSponsor}
                        setSelectedOption={setChosenSponsor}
                        margin='0 0 20px 0'
                      />
                    </InputWrapper>
                    {chosenSponsor && (
                      <CounterGuests>
                        {currentModifedGuests?.length} ({chosenSponsor})
                      </CounterGuests>
                    )}
                  </LeftSide>
                  <RightSide>
                    <InputWrapper>
                      <Input
                        type='text'
                        placeholder='E-mail'
                        name='sponsorEmail'
                        value={sponsorEmail}
                        handleChange={handleChangeSponsorEmail}
                      />
                    </InputWrapper>
                    {currentModifedGuests &&
                      currentModifedGuests.map((item, index) => (
                        <GuestContainer key={item.id + index}>
                          <GuestInputWrapp>
                            <Input
                              name={item.title}
                              placeholder={item.title}
                              value={guestsValues.val}
                              handleChange={(e) =>
                                handleChangeGuestsValues(e, item.id)
                              }
                            />
                          </GuestInputWrapp>
                          <GuestButtonsWrapp>
                            <RadioButton
                              label='Vegetarian Menu'
                              name={`${item.slug}_${item.id}`}
                              value='vegetarian'
                              state={item.guest_menu}
                              handleChange={(e) =>
                                handleChangeMenu(e.target.value, item.id)
                              }
                            />
                            <RadioButton
                              label='Meat Menu'
                              name={`${item.slug}_${item.id}`}
                              value='meat'
                              state={item.guest_menu}
                              handleChange={(e) =>
                                handleChangeMenu(e.target.value, item.id)
                              }
                            />
                          </GuestButtonsWrapp>
                        </GuestContainer>
                      ))}
                    {chosenSponsor && (
                      <>
                        <MoreGuestsLink
                          onClick={(e) => handleAddingGuest(e)}
                          disabled={currentModifedGuests?.length > 7}
                        >
                          weitere Gäste registrieren
                        </MoreGuestsLink>
                        <RegisterWrapper>
                          <TotalInfo>Total CHF {total}</TotalInfo>
                          <Button
                            content='Registrieren'
                            onClick={handleSendMail}
                          />
                        </RegisterWrapper>
                      </>
                    )}
                  </RightSide>
                </FieldsWrapp>
              </>
            ) : (
              <></>
            )}
          </Form>
        </Container>
      </Wrapper>
    </Layout>
  );
};

export default SponsorView;
