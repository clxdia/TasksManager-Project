"use client";
import Menu from "@/components/Menu";

export default function Loading(): JSX.Element {
  return (
    <div className="homepage">
      <main className="main">
        <div className="tasks">
          <div className="tasks__user tasks__containers">
            <h3>MINE</h3>
            {/* <UserTasks /> */}
          </div>
          <div className="tasks__all tasks__containers">
            <h3>ALL</h3>
            <ul className="tasks__all__loading">
              <svg className="loading" viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            </ul>
          </div>

          <div className="tasks__completed tasks__containers">
            <h3>COMPLETED</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
