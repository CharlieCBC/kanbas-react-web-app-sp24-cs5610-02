import React from "react";
import { Link } from "react-router-dom";
import db from "../Database";
import TopBar from "../Courses/TopBarComponents/TopBar";

function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}) {
  return (
    <div>
      <TopBar />
      <div className="p-4">
        <h1>Dashboard</h1>
        <h5>Course</h5>
        <input
          value={course.name}
          className="form-control"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <input
          value={course.number}
          className="form-control"
          onChange={(e) => setCourse({ ...course, number: e.target.value })}
        />
        <input
          value={course.startDate}
          className="form-control"
          type="date"
          onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
        />
        <input
          value={course.endDate}
          className="form-control"
          type="date"
          onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
        />
        <button className="btn btn-primary me-2" onClick={addNewCourse}>
          Add
        </button>
        <button className="btn btn-primary" onClick={updateCourse}>
          Update
        </button>

        <hr />
        <h2>Published Courses (12)</h2>
        <hr />
        <div className="row">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {courses.map((course) => (
              <div key={course._id} className="col" style={{ width: 300 }}>
                <div className="card">
                  <img
                    src={`/images/${course.image}`}
                    className="card-img-top"
                    style={{ height: 150 }}
                  />
                  <div className="card-body">
                    <Link
                      className="card-title"
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      {course.name}{" "}
                    </Link>
                    <p className="card-text">{course.name}</p>
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="btn btn-primary me-2"
                    >
                      Go{" "}
                    </Link>
                    <button
                      className="btn btn-primary me-2"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
