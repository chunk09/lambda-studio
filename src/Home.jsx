import { useEffect, useRef, useState } from "react";
import "./styles/App.css";
import ListItem from "./components/ListItem";
import UpdateListItem from "./components/UpdateListItem";

function Home() {
  const inputToFocus = useRef();
  const [service, setService] = useState(null);
  const [update, setUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setIsError(null);
        setUpdate(null);
        setService(null);
        // loading 상태를 true 로 바꿉니다.
        setIsLoading(true);

        await fetch(process.env.REACT_APP_API_URL + "/service")
          .then((res) => res.json())
          .then((result) => setService(result));

        await fetch(process.env.REACT_APP_API_URL + "/update")
          .then((res) => res.json())
          .then((result) => setUpdate(result));
      } catch (e) {
        setIsError(e);
      }

      setIsLoading(false);
    };

    callApi();
  }, []);

  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>에러가 발생했습니다</div>;
  if (!service) return null;
  if (!update) return null;
  return (
    <div>
      <div className="profile">
        <img alt="Image Error" src="L.png" className="rounded" width="10%" />
        <h1>Lambda Studio</h1>
        <h2>Home Page</h2>
      </div>
      <div className="project">
        <h1>Projects</h1>
        <div className="button-container">
          <a href="https://github.com/chunk09">
            <button>Github</button>
          </a>
          <button onClick={() => inputToFocus.current.scrollIntoView({ behavior: "smooth", block: "center" })}>My Project</button>
        </div>
        <div ref={inputToFocus} className="project-container">
          {service.map((result) => (
            <ListItem key={result.key} imgUrl={result.ImgUrl} webUrl={result.webUrl} title={result.title} description={result.description} />
          ))}
        </div>
      </div>
      <div className="introduce-line"></div>
      <div className="introduce">
        <div>
          <img alt="Image Error" src="L.png" className="rounded" width="10%" />
          <p>
            좋은 서비스를 만들고 싶은 <br />
            중학생 개발자입니다.
            <br />이 홈페이지에 오신 것을 환영합니다.
          </p>
        </div>
      </div>
      <div className="service-update">
        <h1>Service Update</h1>
        <div className="update-list">
          {update.map((result) => (
            <UpdateListItem key={result.key} title={result.title} content={result.content} date={result.date} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
