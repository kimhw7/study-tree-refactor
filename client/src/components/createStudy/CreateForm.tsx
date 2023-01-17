import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useCallback, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

import CreateWeekBar from "./CreateWeekBar";
import ToggleOnline from "./ToggleOnline";
import CreatePageTags from "./CreatePageTags";
import axios, { AxiosResponse } from "axios";
import TogglePublic from "./TogglePublic";

interface MyFormProps {
  teamName: string;
  summary: string;
  dayOfWeek: string[];
  want: number;
  startDate: string;
  procedure: boolean;
  openClose: boolean;
  content: string;
  image: string;
}

interface MyFormTag {
  tags: string[];
}
const CreateForm = () => {
  const fetch = (url: string): Promise<AxiosResponse<any>> => {
    return axios.get(url);
  };
  useEffect(() => {
    const url =
      "http://ec2-13-209-56-72.ap-northeast-2.compute.amazonaws.com:8080/tag";
    fetch(url).then((res) => setTag(res.data.data.tags));
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState<string[]>();
  const [selectedTags, setSelectedTags] = useState([]);
  const [isOnlineToggleClicked, setIsOnlineToggleClicked] = useState(false);
  const [isPublicToggleClicked, setIsPublicToggleClicked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const textRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    if (textRef.current) {
      textRef.current.style.height = "16px";
      textRef.current.style.height = textRef.current.scrollHeight + "px";
    }
  }, []);
  const [form, setForm] = useState<MyFormProps>({
    teamName: "",
    summary: "",
    dayOfWeek: [],
    want: 0,
    startDate: new Date().toISOString().split("T")[0],
    procedure: false,
    openClose: false,
    content: "",
    image: "https://avatars.dicebear.com/api/bottts/222.svg",
  });
  const { teamName, summary, want, procedure, openClose } = form;

  const [myTag, setMyTag] = useState<MyFormTag>({
    tags: [],
  });
  const { tags } = myTag;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 여기도 모르니까 any 로 하겠습니다.
    e.preventDefault();
    alert(JSON.stringify(form));
    alert(JSON.stringify(myTag));
  };
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const hadleOnlineToggleClick = () => {
    setIsOnlineToggleClicked(!isOnlineToggleClicked);
  };
  const hadlePublicToggleClick = () => {
    setIsPublicToggleClicked(!isPublicToggleClicked);
  };

  return (
    <Main>
      <ContentDiv>
        Create New Study
        <Form onSubmit={handleSubmit}>
          <input
            id="teamName"
            type="text"
            placeholder="Team Name"
            onChange={onChange}
          />
          <input
            id="summary"
            type="text"
            placeholder="한 줄 설명"
            onChange={onChange}
          />
          <div className="tagSection">
            <div className="tagAddButton">
              Tags&nbsp;
              <AiOutlinePlusCircle onClick={openModal} className="AddButton" />
            </div>
            {isOpen && (
              <AddTagsModal>
                {tag &&
                  tag.map((el, idx) => (
                    <CreatePageTags
                      key={idx}
                      setSelectedTags={setSelectedTags}
                      selectedTags={selectedTags}
                      tagName={el}
                      myTag={myTag}
                      setMyTag={setMyTag}
                    />
                  ))}
              </AddTagsModal>
            )}
            <TagsWrapper>
              {selectedTags.map((el, idx) => (
                <CreatePageTags
                  key={idx}
                  tagName={el}
                  setSelectedTags={setSelectedTags}
                  selectedTags={selectedTags}
                  myTag={myTag}
                  setMyTag={setMyTag}
                />
              ))}
            </TagsWrapper>
          </div>
          <div className="weekbarWrapper">
            <span>진행요일</span>
            <CreateWeekBar form={form} setForm={setForm} />
          </div>
          <div>
            인원 :{" "}
            <input
              className="person"
              id="want"
              type="number"
              min="1"
              placeholder="0"
              onChange={onChange}
            />
            명
          </div>
          <div>
            <ToggleOnline form={form} setForm={setForm} />
            <TogglePublic form={form} setForm={setForm} />
          </div>
          <div className="dateWrapper">
            <span>시작날짜</span>
            <DatePicker
              className="datepicker"
              placeholderText="click and select the date"
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={(date: any) => {
                setStartDate(date);
                setForm({
                  ...form,
                  startDate: date.toISOString().split("T")[0],
                });
              }}
            />
          </div>
          <label htmlFor="content">내용</label>
          <div>
            <textarea
              id="content"
              className="textArea"
              onChange={onChangeTextArea}
              ref={textRef}
              onInput={handleResizeHeight}
            />
          </div>
          <div>
            <RedButton type="submit">Create Study</RedButton>
          </div>
        </Form>
      </ContentDiv>
    </Main>
  );
};
export default CreateForm;

// 메인 베이지색 외형
const Main = styled.main`
  width: 1024px;
  margin: 0 auto;
  background-color: var(--beige-00);
  //모바일
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  //태블릿
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    width: 750px;
  }
  * {
    font-family: "mainB", Arial;
  }
  button {
    border-style: none;
  }
`;
//내뷰 480px
const ContentDiv = styled.div`
  //모바일
  @media screen and (max-width: 768px) {
    padding-left: 20px;
  }
  margin: 0 auto;
  padding: 80px 0;
  width: 480px;
  font-size: 35px;
  color: var(--green);
  font-family: "mainEB";
`;
// form
const Form = styled.form`
  width: 330px;
  margin-top: 45px;
  margin-left: 60px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  > .tagSection {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    .AddButton {
      :hover {
        cursor: pointer;
      }
    }
  }
  > .weekbarWrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > span {
      margin-bottom: 5px;
    }
  }
  > input {
    margin: 5px 0 20px;
    font-family: "mainM", Arial;
    height: 30px;
    background-color: var(--beige-00);
    border: solid 2px var(--green);
    border-radius: 30px;
    padding: 4px 15px 4px 15px;
  }
  > input:focus {
    outline: none;
  }
  > .dateWrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > span {
      margin-bottom: 5px;
    }
  }
  > div {
    margin: 5px 0 20px;
    display: flex;
    align-items: center;
    > .person {
      background-color: var(--mopo-00);
      border: none;
      padding-left: 8px;
      border-radius: var(--radius-20);
    }
    > textarea {
      background-color: var(--beige-00);
      border: solid 2px var(--green);
      border-radius: 10px;
      width: 100%;
      color: var(--green);
      max-height: 80px;
      resize: none;
      overflow: auto;
      padding: 8px;
      padding-right: 5px;
    }
    > textarea:focus {
      outline: none;
    }
    .textArea::-webkit-scrollbar {
      width: 5px; /* 스크롤바의 너비 */
    }

    .textArea::-webkit-scrollbar-thumb {
      height: 20%; /* 스크롤바의 길이 */
      background: var(--green); /* 스크롤바의 색상 */
      border-radius: 10px;
    }

    .textArea::-webkit-scrollbar-track {
      background: none; /*스크롤바 뒷 배경 색상*/
    }
  }
  .person {
    margin-left: 8px;
    width: 30px;
  }
  .toggleBox {
    font-size: 12px;
    margin-right: 25px;
  }
  .datepicker {
    :hover {
      cursor: pointer;
    }
  }
`;

const RedButton = styled.button`
  width: 240px;
  padding: 3px;
  background-color: var(--red-00);
  color: var(--beige-00);
  border-radius: var(--radius-30);
  font-family: "mainL", Arial;
  font-size: 22px;
  :hover {
    background-color: var(--red-10);
  }
`;

const AddTagsModal = styled.div`
  border: 1px solid var(--green);
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  align-items: center;
  margin-top: 5px;
  border-radius: var(--radius-20);
`;
const TagsWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;

  align-items: center;
`;