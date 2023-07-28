import Menu from "@/components/Menu";
import UserTasks from "@/components/UserTasks";
import useFetchData from "../hooks/fetchData";

import Task from "@/interfaces/Task";
import CompletedTasks from "./CompletedTasks";
import Welcome from "./Welcome";
import { useEffect, useState } from "react";
import Settings from "./Settings";

export default function Homepage(): JSX.Element {
  const allTasks = useFetchData("/tasks/others");
  const myTasks = useFetchData("/tasks/user");
  const completedTasks = useFetchData("/tasks/user/completed");

  const [settings, setSettings] = useState<boolean>(false);

  const [section, setSection] = useState<boolean>(false);

  const [inProgressTasksCount, setInProgressTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  useEffect(() => {
    if (myTasks) {
      setInProgressTasksCount(myTasks.length);
    }
  }, [myTasks]);

  useEffect(() => {
    if (completedTasks) {
      setCompletedTasksCount(completedTasks.length);
    }
  }, [completedTasks]);

  const toggleSection = () => {
    setSection(!section);
  };

  const [activeComponent, setActiveComponent] = useState<
    "completed" | "mytasks"
  >("completed");

  const toggleComponent = () => {
    setActiveComponent(
      activeComponent === "completed" ? "mytasks" : "completed"
    );
  };

  return (
    <div className="homepage">
      <Menu setSettings={setSettings} />
      <div className="main">
        {settings ? (
          <Settings />
        ) : (
          <>
            <Welcome
              inProgressTasksCount={inProgressTasksCount.toLocaleString(
                "en-US",
                { minimumIntegerDigits: 2 }
              )}
              completedTasksCount={completedTasksCount.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}
            />
            <div className="tasks">
              <div className="tasks__user tasks__containers">
                <h3>MY TASKS</h3>
                <UserTasks myTasks={myTasks} />
              </div>

              <div className="tasks__all tasks__containers">
                <h3>ALL</h3>
                <ul className="tasks__all__cards">
                  {allTasks?.map((task: Task) => (
                    <li key={task._id} className="tasks__ui tasks__ui-all">
                      <div className="title__icon">
                        <h4>{task?.title}</h4>
                      </div>
                      <div>
                        <p className="desc">{task?.desc}</p>
                        <p className="date">{task?.due_date}</p>
                        <div className="tags__wrapper">
                          <ul className="tags">
                            {task?.tags?.map((tag) => (
                              <li className="tags__all" key={tag}>
                                <p>#{tag}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="content__below">
                        <hr></hr>
                        <div className="content__below__icons">
                          <p className="author">by @{task?.author}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tasks__completed tasks__containers">
                <h3>COMPLETED</h3>
                <CompletedTasks completedTasks={completedTasks} />
              </div>
            </div>

            <div className="tasks--mobile">
              <div className="tasks__toggle">
                <button
                  className={
                    activeComponent === "completed"
                      ? "tasks--active"
                      : "form__buttons--inactive"
                  }
                  onClick={() => setActiveComponent("completed")}
                >
                  <h3>MY TASKS</h3>
                </button>
                <button
                  className={
                    activeComponent === "mytasks"
                      ? "form__buttons--active"
                      : "form__buttons--inactive"
                  }
                  onClick={() => setActiveComponent("mytasks")}
                >
                  <h3>COMPLETED</h3>
                </button>
              </div>

              {activeComponent === "completed" ? (
                <div className="tasks__user tasks__mobile tasks__containers ">
                  <UserTasks myTasks={myTasks} />
                </div>
              ) : (
                <div className="tasks__completed tasks__mobile tasks__containers">
                  <CompletedTasks completedTasks={completedTasks} />
                </div>
              )}
              <h3 className="tasks__all__title ">ALL TASKS</h3>
              <div className="tasks__all  tasks__containers">
                <ul className="tasks__all__cards tasks__all__cards--mobile">
                  {allTasks?.map((task: Task) => (
                    <li key={task._id} className="tasks__ui tasks__ui-all">
                      <div className="title__icon">
                        <h4>{task?.title}</h4>
                      </div>
                      <div>
                        <p className="desc">{task?.desc}</p>
                        <p className="date">{task?.due_date}</p>
                        <div className="tags__wrapper">
                          <ul className="tags">
                            {task?.tags?.map((tag) => (
                              <li className="tags__all" key={tag}>
                                <p>#{tag}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="content__below">
                        <hr></hr>
                        <div className="content__below__icons">
                          <p className="author">by @{task?.author}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
